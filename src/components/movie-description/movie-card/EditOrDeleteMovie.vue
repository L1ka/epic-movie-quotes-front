<script setup>
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import DeleteConfirmation from '@/components/quotes/DeleteConfirmation.vue'
import axiosInstance from '@/config/axios/index.js'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRouter()
const showConfirmation = ref(false)
const props = defineProps({
  movieId: { type: Number, required: true },
  title: { type: Object, required: true }
})

const deleteMovie = async () => {
  showConfirmation.value = false
  await axiosInstance.delete(`/api/movie/delete/${props.movieId}`)

  route.push({ name: 'movie-list' })
}
</script>

<template>
  <div
    class="flex justify-between items-center w-[40%] md:w-[30%] bg-light-black py-2 rounded-md mt-4 md:mt-0"
  >
    <router-link
      :to="{ name: 'edit-movie', params: { id: movieId } }"
      class="border-r-2 border-border w-[50%] flex justify-center"
    >
      <icon-edit></icon-edit
    ></router-link>

    <icon-trash
      class="w-[50%] cursor-pointer"
      @click="showConfirmation = !showConfirmation"
    ></icon-trash>
  </div>

  <delete-confirmation
    v-if="showConfirmation"
    :movie="title"
    @cancel="showConfirmation = false"
    @delete-item="deleteMovie"
    class="absolute lg:right-0 lg:top-60 top-60 left-auto"
  ></delete-confirmation>
</template>
