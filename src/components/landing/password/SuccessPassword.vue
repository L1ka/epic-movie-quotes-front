<script setup>
import IconDone from '@/components/icons/IconDone.vue'
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
  <div
    v-if="open"
    class="fixed top-0 left-0 bottom-0 right-0 backdrop-blur-sm bg-black sm:bg-black/30"
  ></div>
  <div
    v-if="open"
    ref="modal"
    class="pt-16 min-w-[90%] min-h-[50%] sm:min-w-[550px] sm:min-h-[400px] absolute top-[35%] sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-20 bg-light-gray rounded-lg flex justify-center"
  >
    <div class="flex flex-col items-center text-white">
      <icon-done class="mb-[20px]"></icon-done>
      <h1 class="text-m mb-[30px]">{{ $t('password.success') }}</h1>
      <p class="text-sm text-center mb-[50px]">{{ $t('password.changed_successfully') }}</p>
      <RouterLink
        :to="{ name: 'login' }"
        class="text-white text-sm rounded py-[7px] px-[125px] text-center bg-base-red mb-[65px]"
      >
        {{ $t('registration.log_in') }}
      </RouterLink>
    </div>
  </div>
</template>
