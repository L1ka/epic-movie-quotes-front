<script setup>
import axiosInstance from '@/config/axios/index.js'
import { ref, onMounted } from 'vue'
import { fetchUser } from '@/services/api'

const backUrl = import.meta.env.VITE_API_BASE_URL
const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}

const handleFileUpload = (event) => {
  const formData = new FormData()
  formData.append('image', event.target.files[0])

  axiosInstance
    .post('api/profile/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      user.value = backUrl + response.data.image
      getUser()
    })
}

onMounted(() => getUser())
</script>

<template>
  <div class="mb-24 mt-6 lg:mt-[-10%] flex flex-col items-center">
    <div
      v-if="user?.image"
      :style="{ 'background-image': 'url(' + backUrl + user.image + ')' }"
      class="lg:w-44 lg:h-44 w-36 h-36 bg-cover bg-no-repeat bg-center rounded-full mb-2"
    ></div>
    <img
      v-else
      src="@/assets/images/default-image.png"
      alt="user-image"
      class="lg:w-44 lg:h-44 w-36 h-36 bg-cover bg-no-repeat bg-center rounded-full mb-2"
    />

    <div class="flex flex-col w-48 h-8">
      <label for="profile" class="text-center text-white">{{ $t('profile.upload_image') }}</label>
      <input
        type="file"
        name="profile"
        class="z-1 absolute w-48 cursor-pointer"
        @change="handleFileUpload"
      />
    </div>
  </div>
</template>
