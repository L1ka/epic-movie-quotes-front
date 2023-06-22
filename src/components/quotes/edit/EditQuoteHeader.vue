<script setup>
import IconExit from '@/components/icons/IconExit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import axiosInstance from '@/config/axios/index.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  id: { type: Number, required: true },
  quoteId: { type: Number, required: true }
})

const close = () => {
  router.push({ name: 'movie-description', params: { id: props.id } })
}

const deleteQuote = async () => {
  await axiosInstance
    .post('/api/quote/delete', { id: props.quoteId })
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  close()
}
</script>

<template>
  <div class="border-b-2 border-border py-8 px-8 flex justify-between">
    <div class="flex" @click="deleteQuote()">
      <icon-trash class="w-6 mr-2"></icon-trash>
      <p class="hidden md:block">Delete</p>
    </div>

    <p>Edit quote</p>

    <icon-exit @click="close"></icon-exit>
  </div>
</template>
