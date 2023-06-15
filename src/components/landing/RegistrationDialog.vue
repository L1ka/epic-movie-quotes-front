<script setup>
import RegistrationForm from '@/components/landing/RegistrationForm.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { onClickOutside } from '@vueuse/core'
import axiosInstance from '@/config/axios/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const modal = ref(null)
const route = useRouter()
const open = ref(true)

onClickOutside(modal, () => {
  route.push({ name: 'landing' })
  open.value = false
})

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
    class="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/30 z-10 overflow-hidden"
  ></div>
  <div
    v-if="open"
    ref="modal"
    class="pt-16 min-w-full min-h-full md:min-w-[50%] lg:min-w-[40%] 2xl:min-w-[35%] md:min-h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center w-[90%] md:w-[80%] sm:w-[70%]">
      <h1 class="text-white mb-3 text-sm-bold md:text-m">
        {{ $t('registration.create_an_account') }}
      </h1>
      <p class="text-dark-gray mb-8 text-sm">{{ $t('registration.start_your_journey') }}</p>

      <registration-form></registration-form>

      <div
        @click="redirectToProvider"
        class="flex w-full justify-center items-center mt-4 border border-gray py-3 rounded"
      >
        <icon-google></icon-google>
        <p class="text-white ml-2">{{ $t('registration.sign_up_with_google') }}</p>
      </div>

      <div class="flex w-[360px] justify-center items-center mt-8 mb-12">
        <p class="text-dark-gray">{{ $t('registration.already_have_an_account') }}</p>
        <router-link :to="{ name: 'login' }" class="text-blue ml-2 underline">{{
          $t('registration.log_in')
        }}</router-link>
      </div>
    </div>
  </div>
</template>
