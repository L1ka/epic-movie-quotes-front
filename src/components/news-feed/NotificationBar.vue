<script setup>
import ReactionNotification from '@/components/news-feed/ReactionNotification.vue'
import CommentNotification from '@/components/news-feed/CommentNotification.vue'
</script>

<template>
  <div
    class="bg-black absolute z-[10000] left-0 right-0 top-[110%] px-8 py-6 text-white rounded-md lg:left-[50%]"
  >
    <div class="flex justify-between mb-8">
      <p class="text-sm-bold">Notifications</p>
      <p class="underline">Mark as all read</p>
    </div>

    <reaction-notification></reaction-notification>
    <comment-notification></comment-notification>
  </div>
</template>
