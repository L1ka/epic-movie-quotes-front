<script setup>
import ConfirmDialog from '@/components/user-profile/mobile/ConfirmDialog.vue'
import OldValueField from '@/components/user-profile/OldValueField.vue'
import SuccessMessage from '@/components/user-profile/mobile/SuccessMessage.vue'
import ErrorMessage from '@/components/user-profile/mobile/ErrorMessage.vue'
import InputField from '@/components/user-profile/mobile/InputField.vue'
import PasswordField from '@/components/user-profile/mobile/PasswordField.vue'
import { useUserStore } from '@/store/getUser.js'
import axiosInstance from '@/config/axios/index.js'
import { storeToRefs } from 'pinia'
import { Form } from 'vee-validate'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const showConfirmation = ref(false)
const success = ref(false)
const router = useRouter()
const route = useRoute()
const errorsFromBack = ref(null)
const emit = defineEmits(['modal'])
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

const showInput = (e) => {
  if (!user.value.google_id || e !== 'input2') visibleInputs[e] = !visibleInputs[e]
  emit('modal')
  console.log('from form')
}

const updateEmail = async () => {
  await axiosInstance
    .post('/api/update-email', { email: route.query.email })
    .then(() => router.push({ name: 'profile' }))
}

if (route.query.email) {
  updateEmail()
}

const handleSubmit = async (data, { resetForm }) => {
  await axiosInstance
    .post('/api/update-user', {
      user: user.value,
      email: data.email,
      password: data.password,
      confirm_password: data.confirm_password,
      first_name: data.first_name
    })
    .then(() => {
      success.value = true
      getUser()
      if (data.email) {
        success.value = false
        return router.push({ name: 'update-email' })
      }
    })
    .catch((error) => {
      errorsFromBack.value = error.response.data.message
    })

  resetForm()
  visibleInputs.input1 = false
  visibleInputs.input2 = false
  visibleInputs.input3 = false
  showConfirmation.value = false
}
</script>

<template>
  <Form
    @submit="handleSubmit"
    class="w-full text-white"
    v-slot="{ errors, meta }"
    v-if="user.image"
  >
    <old-value-field
      v-if="user?.first_name"
      title="Username"
      name="first_name"
      id="input1"
      @show="showInput($event)"
    ></old-value-field>

    <input-field
      @visible="visibleInputs.input1 = false"
      @edit="showConfirmation = true"
      :input="visibleInputs.input1"
      :value="form.first_name"
      name="first_name"
      rules="required|min:3|max:15|alpha_num_lower"
      :errors="errors"
      :valid="meta.valid"
      placeholder="Enter new usarname"
      label="Username"
    ></input-field>

    <old-value-field
      v-if="user?.email"
      title="email"
      name="email"
      id="input2"
      @show="showInput($event)"
    ></old-value-field>

    <input-field
      @visible="visibleInputs.input2 = false"
      @edit="showConfirmation = true"
      :input="visibleInputs.input2"
      :value="form.email"
      name="email"
      rules="required|email"
      :errors="errors"
      :valid="meta.valid"
      placeholder="Enter new email"
      label="Email"
    ></input-field>

    <old-value-field
      v-if="!user.google_id"
      title="Password"
      id="input3"
      name="*******"
      @show="showInput($event)"
    ></old-value-field>

    <password-field
      @visible="visibleInputs.input3 = false"
      @edit="showConfirmation = true"
      :input="visibleInputs.input3"
      :value="form.password"
      :confirm-value="form.confirm_password"
      name="password"
      rules="required|min:8|max:15|alpha_num_lower"
      :errors="errors"
      :valid="meta.valid"
      placeholder="Enter new password"
      label="Password"
    ></password-field>

    <confirm-dialog
      v-if="showConfirmation && meta.valid"
      @close-dialog="showConfirmation = false"
    ></confirm-dialog>

    <success-message v-if="!errorsFromBack && success" @closed="success = false"></success-message>

    <error-message
      v-if="errorsFromBack"
      :error="errorsFromBack"
      @closed="errorsFromBack = false"
    ></error-message>
  </Form>
</template>
