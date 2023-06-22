<script setup>
import EditQuoteHeader from '@/components/quotes/edit/EditQuoteHeader.vue'
import EditQuoteForm from '@/components/quotes/edit/EditQuoteForm.vue'
import UserCard from '@/components/ui/UserCard.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'

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
      console.log(res.data)
      //quotes.value = res.data.quotes

      quotes.value = res.data.quote
      quotes.value.quote = JSON.parse(quotes.value.quote)

      console.log(quotes.value)
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
    <edit-quote-header :id="quotes.movie_id" :quoteId="quotes.id"></edit-quote-header>

    <div class="px-8">
      <user-card></user-card>

      <edit-quote-form :id="quotes.movie_id" :quoteId="quotes.id"></edit-quote-form>
    </div>
  </div>
</template>
