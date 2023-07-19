<script setup>
import MovieCard from '@/components/movie-list/MovieCard.vue'
import MovieListHeader from '@/components/movie-list/MovieListHeader.vue'
import { RouterView } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'
import { onMounted } from 'vue'
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchMovies } from '@/services/api'

const movies = ref(null)
const route = useRoute()
const router = useRouter()

const getMovies = async () => {
  movies.value = await fetchMovies()
}

const handleSearch = async (search) => {
  await axiosInstance.post('api/search-my-movies', { search: search }).then((res) => {
    console.log(res)
    movies.value = [...res.data.data]
  })
}

watch(
  () => route.params,
  () => {
    getMovies()
  }
)

const modal = computed(() => {
  return router.currentRoute.value.name == 'add-movie' ||
    router.currentRoute.value.name == 'edit-movie'
    ? ' fixed top-0 left-0  right-0  bottom-0'
    : ''
})

onMounted(() => {
  getMovies()
})
</script>

<template>
  <div
    class="flex flex-col items-center lg:items-end min-h-screen pt-28"
    v-if="movies"
    :class="modal"
  >
    <movie-list-header
      :totalMovies="movies.length"
      @handleSearch="handleSearch($event)"
    ></movie-list-header>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-[100%] lg:w-[75%] xl:w-[80%] lg:my-28 my-10 px-8 md:px-12"
    >
      <movie-card v-for="movie in movies" :key="movie.id" :movie="movie"></movie-card>
    </div>
  </div>

  <router-view></router-view>
</template>
