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
    class="absolute z-50 top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/50"
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
  >
    <div
      class="rounded-lg z-50 bg-modal-black absolute top-0 left-0 right-0 bottom-0 text-white lg:mr-7 lg:top-[9%] lg:left-[25%] xl:left-[45%] xl:translate-x-[-50%] xl:w-[57%] overflow-y-scroll max-h-[1000px]"
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
