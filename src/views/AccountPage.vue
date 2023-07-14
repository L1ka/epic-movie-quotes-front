<script setup>
import NavigationBar from '@/components/news-feed/NavigationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())
</script>

<template>
  <div v-if="user" class="min-h-screen">
    <navigation-bar :userId="user.id"></navigation-bar>
    <side-bar class="hidden lg:inline"></side-bar>
    <router-view></router-view>
  </div>
</template>
