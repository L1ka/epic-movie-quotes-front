<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import IconGandolf from '@/components/icons/IconGandolf.vue'
import IconBackground from '@/components/icons/IconBackground.vue'
</script>

<template>
  <div class="text-white min-h-screen flex flex-col items-center justify-center px-3">
    <div class="relative mb-10">
      <icon-background class="w-36 md:w-auto"></icon-background>
      <icon-gandolf
        class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-52 md:w-auto"
      ></icon-gandolf>
    </div>

    <p class="text-sm-m md:text-lg my-10">You shall not pass!</p>
    <p class="text-sm text-center md:text-sm-bold mb-10">
      Sorry, but you don’t have permission to access this page
    </p>
    <the-button color="bg-base-red" to="landing" title="Return home"></the-button>
  </div>
</template>
