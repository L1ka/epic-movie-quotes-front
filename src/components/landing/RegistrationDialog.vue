<script setup>
import RegistrationForm from '@/components/landing/RegistrationForm.vue'

import IconGoogle from '@/components/icons/IconGoogle.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
const modal = ref(null)
const route = useRouter()
const open = ref(true)

onClickOutside(modal, () => {
  route.push({ name: 'landing' })
  open.value = false
})
</script>

<template>
  <div v-if="open" class="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black/30"></div>
  <div
    v-if="open"
    ref="modal"
    class="pt-16 md:min-w-[600px] md:min-h-[700px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-white mb-3 text-m">{{ $t('registration.create_an_account') }}</h1>
      <p class="text-dark-gray mb-8 text-sm">{{ $t('registration.start_your_journey') }}</p>

      <registration-form></registration-form>

      <div
        class="flex w-[360px] justify-center items-center mt-4 border border-gray h-[38px] rounded"
      >
        <icon-google></icon-google>
        <p class="text-white ml-2">{{ $t('registration.sign_up_with_google') }}</p>
      </div>

      <div class="flex w-[360px] justify-center items-center mt-8 mb-12">
        <p class="text-dark-gray">{{ $t('registration.already_have_an_account') }}</p>
        <router-link to="/about" class="text-blue ml-2 underline">{{
          $t('registration.log_in')
        }}</router-link>
      </div>
    </div>
  </div>
</template>
