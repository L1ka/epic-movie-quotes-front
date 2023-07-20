<script setup>
import IconCamera from '@/components/icons/IconCamera.vue'
import IconFilledDownArrow from '@/components/icons/IconFilledDownArrow.vue'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { fetchMovies } from '@/services/api'

const { selectedLocale } = storeToRefs(useLocaleStore())
const dropdownToggle = ref(false)
const selectedMovie = ref('Choose movie')
const movieId = ref(null)
const myMovies = ref([])
const emit = defineEmits(['select'])

const getMovies = async () => {
  myMovies.value = await fetchMovies()
}

const select = (title, id) => {
  movieId.value = id
  selectedMovie.value = title
  dropdownToggle.value = false

  emit('select', movieId.value)
}

onMounted(() => {
  getMovies()
})
</script>

<template>
  <div
    class="flex items-center justify-between rounded-lg px-7 h-24 bg-black w-full mt-6"
    @click="dropdownToggle = !dropdownToggle"
  >
    <div class="flex items-center">
      <icon-camera class="mr-3"></icon-camera>
      <p class="text-xs">{{ selectedMovie }}</p>
    </div>
    <icon-filled-down-arrow></icon-filled-down-arrow>
  </div>

  <div v-if="dropdownToggle" class="rounded-lg bg-black mb-4 border-2 border-border mt-2">
    <p
      v-for="(movie, index) in myMovies"
      :key="index"
      @click="select(movie.title[selectedLocale], movie.id)"
      class="p-4 w-full mb-2 mt-2 text-dark-gray hover:bg-light-gray cursor-pointer"
    >
      {{ movie.title[selectedLocale] }}
    </p>
  </div>
</template>
