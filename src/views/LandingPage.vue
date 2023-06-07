<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import SetLocale from '@/components/ui/SetLocale.vue'
import { RouterView } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'

const logout = async () => {
  await axiosInstance
    .post('api/logout')
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}
</script>

<template>
  <div class="h-screen px-2 md:px-12 lg:px-[70px] pt-[30px]">
    <router-view></router-view>

    <nav class="flex justify-between items-center flex-col md:flex-row">
      <p class="text-light-yallow uppercase text-sm mb-4">
        {{ $t('landing.movie_quotes') }}
      </p>

      <div class="flex justify-around items-center sm:w-[45%] xl:w-[25%] lg:w-[35%] w-[100%]">
        <set-locale></set-locale>

        <the-button
          :title="$t('landing.sign_up')"
          color="bg-base-red"
          to="registration"
        ></the-button>

        <the-button :title="$t('landing.log_in')" to="login"></the-button>
      </div>
    </nav>
    <button class="text-white" @click="logout">Logout</button>
    <div
      class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-[90%] lg:w-[80%] xl:w-[60%] 2xl:w-[45%]"
    >
      <h1 class="text-light-yallow text-m lg:text-2lg text-center">
        {{ $t('landing.title') }}
      </h1>
      <the-button
        :title="$t('registration.get_started')"
        color="bg-base-red  self-center mt-[24px]"
        to="login"
      ></the-button>
    </div>
  </div>
</template>
