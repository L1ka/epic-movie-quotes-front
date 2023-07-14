<script setup>
import ReactionNotification from '@/components/news-feed/notification/ReactionNotification.vue'
import CommentNotification from '@/components/news-feed/notification/CommentNotification.vue'
import axiosInstance from '@/config/axios/index.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/getUser.js'

const router = useRouter()
const props = defineProps({ notifications: { type: Object, required: true } })
const notifications = ref(props.notifications)
const { user } = storeToRefs(useUserStore())
const emit = defineEmits(['update', 'open-notification'])

const openNotification = async (quoteId, movieId, notificationId) => {
  await axiosInstance.post('/api/notification-seen', { id: notificationId })
  router.push({ name: 'view-quote', params: { id: movieId, quoteId: quoteId } })
  notifications.value.forEach((el) => {
    if (el.id == notificationId) {
      el.seen = 1
    }
  })
  emit('open-notification', notificationId)
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
  <div
    class="bg-black absolute z-[10000] left-0 right-0 top-[110%] px-8 py-6 text-white rounded-md lg:left-[50%] overflow-scroll max-h-screen"
  >
    <div>
      <div class="flex justify-between mb-8">
        <p class="text-sm-bold">{{ $t('notifications.notifications') }}</p>
        <p class="underline cursor-pointer" @click="markAsRead()">
          {{ $t('notifications.mark_all') }}
        </p>
      </div>

      <div v-for="(notification, index) in notifications" :key="index">
        <comment-notification
          v-if="notification.type == 'comment'"
          :notification="notification"
          :user="user"
          @click="openNotification(notification.quote_id, notification.movie_id, notification.id)"
        ></comment-notification>
        <reaction-notification
          v-else
          :notification="notification"
          :user="user"
          @click="openNotification(notification.quote_id, notification.movie_id, notification.id)"
        ></reaction-notification>
      </div>
    </div>
  </div>
</template>
