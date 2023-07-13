<script setup>
import IconMessage from '@/components/icons/IconMessage.vue'
import IconHeart from '@/components/icons/IconHeart.vue'

const props = defineProps({
  commentSum: { type: Number, required: true },
  likeSum: { type: Number, required: true }
})
</script>

<template>
  <div class="flex items-center md:text-sm-bold">
    <div class="mr-6 flex">
      <p class="text-white mr-3 text-sm lg:text-sm-bold">{{ commentSum }}</p>
      <icon-message class="w-6 lg:w-8"></icon-message>
    </div>
    <div class="flex">
      <p class="text-white mr-3 text-sm lg:text-sm-bold">{{ likeSum }}</p>
      <icon-heart class="w-6 lg:w-8 cursor-pointer"></icon-heart>
    </div>
  </div>
</template>
