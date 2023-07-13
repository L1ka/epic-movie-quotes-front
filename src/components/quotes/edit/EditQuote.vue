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
const quote = ref(null)

const close = () => {
  show.value = false
  router.push({ name: 'movie-description', params: { id: quote.value.movie_id } })
}

onClickOutside(modal, close)

const getQuote = async () => {
  await axiosInstance.get(`/api/get-quote/${route.params.quoteId}`).then((res) => {
    quote.value = res.data.data
  })
}

onMounted(() => {
  getQuote()
})
</script>

<template>
  <div
    class="rounded-lg flex justify-center absolute top-0 left-0 right-0 bottom-0 text-white backdrop-blur-sm bg-black/30 z-40"
    v-if="show && quote"
  >
    <div
      class="text-white z-50 bg-black lg:mt-24 lg:w-[60%] overflow-y-scroll max-h-[1000px]"
      ref="modal"
      v-if="quote && show"
    >
      <edit-quote-header :quoteId="quote.id" :quote="quote.quote"></edit-quote-header>

      <div class="px-8">
        <user-card></user-card>

        <edit-quote-form :quote="quote"></edit-quote-form>
      </div>
    </div>
  </div>
</template>
