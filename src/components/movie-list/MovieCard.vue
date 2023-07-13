<script setup>
import IconComment from '@/components/icons/IconComment.vue'
import { RouterLink } from 'vue-router'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const { selectedLocale } = storeToRefs(useLocaleStore())
const url = import.meta.env.VITE_API_BASE_URL

const props = defineProps({
  movie: { type: Object }
})
</script>

<template>
  <router-link :to="{ name: 'movie-description', params: { id: movie.id } }" class="text-white">
    <div
      class="w-full h-[250px] md:h-[350px] lg:h-[400px] xl:h-[450px] bg-cover bg-no-repeat bg-center rounded-md mb-4"
      :style="{ 'background-image': 'url( ' + url + movie.image + ')' }"
    ></div>

    <p class="mb-4 text-sm-bold">{{ movie.title[selectedLocale] }} ({{ movie.year }})</p>

    <div class="flex items-center">
      <p class="mr-2 text-sm-light">{{ movie.quotes.length }}</p>
      <icon-comment></icon-comment>
    </div>
  </router-link>
</template>
