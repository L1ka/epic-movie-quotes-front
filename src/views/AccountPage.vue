<script setup>
import NavigationBar from '@/components/news-feed/NavigationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
import { ref, onMounted } from 'vue'
import { fetchUser } from '@/services/api'

const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
const isOpen = ref(false)

const openSearch = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => getUser())
</script>

<template>
  <div v-if="user" class="min-h-screen">
    <navigation-bar :userId="user.id" @openSearch="openSearch"></navigation-bar>
    <side-bar class="hidden lg:inline"></side-bar>
    <router-view :isOpen="isOpen" @close="isOpen = false"></router-view>
  </div>
</template>
