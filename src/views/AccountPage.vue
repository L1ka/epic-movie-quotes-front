<script setup>
import NavigationBar from '@/components/news-feed/NavigationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const { user } = storeToRefs(useUserStore())
const isOpen = ref(false)

const openSearch = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div v-if="user" class="min-h-screen">
    <navigation-bar :userId="user.id" @openSearch="openSearch"></navigation-bar>
    <side-bar class="hidden lg:inline"></side-bar>
    <router-view :isOpen="isOpen" @close="isOpen = false"></router-view>
  </div>
</template>
