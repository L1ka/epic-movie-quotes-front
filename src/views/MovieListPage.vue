<script setup>
import MovieCard from '@/components/movie-list/MovieCard.vue'
import MovieListHeader from '@/components/movie-list/MovieListHeader.vue'
import BaseLayout from '@/components/ui/BaseLayout.vue'
import { RouterView } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'
import { onMounted } from 'vue'
import { ref } from 'vue'

const movies = ref(null)

const getMovies = async () => {
  await axiosInstance
    .get('/api/get-movies')
    .then((res) => {
      movies.value = res.data.data
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  getMovies()
})
</script>

<template>
  <base-layout>
    <div class="flex flex-col items-center lg:items-end min-h-screen relative" v-if="movies">
      <movie-list-header></movie-list-header>
      <div
        class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-[100%] lg:w-[75%] xl:w-[80%] lg:my-28 my-10 px-8 md:px-12"
      >
        <movie-card v-for="movie in movies" :key="movie.id" :movie="movie"></movie-card>
      </div>
    </div>

    <router-view></router-view>
  </base-layout>
</template>
