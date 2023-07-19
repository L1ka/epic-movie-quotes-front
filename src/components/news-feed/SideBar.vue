<script setup>
import IconHouse from '@/components/icons/IconHouse.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import UserCard from '@/components/ui/UserCard.vue'
import SetLocale from '@/components/ui/SetLocale.vue'
import axiosInstance from '@/config/axios/index.js'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, ref } from 'vue'
import { fetchUser } from '@/services/api'

const route = useRoute()
const router = useRouter()
const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}

const logout = async () => {
  await axiosInstance.post('api/logout').then(() => {
    router.push({ name: 'landing' })
  })
}

const movieListActive = computed(() => {
  return route.path.startsWith('/movie-description') || route.path.startsWith('/movie-list')
    ? 'fill-red'
    : 'fill-white'
})
const newsFeedActive = computed(() => {
  return route.path.startsWith('/news-feed') ? 'fill-red' : 'fill-white'
})

const hasBorder = computed(() => {
  return route.path === '/profile' ? 'border-2  border-base-red' : ''
})

onMounted(() => getUser())
</script>

<template>
  <div
    class="px-12 py-6 md:px-7 fixed z-[11000] md:z-10 top-0 left-0 right-[10%] lg:top-24 lg:right-[80%] lg:bg-transparent text-white bg-modal-black"
  >
    <router-link :to="{ name: 'profile' }" class="flex items-center mb-10 pt-8">
      <user-card class="mb-0 mt-0" :hasBorder="hasBorder" type="sidebar"> </user-card>

      <div class="flex flex-col lg:text-xs xl:text-sm">
        <p class="text-white text-sm lg:text-sm capitalize">{{ user?.first_name }}</p>
        <p class="text-xs text-gray">{{ $t('side_bar.edit_profile') }}</p>
      </div>
    </router-link>

    <router-link
      :to="{ name: 'news-feed' }"
      class="flex items-center mb-12 ml-2 lg:text-xs xl:text-sm"
    >
      <icon-house class="mr-10 lg:mr-6 w-9 h-9" :class="newsFeedActive"></icon-house>
      <p>{{ $t('side_bar.news_feed') }}</p>
    </router-link>

    <router-link
      :to="{ name: 'movie-list' }"
      class="flex items-center ml-2 lg:text-xs xl:text-sm mb-12"
    >
      <icon-camera class="mr-10 lg:mr-6" :class="movieListActive"></icon-camera>
      <p>{{ $t('side_bar.my_movies') }}</p>
    </router-link>

    <set-locale class="lg:hidden mb-14 ml-2"></set-locale>

    <button
      class="text-white py-2 px-4 rounded-md border border-white lg:hidden ml-2"
      @click="logout"
    >
      {{ $t('logout') }}
    </button>
  </div>
</template>
