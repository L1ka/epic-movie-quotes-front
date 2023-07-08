<script setup>
import IconFilledHeart from '@/components/icons/IconFilledHeart.vue'
import IconComment from '@/components/icons/IconComment.vue'
import { computed } from 'vue'

const backUrl = import.meta.env.VITE_API_BASE_URL
const props = defineProps({
  user: { type: Object, required: true },
  like: { type: Boolean, required: false },
  comment: { type: Boolean, required: false },
  seen: { type: [Boolean, Number], required: false }
})

const hasBorder = computed(() => {
  return props.seen === 0 && (props.like || props.comment) ? 'border-2 border-green' : ''
})
</script>

<template>
  <div class="flex items-center mb-4 mt-8" v-if="user">
    <div
      :style="{ 'background-image': 'url(' + backUrl + user.image + ')' }"
      class="w-14 h-14 mr-4 bg-cover bg-no-repeat bg-center rounded-full mb-2"
      :class="hasBorder"
    ></div>
    <div>
      <p class="text-white text-sm lg:text-sm-bold capitalize mb-3">{{ user.first_name }}</p>
      <div class="flex mb-3" v-if="like">
        <icon-filled-heart class="mr-3"></icon-filled-heart>
        <p>Reacted to your quote</p>
      </div>

      <div class="flex" v-if="comment">
        <icon-comment class="mr-3"></icon-comment>
        <p>Commented to your quote..</p>
      </div>
    </div>
  </div>
</template>
