<script setup>
import LoginForm from '@/components/landing/LoginForm.vue'
import IconExit from '@/components/icons/IconExit.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axiosInstance from '@/config/axios/index.js'

const modal = ref(null)
const route = useRouter()
const open = ref(true)

onClickOutside(modal, () => {
  close()
})

const close = () => {
  route.push({ name: 'landing' })
  open.value = false
}

const redirectToProvider = async () => {
  await axiosInstance
    .get('/api/auth/google/redirect')
    .then((response) => {
      window.location.href = response.data.url
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div
    v-if="open"
    class="md:fixed top-0 left-0 bottom-0 right-0 z-50 md:backdrop-blur-sm bg-black/30"
  ></div>
  <div
    v-if="open"
    ref="modal"
    class="pt-16 md:w-[600px] md:h-[700px] w-screen h-screen absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center w-[90%] md:w-[80%] sm:w-[70%]">
      <icon-exit class="self-end md:hidden" @click="close()"></icon-exit>>
      <h1 class="text-white mb-3 text-sm-bold md:text-m">
        {{ $t('login.log_in_to_your_account') }}
      </h1>
      <p class="text-dark-gray mb-8 text-sm text-center">{{ $t('login.welcome_back') }}</p>

      <login-form></login-form>

      <div
        @click="redirectToProvider"
        class="flex w-full justify-center items-center mt-4 border border-gray py-3 rounded"
      >
        <icon-google></icon-google>
        <p class="text-white ml-2">{{ $t('login.sign_in_with_google') }}</p>
      </div>

      <div class="flex w-[360px] justify-center items-center mt-8">
        <p class="text-dark-gray">{{ $t('login.dont_have_account') }}</p>
        <router-link :to="{ name: 'registration' }" class="text-blue ml-2 underline">{{
          $t('login.sign_up')
        }}</router-link>
      </div>
    </div>
  </div>
</template>
