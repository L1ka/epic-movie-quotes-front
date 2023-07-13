<script setup>
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
const props = defineProps({ modelValue: { type: [String, Boolean], required: true } })
const emit = defineEmits(['handleSearch', 'update:modelValue', 'close'])
</script>

<template>
  <div
    class="top-0 pt-28 pl-10 left-0 right-0 bottom-0 fixed backdrop-blur-sm bg-modal-black z-40 lg:hidden text-gray"
  >
    <p class="mb-2">Enter @ to search movies</p>
    <p>Enter # to search quotes</p>
  </div>

  <div class="border-b-2 border-gray w-full flex items-center fixed top-0 z-50 bg-modal-black py-4">
    <icon-left-arrow class="ml-4 mr-4" @click="$emit('close')"></icon-left-arrow>
    <input
      placeholder="Search"
      name="search"
      type="search"
      class="bg-transparent focus:shadow-none focus:border-none focus:outline-none w-full text-white text-sm py-2 indent-3"
      @keydown.enter="$emit('handleSearch', $event.target.value)"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
  </div>
</template>
