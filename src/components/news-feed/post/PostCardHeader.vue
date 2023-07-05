<script setup>
import UserCard from '@/components/news-feed/UserCard.vue'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const { selectedLocale } = storeToRefs(useLocaleStore())
const backUrl = import.meta.env.VITE_API_BASE_URL
const props = defineProps({
  quote: { type: Object, required: true },
  movie: { type: Object, required: true }
})
</script>

<template>
  <div>
    <user-card :user="quote.user"></user-card>
    <p class="text-white text-sm mb-4 lg:text-sm-bold">
      “{{ quote.quote[selectedLocale] }}.” {{ $t('quote.movie') }}-
      <span class="text-light-yallow">{{ movie.title[selectedLocale] }}.</span> ({{ movie.year }})
    </p>
    <div
      :style="{ 'background-image': 'url(' + backUrl + quote.image + ')' }"
      class="mb-4 rounded-lg w-full h-[450px] bg-cover bg-center"
    ></div>
  </div>
</template>
