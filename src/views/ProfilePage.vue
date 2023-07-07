<script setup>
import ProfileForMobile from '@/components/user-profile/mobile/ProfileForMobile.vue'
import ProfileForDesktop from '@/components/user-profile/desktop/ProfileForDesktop.vue'
import NavigationBar from '@/components/news-feed/NavigationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
import { useUserStore } from '@/store/getUser.js'
import axiosInstance from '@/config/axios/index.js'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()
const open = ref(false)
const { user } = storeToRefs(useUserStore())
console.log(router.currentRoute.value.name)
const updateEmail = async () => {
  await axiosInstance
    .post('/api/update-email', { email: route.query.email })
    .then(() => router.push({ name: 'profile' }))
}

if (route.query.email) {
  updateEmail()
}

const modalIsOpen = () => {
  open.value = true
}
</script>

<template>
  <div
    v-if="user"
    :class="
      router.currentRoute.value.name == 'update-email' || open
        ? 'overflow-hidden fixed w-full h-full bg-[#181623] '
        : ''
    "
  >
    <navigation-bar v-if="user" class="mb-6" :userId="user.id"></navigation-bar>
    <side-bar class="hidden lg:inline"></side-bar>
    <profile-for-desktop></profile-for-desktop>
    <profile-for-mobile @modal="modalIsOpen"></profile-for-mobile>
  </div>
</template>
