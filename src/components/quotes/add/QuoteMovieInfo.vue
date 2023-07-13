<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '@/config/axios/index.js'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  id: { type: String }
})
const backUrl = import.meta.env.VITE_API_BASE_URL

const movie = ref(null)
const { selectedLocale } = storeToRefs(useLocaleStore())

const getMovies = async () => {
  await axiosInstance.get(`/api/get-movie/${props.id}`).then((res) => {
    movie.value = res.data.data
  })
}

onMounted(() => {
  getMovies()
})
</script>

<template>
  <div
    class="bg-black md:bg-transparent rounded-md flex py-4 w-full text-xs md:text-sm-m mb-4"
    v-if="movie"
  >
    <div class="md:w-[40%] mr-4">
      <div
        :style="{ 'background-image': 'url( ' + backUrl + movie.image + ')' }"
        class="h-full w-[150px] md:w-full rounded-md bg-cover bg-center"
      ></div>
    </div>

    <div class="flex flex-col items-start justify-between">
      <p class="text-light-yallow mb-2">{{ movie.title[selectedLocale] }} ({{ movie.year }})</p>
      <p class="mb-2">{{ $t('movie.director') }}: {{ movie.director[selectedLocale] }}</p>
      <div class="mb-3">
        <div
          class="py-1 md:py-2 px-2 bg-dark-gray rounded-md lg:text-sm text-center max-w-max mb-2"
          v-for="genre in movie.genres"
          :key="genre.id"
        >
          {{ genre.genre }}
        </div>
      </div>
    </div>
  </div>
</template>
