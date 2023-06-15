<script setup>
import TheInput from '@/components/ui/TheInput.vue'
import { reactive, ref } from 'vue'
import { Form } from 'vee-validate'
import axiosInstance from '@/config/axios/index.js'

const form = reactive({
  email: '',
  password: '',
  remember: false
})

let errorsFromBack = ref([])

const handleSubmit = async () => {
  await axiosInstance.get('/sanctum/csrf-cookie')

  await axiosInstance
    .post('/api/login', {
      email: form.email,
      password: form.password,
      remember: form.remember
    })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
      errorsFromBack.value = error.response.data.errors
    })
}
</script>

<template>
  <Form @submit="handleSubmit" v-slot="{ errors, meta }" class="w-full">
    <the-input
      v-model="form.email"
      :label="$t('registration.email')"
      :placeholder="$t('registration.enter_your_email')"
      name="email"
      rules="required|min:3"
      :errors="errors"
      :valid="meta.valid"
      :errorsFromBack="errorsFromBack"
    ></the-input>

    <the-input
      v-model="form.password"
      :label="$t('registration.password')"
      :placeholder="$t('registration.password')"
      name="password"
      rules="required"
      type="password"
      :errors="errors"
      :valid="meta.valid"
    ></the-input>

    <div class="flex justify-between items-center mt-[3%] mb-[4%] w-full">
      <div class="flex items-center">
        <input
          v-model="form.remember"
          type="checkbox"
          name="remember"
          class="accent-[#249E2C] h-4 w-4 mr-2"
        />
        <label for="remember" class="text-white">{{ $t('login.remember_me') }}</label>
      </div>
      <router-link :to="{ name: 'forgot-password' }" class="text-xs-2 text-blue">{{
        $t('login.forgot_password')
      }}</router-link>
    </div>

    <button
      type="submit"
      class="w-full mt-2 bg-base-red text-white rounded py-3 px-[13px] text-center"
    >
      {{ $t('login.sign_in') }}
    </button>
  </Form>
</template>
