<script setup>
const emit = defineEmits(['closeDialog'])
</script>

<template>
  <div class="fixed z-40 top-20 left-0 bottom-0 right-0 bg-black flex justify-center"></div>
  <div class="absolute top-[20%] left-[50%] translate-x-[-50%] w-full px-8 z-40 left-o right-0">
    <div class="bg-light-black py-6 rounded-lg bg-gradient-to-br from-black to-light-black">
      <p class="pb-10 px-8 border-b-2 border-border text-xs sm:text-sm">
        {{ $t('profile.make_changes?') }}
      </p>
      <div class="flex justify-between px-7 mt-4">
        <p @click="$emit('closeDialog')">{{ $t('profile.cancel') }}</p>
        <button class="bg-base-red px-5 py-2 rounded">{{ $t('profile.confirm') }}</button>
      </div>
    </div>
  </div>
</template>
