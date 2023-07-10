<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'
import QuoteForm from '@/components/news-feed/create-quote/QuoteForm.vue'
import { ref } from 'vue'

const open = ref(false)
const emit = defineEmits(['update'])
const updateQuotes = () => {
  emit('update')
}
</script>

<template>
  <div
    class="flex text-white lg:bg-light-black lg:w-[70%] lg:mr-4 px-6 py-4 rounded-md"
    @click="open = !open"
  >
    <icon-pencil class="mr-4"></icon-pencil>
    <p class="text-sm">{{ $t('quote.new_quote') }}</p>
  </div>
  <quote-form v-if="open" @update="updateQuotes"></quote-form>
</template>
