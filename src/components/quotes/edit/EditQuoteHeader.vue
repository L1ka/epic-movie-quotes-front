<script setup>
import DeleteConfirmation from '@/components/quotes/DeleteConfirmation.vue'
import IconExit from '@/components/icons/IconExit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import axiosInstance from '@/config/axios/index.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const showConfirmation = ref(false)
const props = defineProps({
  quoteId: { type: Number, required: true },
  quote: { type: Object, required: true }
})

const close = () => {
  router.push({ name: 'movie-description', params: { id: props.id } })
}

const deleteQuote = async () => {
  await axiosInstance.delete(`/api/quote/${props.quoteId}`)
  close()
}
</script>

<template>
  <div class="border-b-2 border-border py-8 px-8 flex justify-between">
    <div class="flex" @click="showConfirmation = !showConfirmation">
      <icon-trash class="w-6 mr-2"></icon-trash>
      <p class="hidden md:block">{{ $t('edit_quote.delete') }}</p>
    </div>

    <delete-confirmation
      v-if="showConfirmation"
      :quote="quote"
      @cancel="close"
      @delete-item="deleteQuote"
    ></delete-confirmation>

    <p>{{ $t('edit_quote.header') }}</p>

    <icon-exit @click="close"></icon-exit>
  </div>
</template>
