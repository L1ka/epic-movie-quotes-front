<script setup>
import AddLike from '@/components/news-feed/post/AddLike.vue'
import TheComment from '@/components/news-feed/post/TheComment.vue'
import ViewQuoteHeader from '@/components/quotes/view/ViewQuoteHeader.vue'
import QuoteInfo from '@/components/quotes/view/QuoteInfo.vue'
import AddComment from '@/components/news-feed/post/AddComment.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'

const route = useRoute()
const router = useRouter()
const modal = ref(null)
const show = ref(true)
const quotes = ref(null)
const showAllItems = ref(false)

const close = () => {
  show.value = false
  router.push({ name: 'movie-description', params: { id: quotes.value.movie_id } })
}

const showComents = (e) => {
  showAllItems.value = e
}

onClickOutside(modal, close)

const getQuotes = async () => {
  await axiosInstance.get(`/api/quote/${route.params.quoteId}`).then((res) => {
    quotes.value = res.data.data
  })
}

onMounted(() => {
  getQuotes()
})
</script>

<template>
  <div
    class="rounded-lg z-40 absolute top-0 left-0 right-0 bottom-0 flex justify-center text-white backdrop-blur-sm bg-black/30 h-full"
    v-if="show && quotes"
  >
    <div
      class="text-white bg-modal-black w-full lg:w-[60%] max-h-[1000px] overflow-y-scroll lg:mt-24 lg:mb-20"
      ref="modal"
    >
      <view-quote-header @close="close" :quote="quotes"></view-quote-header>

      <quote-info :quote="quotes"></quote-info>

      <add-like
        :quote="quotes"
        @show="showComents($event)"
        @update="getQuotes()"
        class="px-8"
      ></add-like>

      <the-comment :quote="quotes" v-model="showAllItems"></the-comment>

      <add-comment
        :quoteId="quotes.id"
        :movieId="quotes.movie.id"
        @update="getQuotes()"
        class="px-8"
      ></add-comment>
    </div>
  </div>
</template>
