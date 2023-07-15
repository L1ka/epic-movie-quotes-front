<script setup>
import IconExpired from '@/components/icons/IconExpired.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'
import axiosInstance from '@/config/axios/index.js'

const modal = ref(null)
const route = useRouter()
const open = ref(true)

const props = defineProps({
  token: {
    type: String,
    required: true
  }
})

onClickOutside(modal, () => {
  route.push({ name: 'landing' })
  open.value = false
})

const handleSubmit = async () => {
  try {
    await axiosInstance.post('/api/send-email', {
      token: props.token
    })
    route.push({ name: 'verify-email' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <div
      v-if="open"
      class="fixed top-0 left-0 bottom-0 right-0 z-50 backdrop-blur-sm bg-black sm:bg-black/30"
    ></div>
    <div
      v-if="open"
      ref="modal"
      class="pt-16 min-w-[90%] min-h-[50%] sm:min-w-[650px] sm:min-h-[400px] absolute top-[40%] sm:top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 bg-light-gray rounded-lg flex justify-center"
    >
      <div class="flex flex-col items-center text-white">
        <icon-expired class="text-m mb-[20px]"></icon-expired>
        <h1 class="text-m mb-[30px]">{{ $t('expiration.link_expired') }}</h1>
        <p class="text-sm text-center mb-[50px]">
          {{ $t('expiration.unused_link_expired') }}
        </p>
        <button
          class="text-white text-sm rounded py-3 sm:px-[125px] px-[25px] text-center bg-base-red mb-12"
          @click="handleSubmit"
        >
          {{ $t('expiration.request_another_link') }}
        </button>
      </div>
    </div>
  </div>
</template>
