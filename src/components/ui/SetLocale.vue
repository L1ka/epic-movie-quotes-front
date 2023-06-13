<script setup>
import IconDownArrow from '@/components/icons/IconDownArrow.vue'
import { ref } from 'vue'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const { changeLocale } = useLocaleStore()
const { locale } = storeToRefs(useLocaleStore())
const isVisible = ref(false)

const toggle = () => {
  isVisible.value = !isVisible.value
}

const setActive = (e) => {
  isVisible.value = false
  changeLocale(e)
}
</script>

<template>
  <div class="flex flex-col relative text-white cursor-pointer max-w-min">
    <div class="flex items-center" @click="toggle">
      <p class="mr-2">{{ locale }}</p>
      <icon-down-arrow></icon-down-arrow>
    </div>
    <div v-show="isVisible" class="flex flex-col absolute top-7 right-0.5 text-end">
      <button value="en" class="text-end" @click="setActive">Eng</button>
      <button value="ka" class="text-end" @click="setActive">Geo</button>
    </div>
  </div>
</template>
