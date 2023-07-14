<script setup>
import IconSearch from '@/components/icons/IconSearch.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  modelValue: { type: [String, Boolean], required: true }
})

const isFocused = ref(false)
const i18n = useI18n()
const emit = defineEmits(['focused', 'onBlur', 'handleSearch', 'update:modelValue'])

const focused = () => {
  isFocused.value = true
  emit('focused')
}
const onBlur = () => {
  isFocused.value = false
  emit('onBlur')
}

const placeholder = computed(() => {
  return isFocused.value ? i18n.t('quote.placeholder_focused') : i18n.t('quote.placeholder')
})
</script>

<template>
  <div class="flex items-center mr-8 p-2" :class="isFocused ? 'w-[70%]' : ''">
    <icon-search class="mr-2"></icon-search>

    <input
      name="search"
      type="search"
      :placeholder="placeholder"
      class="bg-transparent focus:shadow-none focus:border-0 focus:border-b-2 focus:outline-none focus:placeholder:text-gray w-full text-white text-sm py-2 indent-3"
      @keydown.enter="$emit('handleSearch', $event.target.value)"
      @input="$emit('update:modelValue', $event.target.value)"
      :value="modelValue"
      @focus="focused"
      @blur="onBlur"
    />
  </div>
</template>
