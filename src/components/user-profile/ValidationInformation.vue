<script setup>
import IconCircle from '@/components/icons/IconCircle.vue'
</script>

<template>
  <div class="py-6 px-6 rounded border border-border mb-8">
    <p class="text-white text-sm-light">Passwords should contain:</p>

    <div class="flex items-center mb-2">
      <icon-circle class="mr-2 fill-[#9C9A9A]"></icon-circle>
      <p class="text-[#9C9A9A] text-sm">8 or more characters</p>
    </div>
    <div class="flex items-center">
      <icon-circle class="mr-2 fill-green"></icon-circle>
      <p class="text-white text-sm">15 lowercase character</p>
    </div>
  </div>
</template>
