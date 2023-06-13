<!-- eslint-disable no-unused-vars -->
<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: false
  },
  to: {
    type: String,
    required: true
  }
})
</script>

<template>
  <router-link
    :to="{ name: to }"
    :class="color ? color : 'border border-white rounded'"
    class="text-white rounded py-3 px-[4px] md:py-[7px] md:px-[13px] text-center"
  >
    {{ title }}
  </router-link>
</template>
