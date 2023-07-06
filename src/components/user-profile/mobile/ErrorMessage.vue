<script setup>
import IconError from '@/components/icons/IconError.vue'
import IconRemove from '@/components/icons/IconRemove.vue'

const props = defineProps({ error: { type: String, required: true } })
const emit = defineEmits(['closed'])
</script>

<template>
  <div class="fixed top-20 left-0 right-0 bottom-0 bg-black/70"></div>

  <div
    class="bg-[#e2afb5] min-w-max flex justify-around items-center p-2 rounded-md absolute top-[10%] left-[50%] translate-x-[-50%]"
  >
    <icon-error></icon-error>
    <p class="text-base-red text-xs ml-2 mr-2">{{ error }}</p>
    <icon-remove @click="$emit('closed')"></icon-remove>
  </div>
</template>
