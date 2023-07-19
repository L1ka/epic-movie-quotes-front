<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import UserCard from '@/components/ui/UserCard.vue'
import QuoteHeader from '@/components/quotes/add/QuoteHeader.vue'
import QuoteMovieInfo from '@/components/quotes/add/QuoteMovieInfo.vue'
import AddQuoteForm from '@/components/quotes/add/AddQuoteForm.vue'

const route = useRoute()
const image = ref(null)
const modal = ref(null)
const router = useRouter()
const show = ref(true)
const emit = defineEmits(['update'])

const close = () => {
  show.value = false
  router.push({ name: 'movie-description', params: { id: route.params.id } })
}

const update = () => {
  emit('update')
}

const onDrop = (e) => {
  e.preventDefault()
  console.log(e.dataTransfer.files[0].name)
  image.value = e.dataTransfer.files[0]
}

onClickOutside(modal, close)
</script>

<template>
  <div
    v-if="show"
    class="rounded-lg flex justify-center absolute top-0 left-0 right-0 bottom-0 text-white backdrop-blur-sm bg-black/30 z-40"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <div
      class="text-white relative z-50 bg-modal-black w-full lg:mt-24 lg:w-[60%] overflow-y-scroll max-h-[1000px] lg:mb-12"
    >
      <div ref="modal" v-if="show">
        <quote-header @open="close"></quote-header>

        <div class="px-8">
          <user-card></user-card>

          <quote-movie-info :id="route.params.id"></quote-movie-info>

          <add-quote-form :image="image" :id="route.params.id" @update="update"></add-quote-form>
        </div>
      </div>
    </div>
  </div>
</template>
