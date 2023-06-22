<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import UserCard from '@/components/ui/UserCard.vue'
import QuoteHeader from '@/components/quotes/add/QuoteHeader.vue'
import QuoteMovieInfo from '@/components/quotes/add/QuoteMovieInfo.vue'
import AddQuoteForm from '@/components/quotes/add/AddQuoteForm.vue'

const route = useRoute()

const modal = ref(null)
const router = useRouter()
const show = ref(true)

const close = () => {
  show.value = false
  router.push({ name: 'movie-description', params: { id: route.params.id } })
}

onClickOutside(modal, close)
</script>

<template>
  <div
    class="rounded-lg bg-modal-black absolute top-0 left-0 right-0 bottom-0 text-white lg:mr-7 lg:top-[9%] lg:left-[25%] xl:left-[45%] xl:translate-x-[-50%] xl:w-[57%]"
    v-if="show"
  >
    <div ref="modal" v-if="show">
      <quote-header @open="close"></quote-header>

      <div class="px-8">
        <user-card></user-card>

        <quote-movie-info :id="route.params.id"></quote-movie-info>

        <add-quote-form :id="route.params.id"></add-quote-form>
      </div>
    </div>
  </div>
</template>
