<script setup>
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'
import axiosInstance from '@/config/axios/index.js'

const backUrl = import.meta.env.VITE_API_BASE_URL
const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())

const handleFileUpload = (event) => {
  const formData = new FormData()
  formData.append('image', event.target.files[0])

  axiosInstance
    .post('api/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      user.value = 'http://localhost:8000' + response.data.image
      getUser()
    })
}
</script>

<template>
  <div class="mb-24 mt-6 lg:mt-[-10%] flex flex-col items-center">
    <div
      :style="{ 'background-image': 'url( ' + backUrl + user?.image + ')' }"
      class="lg:w-44 lg:h-44 w-36 h-36 bg-cover bg-no-repeat bg-center rounded-full mb-2"
    ></div>

    <div class="flex flex-col w-48 h-8">
      <label for="profile" class="text-center">Upload new photo</label>
      <input
        type="file"
        name="profile"
        class="z-1 absolute w-48 cursor-pointer"
        @change="handleFileUpload"
      />
    </div>
  </div>
</template>
