<script setup>
import IconExit from '@/components/icons/IconExit.vue'
import { useRouter } from 'vue-router'

const route = useRouter()
</script>

<template>
  <div class="flex justify-center border-b-2 border-border w-full py-6 relative mb-10">
    <p class="text-sm-m">{{ $t('add_movie.header') }}</p>
    <icon-exit
      class="absolute right-10 top-[50%] translate-y-[-50%]"
      @click="route.push({ name: 'movie-list' })"
    ></icon-exit>
  </div>
</template>
