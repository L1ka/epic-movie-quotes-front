<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'

const props = defineProps({
  modelValue: { type: [String, Boolean], required: true }
})
</script>

<template>
  <div class="flex items-center">
    <icon-search class="mr-2"></icon-search>

    <input
      name="search"
      type="search"
      :placeholder="$t('quote.quote_placeholder')"
      class="bg-transparent focus:shadow-none text-white text-sm py-1 indent-3 w-[95%]"
      @keydown.enter="$emit('handleSearch', $event.target.value)"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
    />
  </div>
</template>
