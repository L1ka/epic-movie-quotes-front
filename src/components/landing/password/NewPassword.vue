<script setup>
import TheInput from '@/components/ui/TheInput.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { Form } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'

import axiosInstance from '@/config/axios/index.js'

const modal = ref(null)
const route = useRouter()
const open = ref(true)
const password = ref('')
const confirm_password = ref('')

onClickOutside(modal, () => {
  route.push({ name: 'landing' })
  open.value = false
})

const parameter = useRoute()
onMounted(() => {
  const expirationTime = new Date(parameter.query.expires)
  const currentTime = new Date()

  if (currentTime.getMinutes() > expirationTime.getMinutes()) {
    console.log(currentTime.getMinutes(), expirationTime.getMinutes(), expirationTime)
    return route.push({
      name: 'expired-password',
      params: { token: parameter.query.token, email: parameter.query.email }
    })
  }
})

const handleSubmit = async () => {
  try {
    await axiosInstance.post(`/api/reset-password`, {
      token: parameter.query.token,
      email: parameter.query.email,
      password: password.value,
      confirm_password: confirm_password.value
    })

    route.push({ name: 'login' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div v-if="open" class="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/30"></div>
  <div
    v-if="open"
    ref="modal"
    class="pt-16 w-screen h-screen sm:w-[60%] lg:w-[45%] 2xl:w-[30%] sm:h-fit absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <Form
      class="flex flex-col items-center text-white w-[90%]"
      @submit="handleSubmit"
      v-slot="{ errors, meta }"
    >
      <p class="text-sm-bold sm:text-m mb-[30px]">{{ $t('password.create_new_password') }}</p>
      <p class="text-sm text-center mb-[50px] break-words text-dark-gray">
        {{ $t('password.enter_different_password') }}
      </p>
      <the-input
        v-model="password"
        :label="$t('registration.password')"
        :placeholder="$t('registration.password')"
        name="password"
        rules="required|min:8|max:15|alpha_num_lower"
        type="password"
        :errors="errors"
        :valid="meta.valid"
      ></the-input>
      <the-input
        v-model="confirm_password"
        :label="$t('registration.confirm_password')"
        :placeholder="$t('registration.confirm_password')"
        name="confirm_password"
        rules="required|confirmed:@password"
        type="password"
        :errors="errors"
        :valid="meta.valid"
      ></the-input>
      <button class="text-white text-sm rounded py-3 w-full text-center bg-base-red">
        {{ $t('password.reset_password') }}
      </button>
      <RouterLink :to="{ name: 'login' }" class="flex items-center mt-8 mb-12 cursor-pointer">
        <icon-left-arrow></icon-left-arrow>
        <button class="text-dark-gray ml-4">{{ $t('password.go_back') }}</button></RouterLink
      >
    </Form>
  </div>
</template>
