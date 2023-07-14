<script setup>
import IconPencil from '@/components/icons/IconPencil.vue'

const props = defineProps({ width: { type: String, required: true } })
</script>

<template>
  <router-link
    :to="{ name: 'news-feed-quote' }"
    class="flex text-white lg:bg-light-black px-6 py-4 rounded-md"
    :class="width"
  >
    <icon-pencil class="mr-4"></icon-pencil>
    <p class="text-sm">{{ $t('quote.new_quote') }}</p>
  </router-link>
</template>
