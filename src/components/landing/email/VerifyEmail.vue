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
    ref="modal"
    class="pt-6 sm:pt-16 w-[80%] h-[50%] sm:w-[60%] lg:w-[40%] 2xl:w-[30%] sm:h-fit absolute top-[35%] sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center text-white w-[90%]">
      <icon-email class="text-m mb-[20px]"></icon-email>
      <h1 class="text-m mb-[30px]">{{ $t('email.thank_you') }}</h1>
      <p class="text-sm text-center mb-[50px] text-[12px]">{{ $t('email.check_email') }}</p>
      <button
        @click="redirectToEmail"
        class="text-white text-sm rounded px-[25px] py-[7px] md:px-[125px] text-center bg-base-red mb-[50px]"
      >
        {{ $t('email.open_email') }}
      </button>
    </div>
  </div>
</template>
