<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
</script>

<template>
  <div class="flex items-center">
    <icon-search class="mr-2"></icon-search>

    <input
      name="search"
      type="search"
      placeholder="Search by"
      class="bg-transparent focus:shadow-none text-white text-sm py-1 indent-3 w-[95%]"
    />
  </div>
</template>
