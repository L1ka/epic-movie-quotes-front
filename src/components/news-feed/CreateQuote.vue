<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'
import QuoteForm from '@/components/news-feed/QuoteForm.vue'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div class="flex text-white lg:bg-light-black lg:w-[70%] lg:mr-4 px-6 py-2 rounded-md">
    <icon-pencil @click="open = !open" class="mr-4"></icon-pencil>
    <p class="text-sm">Write new quote</p>
  </div>
  <quote-form v-if="open"></quote-form>
</template>
