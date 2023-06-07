<script setup>
import TheInput from '@/components/ui/TheInput.vue'
import { reactive, ref } from 'vue'
import { Form } from 'vee-validate'
import axiosInstance from '@/config/axios/index.js'
import { useRouter } from 'vue-router'

const route = useRouter()
const form = reactive({
  first_name: '',
  email: '',
  password: '',
  confirm_password: ''
})
let errorsFromBack = ref([])

const handleSubmit = async () => {
  await axiosInstance
    .post('/api/register', {
      first_name: form.first_name,
      email: form.email,
      password: form.password,
      confirm_password: form.confirm_password
    })
    .then(() => {
      route.push({ name: 'verify-email' })
    })
    .catch((error) => {
      errorsFromBack.value = error.response.data.errors
    })
}
</script>

<template>
  <Form @submit="handleSubmit" v-slot="{ errors, meta }" class="w-full">
    <the-input
      v-model="form.first_name"
      :label="$t('registration.name')"
      :placeholder="$t('registration.enter_your_name')"
      name="first_name"
      rules="required|min:3|max:15|alpha_num_lower"
      :errors="errors"
      :valid="meta.valid"
      :errorsFromBack="errorsFromBack?.['first_name']?.[0]"
    ></the-input>

    <the-input
      v-model="form.email"
      :label="$t('registration.email')"
      :placeholder="$t('registration.enter_your_email')"
      name="email"
      rules="required|email"
      :errors="errors"
      :errorsFromBack="errorsFromBack?.['email']?.[0]"
    ></the-input>

    <the-input
      v-model="form.password"
      :label="$t('registration.password')"
      :placeholder="$t('registration.password')"
      name="password"
      rules="required|min:8|max:15|alpha_num_lower"
      type="password"
      :errors="errors"
    ></the-input>

    <the-input
      v-model="form.confirm_password"
      :label="$t('registration.confirm_password')"
      :placeholder="$t('registration.password')"
      name="confirm_password"
      rules="required|confirmed:@password"
      type="password"
      :errors="errors"
    ></the-input>

    <button
      type="submit"
      class="w-full mt-2 bg-base-red text-white rounded py-[7px] px-[13px] text-center"
    >
      {{ $t('registration.get_started') }}
    </button>
  </Form>
</template>
