<script setup>
import MovieCard from '@/components/movie-list/MovieCard.vue'
import MovieListHeader from '@/components/movie-list/MovieListHeader.vue'
import NavigationBar from '@/components/news-feed/NavigationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
</script>

<template>
  <div class="flex flex-col items-center lg:items-end min-h-screen w-screen">
    <navigation-bar></navigation-bar>

    <side-bar class="hidden lg:block"></side-bar>
    <movie-list-header></movie-list-header>
    <div
      class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 w-[100%] lg:w-[75%] xl:w-[80%] lg:my-28 my-10 px-8 md:px-12"
    >
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
      <div><movie-card></movie-card></div>
    </div>
  </div>
</template>
