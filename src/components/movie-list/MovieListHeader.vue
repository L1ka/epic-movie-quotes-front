<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import IconPlus from '@/components/icons/IconPlus.vue'
</script>

<template>
  <div
    class="text-white flex items-center justify-between px-8 md:px-12 w-[100%] lg:w-[75%] xl:w-[80%] mt-12"
  >
    <p class="lg:text-sm-bold flex flex-col xl:flex-row">
      My list of movies <span class="xl:ml-4">(Total 25)</span>
    </p>

    <div class="flex items-center">
      <div class="items-center mr-8 hidden lg:flex">
        <icon-search class="mr-8"></icon-search>
        <input type="text" placeholder="Search" class="bg-transparent w-16" />
      </div>

      <button class="bg-base-red py-2 px-2 lg:px-4 lg:text-sm-light flex items-center rounded-md">
        <icon-plus class="mr-2"></icon-plus>Add movie
      </button>
    </div>
  </div>
</template>
