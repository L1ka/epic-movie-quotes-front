<script setup>
import TheInput from '@/components/ui/TheInput.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'
let errorsFromBack = ref([])
const modal = ref(null)
const route = useRouter()
const open = ref(true)
const email = ref('')

onClickOutside(modal, () => {
  route.push({ name: 'landing' })
  open.value = false
})

const handleSubmit = async () => {
  try {
    await axiosInstance.post('/api/forgot-password', { email: email.value })

    route.push({ name: 'confirm-password' })
  } catch (error) {
    errorsFromBack.value = error.response.data.error
    console.log(error)
  }
}
</script>

<template>
  <div v-if="open" class="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/30"></div>
  <div
    v-if="open"
    ref="modal"
    class="min-w-full min-h-full sm:min-w-[60%] lg:min-w-[40%] 2xl:min-w-[20%] sm:min-h-fit pt-16 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <Form
      @submit="handleSubmit"
      class="flex flex-col items-center w-[80%] sm:w-[90%] mt-28 sm:mt-0"
      v-slot="{ errors, meta }"
    >
      <h1 class="text-sm sm:text-m mb-[30px] text-white">{{ $t('password.forgot_password?') }}</h1>
      <p class="text-[13px] sm:text-sm text-center mb-[50px] break-words text-dark-gray">
        {{ $t('password.enter_email') }}
      </p>
      <the-input
        v-model="email"
        :label="$t('registration.email')"
        :placeholder="$t('registration.enter_your_name')"
        name="email"
        rules="required|email"
        :errors="errors"
        :valid="meta.valid"
        :errorsFromBack="errorsFromBack"
      ></the-input>
      <button
        class="text-white text-sm rounded py-[7px] w-full text-center bg-base-red"
        type="submit"
      >
        {{ $t('password.send_instructions') }}
      </button>
      <RouterLink :to="{ name: 'login' }" class="flex items-center mt-8 mb-12 cursor-pointer">
        <icon-left-arrow></icon-left-arrow>
        <button class="text-dark-gray ml-4">{{ $t('password.go_back') }}</button></RouterLink
      >
    </Form>
  </div>
</template>
