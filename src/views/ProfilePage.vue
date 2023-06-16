<script setup>
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import ChangeField from '@/components/user-profile/ChangeField.vue'
import BaseLayout from '@/components/ui/BaseLayout.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/store/getUser.js'
import axiosInstance from '@/config/axios/index.js'
import { storeToRefs } from 'pinia'

const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())

const url = 'http://localhost:8000'

const handleFileUpload = (event) => {
  upload(event.target.files[0])
}

const upload = (file) => {
  const formData = new FormData()
  formData.append('image', file)

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
    .catch((error) => {
      console.error(error)
    })

  onMounted(async () => {
    getUser()
  })
}
</script>

<template>
  <base-layout>
    <div class="flex flex-col items-start lg:items-center min-h-screen w-screen text-white">
      <icon-left-arrow class="ml-8 self-start lg:hidden"></icon-left-arrow>

      <div
        class="bg-light-black lg:text-dark-gray lg:bg-black px-8 lg:px-24 2xl:px-40 flex flex-col items-center mt-6 lg:mt-32 w-full lg:w-[55%] h-screen lg:h-full lg:pb-44"
      >
        <p class="hidden lg:flex absolute top-[-120px] left-12 text-white">My profile</p>
        <div class="mb-24 mt-6 lg:mt-[-10%] flex flex-col">
          <div
            :style="{ 'background-image': 'url( ' + url + user?.image + ')' }"
            class="w-44 h-44 bg-cover bg-no-repeat bg-center rounded-full mb-2"
          ></div>

          <div class="flex flex-col w-48 h-8">
            <label for="profile" class="">Upload new photo</label>
            <input
              type="file"
              name="profile"
              class="z-1 absolute w-48 cursor-pointer"
              @change="handleFileUpload"
            />
          </div>
        </div>

        <change-field
          title="Username"
          name="first_name"
          placeholder="Enter new usarname"
          rules="required|min:3|max:15|alpha_num_lower"
        ></change-field>

        <change-field
          title="Email"
          name="email"
          rules="required|email"
          placeholder="Enter new email"
        ></change-field>

        <change-field
          title="Password"
          name="password"
          placeholder="Enter new password"
          type="password"
          rules="required|min:8|max:15|alpha_num_lower"
        ></change-field>
      </div>
    </div>
  </base-layout>
</template>
