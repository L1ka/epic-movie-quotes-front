<script setup>
import PostCard from '@/components/news-feed/post/PostCard.vue'
import CreateQuote from '@/components/news-feed/create-quote/CreateQuote.vue'
import SearchBar from '@/components/news-feed/SearchBar.vue'
import SearchForMobile from '@/components/news-feed/SearchForMobile.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import axiosInstance from '@/config/axios/index.js'
import { useRoute, useRouter } from 'vue-router'

const quotes = reactive({ quotes: [] })
const currentPage2 = ref(1)
const perPage = 2
const lastPage = ref(null)
const searchValue = ref('')
const router = useRouter()
const focused = ref(false)
const open = ref(false)
const route = useRoute()
const emit = defineEmits(['close'])
const props = defineProps({ isOpen: { type: Boolean, required: false } })

const width = computed(() => {
  return focused.value ? 'w-[30%]' : 'w-[70%]'
})

const handleScroll = () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement

  if (scrollTop + clientHeight + 1 >= scrollHeight) {
    currentPage2.value++
    handleSearch(searchValue.value)
  }
}

const modal = computed(() => {
  return router.currentRoute.value.name == 'news-feed-quote'
    ? 'fixed top-0 left-0  right-0  bottom-0 bg-[#191525]'
    : 'static'
})

watch(searchValue, () => {
  currentPage2.value = 1
  lastPage.value = null
})

watch(
  () => route.params,
  () => {
    handleSearch()
  }
)

const handleSearch = async (value) => {
  open.value = false
  if (lastPage.value !== null && currentPage2.value > lastPage.value) {
    return
  }

  await axiosInstance
    .post('api/search', {
      search: value,
      params: {
        page: currentPage2.value,
        per_page: perPage
      }
    })
    .then((res) => {
      if (res.data.quotes) {
        if (currentPage2.value === 1) {
          quotes.quotes = res.data.quotes
        }

        if (currentPage2.value !== 1) {
          quotes.quotes = quotes.quotes.concat(res.data.quotes)
        }
      }
      lastPage.value = res.data.lastPage
    })
}

onMounted(() => {
  handleSearch()

  window.addEventListener('scroll', handleScroll)

  window.Echo.channel('comments').listen('AddComment', (data) => {
    quotes.quotes.forEach((element) => {
      if (element.id == data.movie.quote_id) {
        element.comments.unshift(data.movie)
      }
    })
  })

  window.Echo.channel('likes').listen('AddLike', (data) => {
    quotes.quotes.forEach((element) => {
      if (element.id == data.likes.quote_id) {
        element.likes_count = data.likes.count
      }
    })
  })
})
</script>

<template>
  <div class="flex flex-col xl:items-center lg:items-end pt-20 md:pt-28" :class="modal">
    <!-- <icon-search
      class="mr-2 fixed top-7 right-24 z-30 w-8 h-6 lg:hidden"
      @click="open = true"
    ></icon-search> -->
    <search-for-mobile
      v-if="isOpen"
      v-model="searchValue"
      @handleSearch="handleSearch($event)"
      @close="$emit('close')"
    ></search-for-mobile>

    <div class="lg:w-[70%] xl:w-[55%]">
      <div class="flex justify-between w-full mt-8 mb-6 px-2">
        <create-quote :width="width"></create-quote>
        <search-bar
          class="hidden lg:flex ml-2"
          v-model="searchValue"
          @handleSearch="handleSearch($event)"
          @focused="focused = true"
          @onBlur="focused = false"
        ></search-bar>
      </div>

      <post-card :quotes="quotes.quotes"></post-card>
    </div>
  </div>
  <router-view></router-view>
</template>
