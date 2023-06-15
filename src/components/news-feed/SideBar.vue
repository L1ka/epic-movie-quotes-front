<script setup>
import IconHouse from '@/components/icons/IconHouse.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import SetLocale from '@/components/ui/SetLocale.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div
    class="px-12 py-6 md:px-7 absolute top-0 left-0 right-[10%] lg:top-[6%] lg:right-[80%] lg:bg-transparent text-white bg-black"
  >
    <router-link :to="{ name: 'profile' }" class="flex items-center mb-10 pt-8">
      <img
        src="@/assets/images/testimage.png"
        alt=""
        class="rounded-full h-12 w-12 mr-4 xl:w-14 xl:h-14"
        :class="route.path === '/profile' ? 'border-2  border-base-red' : ''"
      />
      <div class="flex flex-col lg:text-xs xl:text-sm">
        <p class="text-white text-sm lg:text-sm capitalize">Maia Nakashidze</p>
        <p class="text-xs text-gray">Edit your profile</p>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'news-feed' }"
      class="flex items-center mb-12 ml-2 lg:text-xs xl:text-sm"
    >
      <icon-house
        class="mr-10 lg:mr-6"
        :class="route.path === '/news-feed' ? 'fill-red' : 'fill-white'"
      ></icon-house>
      <p>News feed</p>
    </router-link>

    <router-link
      :to="{ name: 'movie-list' }"
      class="flex items-center ml-2 lg:text-xs xl:text-sm mb-12"
    >
      <icon-camera
        class="mr-10 lg:mr-6"
        :class="route.path === '/movie-list' ? 'fill-red' : 'fill-white'"
      ></icon-camera>
      <p>List of movies</p>
    </router-link>

    <set-locale class="lg:hidden mb-14 ml-2"></set-locale>

    <button
      class="text-white py-2 px-4 rounded-md border border-white lg:hidden ml-2"
      @click="logout"
    >
      Log out
    </button>
  </div>
</template>
