<script setup>
import IconEmail from '@/components/icons/IconEmail.vue'
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

function redirectToEmail() {
  window.location.href = 'https://mail.google.com/'
}
</script>

<template>
  <div
    v-if="open"
    class="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black sm:bg-black/30"
  ></div>
  <div
    v-if="open"
    id="pop-up"
    ref="modal"
    class="pt-6 sm:pt-16 w-[80%] h-[50%] sm:w-[60%] lg:w-[40%] 2xl:w-[30%] sm:h-fit absolute top-[35%] sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center text-white w-[90%]">
      <icon-email class="mb-[20px]"></icon-email>
      <h1 class="sm:text-m text-sm-bold mb-[30px]">{{ $t('password.check_email') }}</h1>
      <p class="text-[11px] sm:text-sm text-center mb-[50px]">
        {{ $t('password.instructions_sent') }}
      </p>
      <button
        @click="redirectToEmail"
        class="text-white text-sm rounded py-3 w-full text-center bg-base-red"
      >
        {{ $t('password.open_email') }}
      </button>

      <RouterLink :to="{ name: 'login' }" class="flex items-center mt-8 mb-12 cursor-pointer">
        <!-- <icon-left-arrow></icon-left-arrow> -->
        <button class="text-dark-gray ml-4">
          {{ $t('password.skip_confirmation') }}
        </button></RouterLink
      >
    </div>
  </div>
</template>
