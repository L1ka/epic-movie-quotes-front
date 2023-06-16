<script setup>
import NavigationBar from '@/components/news-feed/NavigationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
</script>

<template>
  <div class="min-h-screen">
    <navigation-bar class="mb-6"></navigation-bar>
    <side-bar class="hidden lg:block"></side-bar>
    <slot></slot>>
  </div>
</template>
