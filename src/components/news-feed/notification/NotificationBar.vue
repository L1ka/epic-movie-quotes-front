<script setup>
import ReactionNotification from '@/components/news-feed/notification/ReactionNotification.vue'
import CommentNotification from '@/components/news-feed/notification/CommentNotification.vue'
import axiosInstance from '@/config/axios/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ notifications: { type: Object, required: true } })
const notifications = ref(props.notifications)
const emit = defineEmits(['update'])

const openNotification = async (quoteId, movieId, notificationId) => {
  await axiosInstance.post('/api/notisication-seen', { id: notificationId })
  router.push({ path: `/movie-description/${movieId}/view/${quoteId}` })
}

const markAsRead = async () => {
  await axiosInstance.post('/api/mark-all-seen').then((res) => console.log(res))
  notifications.value.forEach((element) => {
    element.seen = 1
  })

  emit('update')
}
</script>

<template>
  <div>
    <div
      class="bg-black absolute z-[10000] left-0 right-0 top-[110%] px-8 py-6 text-white rounded-md lg:left-[50%]"
    >
      <div>
        <div class="flex justify-between mb-8">
          <p class="text-sm-bold">Notifications</p>
          <p class="underline cursor-pointer" @click="markAsRead()">Mark as all read</p>
        </div>

        <div v-for="(notification, index) in notifications" :key="index">
          <comment-notification
            v-if="notification.type == 'comment'"
            :notification="notification"
            @click="openNotification(notification.quote_id, notification.movie_id, notification.id)"
          ></comment-notification>
          <reaction-notification
            v-else
            :notification="notification"
            @click="openNotification(notification.quote_id, notification.movie_id, notification.id)"
          ></reaction-notification>
        </div>
      </div>
    </div>
  </div>
</template>
