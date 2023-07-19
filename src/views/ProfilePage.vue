<script setup>
import ProfileForMobile from '@/components/user-profile/mobile/ProfileForMobile.vue'
import ProfileForDesktop from '@/components/user-profile/desktop/ProfileForDesktop.vue'
import axiosInstance from '@/config/axios/index.js'
import { useRouter, useRoute } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { fetchUser } from '@/services/api'

const router = useRouter()
const route = useRoute()
const open = ref(false)
const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}

const updateEmail = async () => {
  await axiosInstance
    .post('/api/profile/email', { email: route.query.email })
    .then(() => router.push({ name: 'profile' }))
}

if (route.query.email) {
  updateEmail()
}

const modalIsOpen = () => {
  open.value = true
}

const modal = computed(() => {
  const currentRoute = router.currentRoute.value
  const isOpen = open.value
  if (currentRoute.name === 'update-email' || isOpen) {
    return 'overflow-hidden fixed w-full h-full bg-[#181623]'
  } else {
    return ''
  }
})

onMounted(() => getUser())
</script>

<template>
  <div v-if="user" :class="modal" class="pt-28 min-h-screen">
    <profile-for-desktop></profile-for-desktop>
    <profile-for-mobile @modal="modalIsOpen"></profile-for-mobile>
  </div>
</template>
