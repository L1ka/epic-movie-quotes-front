<script setup>
import IconVerified from '@/components/icons/IconVerified.vue'
import { ref, onMounted } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'

const modal = ref(null)
const route = useRouter()
const open = ref(true)
const show = ref(false)

onMounted(() => {
  handleSubmit()
})

onClickOutside(modal, () => {
  route.push({ name: 'landing' })
  open.value = false
})

const handleSubmit = async () => {
  const parameter = useRoute()

  try {
    await axiosInstance.post(`/api/email-verified`, {
      token: parameter.query.token
    })
    show.value = true
  } catch (error) {
    if (error.response.data.error == 'already verified') {
      return route.push({ name: 'login' })
    }
    return route.push({ name: 'expired-email', params: { token: parameter.query.token } })
  }
}
</script>

<template>
  <div v-if="show">
    <div
      v-if="open"
      class="fixed top-0 left-0 bottom-0 right-0 z-50 backdrop-blur-sm bg-black sm:bg-black/30"
    ></div>
    <div
      v-if="open"
      ref="modal"
      class="pt-6 sm:pt-16 w-[80%] h-[50%] sm:w-[60%] lg:w-[40%] 2xl:w-[30%] sm:h-fit absolute top-[35%] sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-light-gray rounded-lg flex justify-center"
    >
      <div class="flex flex-col items-center text-white">
        <icon-verified class="text-m mb-[20px] mt-12"></icon-verified>
        <h1 class="text-m mb-[30px]">{{ $t('email.thank_you') }}</h1>
        <p class="text-sm text-center mb-[50px]">{{ $t('email.account_activated') }}</p>
        <RouterLink
          :to="{ name: 'login' }"
          class="text-white text-sm rounded py-3 md:px-[125px] px-[100px] text-center bg-base-red mb-[50px]"
        >
          {{ $t('registration.log_in') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
