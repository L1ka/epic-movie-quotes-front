<script setup>
import TheInput from '@/components/ui/TheInput.vue'
import { useUserStore } from '@/store/getUser.js'
import InputLayout from '@/components/user-profile/InputLayout.vue'
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import ValidationInformation from '@/components/user-profile/ValidationInformation.vue'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'
import { Form } from 'vee-validate'
import axiosInstance from '@/config/axios/index.js'
import { useRouter } from 'vue-router'

const route = useRouter()

const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())
let errorsFromBack = ref([])

const form = reactive({
  email: '',
  password: '',
  confirm_password: '',
  first_name: ''
})

const showConfirmation = ref(false)
const show = ref(false)

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  placeholder: {
    type: String
  },
  rules: {
    type: String
  },
  type: {
    type: String
  },
  errorsFromBack: {
    type: [String, Object]
  },
  errors: {
    type: Object
  },
  valid: {
    type: Boolean
  }
})

const handleSubmit = async () => {
  showConfirmation.value = false
  await axiosInstance
    .post('/api/update-user', {
      user: user.value,
      [props.name]: form[props.name]
    })
    .then(() => {
      show.value = false
      getUser()
      if (props.name === 'email') {
        return route.push({ name: 'verify-email' })
      }
    })
    .catch((error) => {
      console.log(error)
      errorsFromBack.value = error.response.data.errors
    })
}

const edit = () => {
  show.value = false
  showConfirmation.value = true
}
</script>

<template>
  <Form @submit="handleSubmit" v-slot="{ errors, meta }" class="w-full relative">
    <div class="flex items-end border-b-2 border-border w-full justify-between mb-8 pb-4">
      <div class="flex flex-col w-[90%]">
        <p class="mb-2">{{ title }}</p>
        <p class="lg:bg-gray px-3 py-2 lg:text-dark-gray">
          {{ name == 'password' ? '*******' : user?.[name] }}
        </p>
      </div>
      <p @click="show = true">Edit</p>
    </div>

    <validation-information v-if="show && name == 'password'"></validation-information>

    <input-layout v-if="show" class="hidden lg:flex">
      <p class="mb-2">New {{ title }}</p>

      <the-input
        v-model="form[name]"
        :name="name"
        :rules="rules"
        :errors="errors"
        class="mb-[0]"
        :valid="meta.valid"
        :type="type"
        :placeholder="placeholder"
        :errorsFromBack="errorsFromBack?.[name]?.[0]"
      ></the-input>
    </input-layout>

    <div v-if="show" class="lg:hidden fixed z-30 top-0 left-0 bottom-0 right-0 bg-black"></div>

    <input-layout v-if="show" class="lg:hidden absolute bottom-64 z-40 bg-light-black left-0 py-10">
      <icon-left-arrow
        @click="show = false"
        class="ml-8 self-start lg:hidden absolute bottom-48"
      ></icon-left-arrow>
      <p class="mb-2 text-sm px-7">New {{ title }}</p>

      <the-input
        v-model="form[name]"
        :name="name"
        :rules="rules"
        :errors="errors"
        class="mb-[0] px-7"
        :valid="meta.valid"
        :type="type"
        :placeholder="placeholder"
        :errorsFromBack="errorsFromBack?.[name]?.[0]"
      ></the-input>
      <div class="flex justify-between w-full absolute lg:hidden bottom-[-25%] px-7">
        <button @click="show = false">Cancel</button>
        <button @click="edit" class="bg-base-red px-5 py-2 rounded">Edit</button>
      </div>
    </input-layout>

    <!-- <confirm-dialog v-if="showConfirmation"></confirm-dialog> -->
    <div
      v-if="showConfirmation"
      class="lg:hidden fixed z-30 top-0 left-0 bottom-0 right-0 bg-black"
    ></div>
    <div
      v-if="showConfirmation"
      class="lg:hidden absolute bottom-64 z-40 bg-light-black left-0 py-16 rounded-lg w-full"
    >
      <p class="pb-10 px-8 border-b-2 border-border text-xs sm:text-sm">
        Are you sure to make changes ?
      </p>
      <div class="flex justify-between w-full absolute lg:hidden px-7 mt-2">
        <button @click="showConfirmation = false">Cancel</button>
        <button class="bg-base-red px-5 py-2 rounded">Confirm</button>
      </div>
    </div>

    <input-layout v-if="show && name == 'password'">
      <p class="mb-2">Confirm New {{ title }}</p>

      <the-input
        v-model="form.confirm_password"
        name="confirm_password"
        rules="required|confirmed:@password"
        :errors="errors"
        class="mb-[0]"
        :valid="meta.valid"
        :type="type"
        placeholder="Repeat password"
      ></the-input>
    </input-layout>
  </Form>
</template>
