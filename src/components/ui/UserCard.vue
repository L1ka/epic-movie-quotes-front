<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())
const { getUser } = useUserStore()
const backUrl = import.meta.env.VITE_API_BASE_URL

onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="flex items-center mb-8 mt-8" v-if="user">
    <div
      :style="{ 'background-image': 'url(' + backUrl + user.image + ')' }"
      class="w-14 h-14 mr-4 bg-cover bg-no-repeat bg-center rounded-full mb-2"
    ></div>
    <p class="text-white text-sm lg:text-sm-bold capitalize">{{ user.first_name }}</p>
  </div>
</template>
