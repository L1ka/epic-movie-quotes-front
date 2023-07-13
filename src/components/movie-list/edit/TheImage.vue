<script setup>
const backUrl = import.meta.env.VITE_API_BASE_URL
const props = defineProps({
  test: { type: [String, File, null], required: true },
  image: { type: [String, File], required: true }
})
</script>

<template>
  <div
    v-if="!test"
    :style="{ 'background-image': 'url( ' + backUrl + image + ')' }"
    class="w-[45%] h-28 bg-cover bg-center backdrop-blur-sm outline-1 outline-light-yallow outline-dashed decoration-dashed"
  ></div>
  <div
    v-if="test"
    :style="{ 'background-image': 'url( ' + test + ')' }"
    class="w-[45%] h-28 bg-cover bg-center backdrop-blur-sm outline-1 outline-light-yallow outline-dashed decoration-dashed"
  ></div>
</template>
