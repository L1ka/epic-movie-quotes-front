<script setup>
import { onMounted, ref } from 'vue'
import { fetchUser } from '@/services/api'

const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
const backUrl = import.meta.env.VITE_API_BASE_URL
const props = defineProps({
  type: { type: String, required: false },
  hasBorder: { type: String, required: false }
})
onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="flex items-center mb-8 mt-8" v-if="user">
    <div
      v-if="user?.image"
      :style="{ 'background-image': 'url(' + backUrl + user.image + ')' }"
      class="w-14 h-14 mr-4 bg-cover bg-no-repeat bg-center rounded-full mb-2"
      :class="hasBorder"
    ></div>
    <img
      v-else
      src="@/assets/images/default-image.png"
      alt="user-image"
      class="w-14 h-14 mr-4 bg-cover bg-no-repeat bg-center rounded-full mb-2"
      :class="hasBorder"
    />

    <p class="text-white text-sm lg:text-sm-bold capitalize" :class="type ? 'hidden' : ''">
      {{ user.first_name }}
    </p>
  </div>
</template>
