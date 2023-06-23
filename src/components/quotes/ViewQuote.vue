<script setup>
import IconExit from '@/components/icons/IconExit.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import UserCard from '@/components/ui/UserCard.vue'
import WriteComment from '@/components/ui/WriteComment.vue'
import TheComment from '@/components/news-feed/TheComment.vue'
import { Field } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { useUrlStore } from '@/store/backUrl.js'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'

const { backUrl } = useUrlStore()
const route = useRoute()
const router = useRouter()
const modal = ref(null)
const show = ref(true)
const quotes = ref(null)

const close = () => {
  show.value = false
  router.push({ name: 'movie-description', params: { id: quotes.value.movie_id } })
}

onClickOutside(modal, close)

const getQuotes = async () => {
  await axiosInstance
    .post('/api/get-quote', { id: route.params.quoteId })
    .then((res) => {
      quotes.value = res.data.data
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  getQuotes()
})
</script>

<template>
  <div
    class="rounded-lg absolute top-0 left-0 right-0 bottom-0 text-white backdrop-blur-sm bg-black/30"
    v-if="show && quotes"
  ></div>

  <div
    class="text-white bg-black absolute top-0 left-0 right-0 lg:top-24 lg:left-[15%] lg:w-[60%]"
    ref="modal"
    v-if="quotes && show"
  >
    <div class="border-b-2 border-border p-8 flex justify-between">
      <div class="flex">
        <router-link :to="{ name: 'edit-quote', params: { quoteId: quotes.id } }">
          <icon-edit class="border-r-2 border-border pr-2 w-6"></icon-edit>
        </router-link>
        <icon-trash class="pl-2 w-6"></icon-trash>
      </div>

      <p class="hidden md:block">View quote</p>

      <icon-exit @click="close"></icon-exit>
    </div>

    <user-card class="px-8"></user-card>

    <div class="relative mb-4 px-8">
      <Field
        v-model="quotes.quote.en"
        disabled
        as="textarea"
        name="quote.en"
        rows=""
        class="p-6 md:pb-0 bg-transparent rounded-lg indent-2 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
      />
      <p class="absolute top-4 right-12">Eng</p>
    </div>

    <div class="relative mb-4 px-8">
      <Field
        v-model="quotes.quote.ka"
        disabled
        as="textarea"
        name="quote.ka"
        class="p-6 md:pb-0 bg-transparent rounded-lg indent-2 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
      />

      <p class="absolute top-4 right-12">ქარ</p>
    </div>

    <div class="px-8">
      <div
        :style="{ 'background-image': 'url(' + backUrl + quotes.image + ')' }"
        class="w-full h-[300px] bg-cover bg-no-repeat bg-center rounded-md mb-4"
      ></div>
    </div>

    <div class="px-8 mb-4">
      <div class="flex items-center md:text-sm-bold border-b-2 border-border pb-2">
        <p class="mr-2">3</p>
        <icon-message class="mr-6 w-6 md:w-8"></icon-message>

        <p class="mr-2">5</p>
        <icon-heart class="w-6 md:w-8"></icon-heart>
      </div>
    </div>

    <the-comment class="px-8 pb-2 mb-4"></the-comment>

    <write-comment class="px-8"></write-comment>
  </div>
</template>
