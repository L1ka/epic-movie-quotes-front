<script setup>
import IconNavigation from '@/components/icons/IconNavigation.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconBell from '@/components/icons/IconBell.vue'
import NotificationBar from '@/components/news-feed/NotificationBar.vue'
import SideBar from '@/components/news-feed/SideBar.vue'
import SetLocale from '@/components/ui/SetLocale.vue'
import { ref } from 'vue'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'

const modal = ref(null)
const open = ref(false)
const sideBarIsOpen = ref(false)

const logout = async () => {
  await axiosInstance
    .post('api/logout')
    .then((res) => console.log(res))
    .catch((error) => console.log(error))
}

onClickOutside(modal, () => {
  sideBarIsOpen.value = false
})
</script>

<template>
  <nav class="backdrop-blur-xl bg-light-gray w-full px-8 py-6 flex justify-between">
    <icon-navigation @click="sideBarIsOpen = true" class="lg:hidden"></icon-navigation>
    <p class="text-light-yallow uppercase hidden lg:block">Movie quotes</p>
    <side-bar ref="modal" v-if="sideBarIsOpen" class="lg:hidden"></side-bar>

    <div class="flex lg:w-[25%] xl:w-[20%]">
      <icon-search class="mr-6 lg:hidden"></icon-search>
      <!-- <search-bar v-if="showInput"></search-bar> -->
      <div class="flex items-center justify-between lg:w-full relative">
        <div class="relative" @click="open = !open">
          <p
            class="bg-base-red text-white rounded-full text-sm w-[25px] h-[25px] flex justify-center items-center absolute top-[-20%] right-0"
          >
            <span>3</span>
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
          Log out
        </button>
      </div>
    </div>
    <notification-bar v-if="open"></notification-bar>
  </nav>
</template>
