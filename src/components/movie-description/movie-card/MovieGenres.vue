<script setup>
const props = defineProps({ genres: { type: Array, required: true } })
</script>

<template>
  <div class="flex mt-4 min-w-min mb-3">
    <div
      class="p-2 px-4 bg-dark-gray rounded-md lg:text-sm mr-2"
      v-for="genre in genres"
      :key="genre.id"
    >
      {{ genre.genre }}
    </div>
  </div>
</template>
