<script setup></script>

<template>
  <div class="lg:hidden fixed z-30 top-0 left-0 bottom-0 right-0 bg-black"></div>
  <div class="lg:hidden absolute bottom-64 z-40 bg-light-black left-0 py-16 rounded-lg w-full">
    <p class="pb-10 px-8 border-b-2 border-border text-xs sm:text-sm">
      Are you sure to make changes ?
    </p>
    <div class="flex justify-between w-full absolute lg:hidden px-7 mt-2">
      <button>Cancel</button>
      <button class="bg-base-red px-5 py-2 rounded">Confirm</button>
    </div>
  </div>
</template>
