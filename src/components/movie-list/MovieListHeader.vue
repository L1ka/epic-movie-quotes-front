<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
import { ref } from 'vue'

const props = defineProps({ totalMovies: { type: Number, required: true } })
const show = ref(false)
</script>

<template>
  <div
    class="text-white flex items-center justify-between px-8 md:px-12 w-[100%] lg:w-[75%] xl:w-[80%] mt-12"
  >
    <p class="lg:text-sm-bold flex flex-col xl:flex-row">
      {{ $t('my_movies.title') }}
      <span class="xl:ml-4">({{ $t('my_movies.sum') }} {{ totalMovies }})</span>
    </p>

    <div class="flex items-center">
      <div class="items-center mr-8 fixed top-7 right-16 z-40 md:static flex">
        <icon-search class="mr-2 md:mr-8" @click="show = !show"></icon-search>
        <input
          type="search"
          :placeholder="$t('my_movies.search')"
          class="bg-transparent md:w-28 md:focus:w-48 w-16 md:block indent-2 focus:shadow-none focus:border-0 focus:border-b-2 focus:outline-none"
          :class="show ? 'block' : 'hidden'"
          @keydown.enter="$emit('handleSearch', $event.target.value)"
        />
      </div>

      <router-link
        :to="{ name: 'add-movie' }"
        class="bg-base-red py-2 px-2 lg:px-4 lg:text-sm-light flex items-center rounded-md"
      >
        <icon-plus class="mr-2"></icon-plus>{{ $t('my_movies.add_movie') }}
      </router-link>
    </div>
  </div>
</template>
