<script setup>
import IconCheck from '@/components/icons/IconCheck.vue'
import IconRemove from '@/components/icons/IconRemove.vue'

const emit = defineEmits(['closed'])
</script>

<template>
  <div class="fixed top-0 left-0 right-0 bottom-0 bg-black/50"></div>

  <div
    class="bg-[#BADBCC] min-w-max flex justify-around items-center p-2 rounded-md absolute top-[10%] left-[50%] translate-x-[-50%]"
  >
    <icon-check></icon-check>
    <p class="text-green text-xs ml-2 mr-2">Changes updated succsessfully</p>
    <icon-remove @click="$emit('closed')"></icon-remove>
  </div>
</template>
