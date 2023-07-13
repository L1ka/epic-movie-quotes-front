<script setup>
import MovieCard from '@/components/movie-description/movie-card/MovieCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()
const id = route.params.id

const modal = computed(() => {
  return (
    router.currentRoute.value.name == 'add-quote' ||
    router.currentRoute.value.name == 'view-quote' ||
    router.currentRoute.value.name == 'edit-quote'
  )
})
</script>

<template>
  <div
    class="flex flex-col min-h-screen pt-28"
    :class="
      modal ? ' fixed top-0 left-0  right-0 z-40  bottom-0 backdrop-blur-sm bg-[#191525]/30' : ''
    "
  >
    <movie-card :id="id"></movie-card>
  </div>
</template>
