<script setup>
import UserCard from '@/components/news-feed/UserCard.vue'
import getDate from '@/services/date/getDate'

const props = defineProps({ notification: { type: Object, required: true } })

const date = getDate(props.notification.created_at)
</script>

<template>
  <div
    class="flex border border-solid border-b-2 border-border text-sm text-white w-full py-4 px-4 mb-2 relative"
  >
    <div class="flex flex-col">
      <user-card :user="notification.user" :like="true" :seen="notification.seen"></user-card>
      <div class="flex">
        <p class="text-light-green lg:absolute lg:right-4 lg:top-14 mr-8" v-if="!notification.seen">
          New
        </p>

        <p class="lg:absolute lg:right-4 lg:top-4">{{ date }}</p>
      </div>
    </div>
  </div>
</template>
