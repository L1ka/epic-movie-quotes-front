<script setup>
const backUrl = import.meta.env.VITE_API_BASE_URL
const props = defineProps({ quote: { type: Object, required: true } })
</script>

<template>
  <div class="relative mb-4 px-8">
    <p class="w-full border-2 border-border indent-4 py-6 rounded-lg">{{ quote.quote.en }}</p>
    <p class="absolute top-4 right-12">Eng</p>
  </div>

  <div class="relative mb-4 px-8">
    <p class="w-full border-2 border-border indent-4 py-6 rounded-lg">{{ quote.quote.ka }}</p>

    <p class="absolute top-4 right-12">ქარ</p>
  </div>

  <div class="px-8 my-8">
    <div
      :style="{ 'background-image': 'url(' + backUrl + quote.image + ')' }"
      class="w-full h-[300px] bg-cover bg-no-repeat bg-center rounded-md mb-4"
    ></div>
  </div>
</template>
