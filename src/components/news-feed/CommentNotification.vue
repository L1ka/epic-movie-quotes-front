<script setup>
import IconComment from '@/components/icons/IconComment.vue'
</script>

<template>
  <div
    class="flex border border-solid border-b-2 border-border py-4 px-4 text-white w-full mb-2 relative"
  >
    <div class="mr-4">
      <img
        src="@/assets/images/testimage.png"
        alt=""
        class="border border-solid border-b-2 border-light-green rounded-full h-12 w-12 md:w-16 md:h-16 mb-2"
      />
      <p class="text-light-green lg:absolute lg:right-4 lg:top-14">New</p>
    </div>
    <div class="flex flex-col">
      <p class="text-sm-light">Nino Tabagari</p>
      <div class="flex">
        <icon-comment class="mr-3"></icon-comment>
        <p>Commented to your quote..</p>
      </div>
      <p class="lg:absolute lg:right-4 lg:top-4">5 min ago</p>
    </div>
  </div>
</template>
