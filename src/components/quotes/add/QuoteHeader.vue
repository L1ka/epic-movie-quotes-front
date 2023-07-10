<script setup>
import IconExit from '@/components/icons/IconExit.vue'
</script>

<template>
  <div class="border-b-2 border-border flex justify-center items-center py-8">
    <p class="text-sm-light capitalize">{{ $t('add_quote.header') }}</p>
    <icon-exit class="absolute right-6" @click="$emit('open')"></icon-exit>
  </div>
</template>
