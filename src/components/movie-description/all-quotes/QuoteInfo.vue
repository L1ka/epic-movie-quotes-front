<script setup>
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const backUrl = import.meta.env.VITE_API_BASE_URL
const { selectedLocale } = storeToRefs(useLocaleStore())
const props = defineProps({
  image: { type: String, required: false },
  quote: { type: Object, required: false }
})
</script>

<template>
  <div class="md:flex items-center md:border-b-2 border-border pb-4 md:pb-8">
    <div
      :style="{ 'background-image': 'url(' + backUrl + image + ')' }"
      class="w-full md:w-[30%] h-40 rounded-md bg-cover bg-center mt-8 md:mr-8"
    ></div>
    <p class="border-b-2 border-border md:border-0 pb-4 text-gray mt-2 md:text-sm-bold">
      {{ quote[selectedLocale] }}
    </p>
  </div>
</template>
