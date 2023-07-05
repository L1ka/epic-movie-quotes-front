<script setup>
import UserCard from '@/components/news-feed/UserCard.vue'

const props = defineProps({
  quote: { type: Object, required: true },
  modelValue: { type: Boolean, required: false }
})

const displayedItems = () => {
  if (props.modelValue) {
    return props.quote.comments
  } else {
    return props.quote.comments.slice(0, 2)
  }
}
</script>

<template>
  <div v-for="(comment, index) in displayedItems()" :key="index" class="px-8 text-white">
    <div v-if="comment">
      <user-card :user="comment.user"></user-card>
      <p
        class="text-white text-sm lg:text-sm-bold lg:ml-20 border-solid border-b-2 border-border pb-4 md:pb-8"
      >
        {{ comment.body }}
      </p>
    </div>
  </div>
</template>
