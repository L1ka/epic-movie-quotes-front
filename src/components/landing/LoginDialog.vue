<script setup>
import LoginForm from '@/components/landing/LoginForm.vue'
import IconGoogle from '@/components/icons/IconGoogle.vue'
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

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
    class="pt-16 md:w-[600px] md:h-[700px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center">
      <h1 class="text-white mb-3 text-m">{{ $t('login.log_in_to_your_account') }}</h1>
      <p class="text-dark-gray mb-8 text-sm">{{ $t('login.welcome_back') }}</p>

      <login-form></login-form>

      <div class="flex justify-around items-center mt-[3%] mb-[4%] w-full">
        <div class="flex items-center">
          <input type="checkbox" name="remember" class="accent-[#249E2C] h-4 w-4 mr-2" />
          <label for="remember" class="text-white">{{ $t('login.remember_me') }}</label>
        </div>
        <router-link to="/" class="text-xs-2 text-blue">{{
          $t('login.forgot_password')
        }}</router-link>
      </div>

      <div
        class="flex w-[360px] justify-center items-center mt-4 border border-gray h-[38px] rounded"
      >
        <icon-google></icon-google>
        <p class="text-white ml-2">{{ $t('login.sign_in_with_google') }}</p>
      </div>

      <div class="flex w-[360px] justify-center items-center mt-8">
        <p class="text-dark-gray">{{ $t('login.dont_have_account') }}</p>
        <router-link to="/about" class="text-blue ml-2 underline">{{
          $t('login.sign_up')
        }}</router-link>
      </div>
    </div>
  </div>
</template>
