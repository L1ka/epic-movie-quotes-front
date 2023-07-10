<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import IconNotFound from '@/components/icons/IconNotFound.vue'
import IconShadow from '@/components/icons/IconShadow.vue'
</script>

<template>
  <div class="text-white min-h-screen flex flex-col items-center justify-center px-3">
    <icon-not-found class="mb-10 h-24 md:h-auto"></icon-not-found>
    <icon-shadow class="w-20 md:w-auto"> </icon-shadow>
    <p class="text-sm-m md:text-lg my-10">Whoops!</p>
    <p class="text-sm text-center md:text-sm-bold mb-10">
      We can't see the page you are looking for
    </p>
    <the-button color="bg-base-red" to="landing" title="Return home"></the-button>
  </div>
</template>
