<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'

const props = defineProps({ totalMovies: { type: Number, required: true } })
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
      <div class="items-center mr-8 hidden lg:flex">
        <icon-search class="mr-8"></icon-search>
        <input
          type="search"
          :placeholder="$t('my_movies.search')"
          class="bg-transparent w-28 focus:w-48"
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
