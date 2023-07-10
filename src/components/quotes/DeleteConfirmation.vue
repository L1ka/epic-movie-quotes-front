<script setup>
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const props = defineProps({
  quote: { type: Object, required: false },
  movie: { type: Object, required: false }
})
const { selectedLocale } = storeToRefs(useLocaleStore())
</script>

<template>
  <div class="bg-light-gray absolute z-30 left-0 top-12 p-4 rounded-md">
    <p v-if="quote">{{ $t('edit_quote.delete_quote') }}: {{ quote[selectedLocale] }}?</p>
    <p v-if="movie">{{ $t('movie.delete_movie') }}: {{ movie[selectedLocale] }}?</p>
    <div class="flex items-center justify-between w-full p-4 mt-4">
      <button class="p-2 border border-border rounded-md bg-light-gray" @click="$emit('cancel')">
        {{ $t('movie.cancel') }}
      </button>
      <button
        class="p-2 px-4 border border-border rounded-md bg-base-red"
        @click="$emit('deleteItem')"
      >
        {{ $t('movie.yes') }}
      </button>
    </div>
  </div>
</template>
