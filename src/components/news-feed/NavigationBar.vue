<script setup>
import IconNavigation from '@/components/icons/IconNavigation.vue'
import IconBell from '@/components/icons/IconBell.vue'
import NotificationBar from '@/components/news-feed/notification/NotificationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
import SetLocale from '@/components/ui/SetLocale.vue'
import { onMounted, ref } from 'vue'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/getUser.js'
import instantiatePusher from '@/helpers/instantiatePusher.js'
import { useRouter } from 'vue-router'

const pusherActive = ref(false)
const router = useRouter()
const modal = ref(null)
const open = ref(false)
const sideBarIsOpen = ref(false)
const { getUser } = useUserStore()
const { user } = storeToRefs(useUserStore())
const notificationsArr = ref([])
const length = ref(null)
const props = defineProps({
  userId: { type: Number }
})

const getNotifications = async () => [
  await axiosInstance.get(`/api/get-notifications`).then((res) => {
    notificationsArr.value = res.data.data
    length.value = res.data.data.filter((el) => {
      return el.seen === 0
    }).length
  })
]

const logout = async () => {
  await axiosInstance.post('api/logout').then(() => {
    router.push({ name: 'landing' })
  })
}

onClickOutside(modal, () => {
  sideBarIsOpen.value = false
})

const NotificationIsOpen = () => {
  length.value = notificationsArr.value.filter((el) => {
    return el.seen === 0
  }).length
}

const updateNotifications = () => {
  length.value = 0
}

onMounted(() => {
  getUser()
  getNotifications()
  pusherActive.value = instantiatePusher()

  window.Echo.private(`notifications.${props.userId}`).listen('GetNotifications', (data) => {
    console.log(data.notification)
    notificationsArr.value.unshift(data.notification.notification)

    length.value++
  })
})
</script>

<template>
  <nav class="backdrop-blur-xl bg-light-gray w-full px-8 py-6 flex justify-between fixed z-30">
    <icon-navigation @click="sideBarIsOpen = true" class="lg:hidden"></icon-navigation>
    <p class="text-light-yallow uppercase hidden lg:block">Movie quotes</p>
    <side-bar ref="modal" v-if="sideBarIsOpen" class="lg:hidden"></side-bar>

    <div class="flex lg:w-[25%] xl:w-[20%]">
      <div class="flex items-center justify-between lg:w-full relative">
        <div class="relative" @click="open = !open">
          <p
            class="bg-base-red text-white rounded-full text-sm w-[25px] h-[25px] flex justify-center items-center absolute top-[-20%] right-0"
          >
            <span>{{ length }}</span>
          </p>
          <icon-bell class="h-8 w-10"></icon-bell>
          <div
            v-if="open"
            id="polygon"
            class="bg-black w-12 h-12 absolute right-[-10%] top-[125%]"
          ></div>
        </div>
        <set-locale class="hidden lg:block"></set-locale>
        <button
          class="text-white py-2 px-4 rounded-md border border-white hidden lg:block"
          @click="logout"
        >
          {{ $t('logout') }}
        </button>
      </div>
    </div>
    <notification-bar
      v-if="open"
      :notifications="notificationsArr"
      @update="updateNotifications"
      @open-notification="NotificationIsOpen"
    ></notification-bar>
  </nav>
</template>
