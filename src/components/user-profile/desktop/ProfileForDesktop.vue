<script setup>
import OldValueField from '@/components/user-profile/OldValueField.vue'
import TheInput from '@/components/ui/TheInput.vue'
import PasswordField from '@/components/user-profile/desktop/PasswordField.vue'
import ErrorMessage from '@/components/user-profile/mobile/ErrorMessage.vue'
import UserImage from '@/components/user-profile/UserImage.vue'
import { RouterView } from 'vue-router'
import { Form } from 'vee-validate'
import { useUserStore } from '@/store/getUser.js'
import axiosInstance from '@/config/axios/index.js'
import { storeToRefs } from 'pinia'
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const errorsFromBack = ref(null)
const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())

const form = reactive({
  email: '',
  password: '',
  confirm_password: '',
  first_name: ''
})

const visibleInputs = reactive({
  input1: false,
  input2: false,
  input3: false
})

const reset = () => {
  visibleInputs.input1 = false
  visibleInputs.input2 = false
  visibleInputs.input3 = false
}

const showInput = (e) => {
  if (!user.value.google_id || e !== 'input2') visibleInputs[e] = !visibleInputs[e]
}
const showSaveButton = computed(() => {
  return Object.values(visibleInputs).some((value) => value)
})

const updateEmail = async () => {
  await axiosInstance
    .post('/api/profile/email', { email: route.query.email })
    .then(() => router.push({ name: 'profile' }))
}

if (route.query.email) {
  updateEmail()
}

const handleSubmit = async (data, { resetForm }) => {
  await axiosInstance
    .post('/api/profile/user', {
      user: user.value,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      first_name: data.first_name
    })
    .then(() => {
      getUser()
      if (data.email) {
        return router.push({ name: 'update-email' })
      }
    })
    .catch((error) => {
      errorsFromBack.value = error.response.data.message
    })

  resetForm()
  reset()
}
</script>

<template>
  <div class="hidden lg:flex flex-col lg:items-center min-h-screen w-screen text-white" v-if="user">
    <router-view></router-view>

    <p class="hidden lg:block text-white">{{ $t('profile.profile') }}</p>
    <div
      class="bg-light-black relative lg:text-dark-gray lg:bg-modal-black px-8 lg:px-36 2xl:px-52 flex flex-col items-center mt-6 lg:mt-32 w-full lg:w-[55%] h-screen lg:h-full lg:pb-44 mb-48"
    >
      <user-image></user-image>

      <Form @submit="handleSubmit" class="w-full text-white" v-slot="{ errors, meta }">
        <old-value-field
          :title="$t('profile.username')"
          name="first_name"
          id="input1"
          @show="showInput($event)"
        ></old-value-field>

        <div class="mb-6 input w-full" id="1" v-if="visibleInputs.input1">
          <p class="mb-2">{{ $t('profile.new_username') }}</p>

          <the-input
            v-model="form.first_name"
            name="first_name"
            rules="required|min:3|max:15|alpha_num_lower"
            :errors="errors"
            class="mb-[0] w-full text-dark-gray"
            :valid="meta.valid"
            :placeholder="$t('profile.enter_username')"
          ></the-input>
        </div>

        <old-value-field
          :title="$t('profile.email')"
          id="input2"
          name="email"
          @show="showInput($event)"
        ></old-value-field>

        <div class="mb-6 input" id="2" v-if="visibleInputs.input2">
          <p class="mb-2">{{ $t('profile.new_email') }}</p>
          <the-input
            v-model="form.email"
            name="email"
            rules="required|email"
            :errors="errors"
            class="mb-[0] w-[750px] text-dark-gray"
            :valid="meta.valid"
            :placeholder="$t('profile.enter_email')"
          ></the-input>
        </div>

        <old-value-field
          v-if="!user.google_id"
          :title="$t('profile.password')"
          id="input3"
          name="password"
          @show="showInput($event)"
        ></old-value-field>

        <password-field
          :value="form.password"
          :confirm-value="form.confirm_password"
          :errors="errors"
          :valid="meta.valid"
          v-if="visibleInputs.input3"
        ></password-field>

        <error-message
          v-if="errorsFromBack"
          :error="errorsFromBack"
          @closed="errorsFromBack = false"
        ></error-message>

        <div
          class="flex items-center absolute right-0 bottom-[-150px] text-white"
          v-if="showSaveButton"
        >
          <p class="mr-6" @click="reset()">{{ $t('profile.cancel') }}</p>

          <button class="rounded-md p-4 bg-base-red">{{ $t('profile.save') }}</button>
        </div>
      </Form>
    </div>
  </div>
</template>
