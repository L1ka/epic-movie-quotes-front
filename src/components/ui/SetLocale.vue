<script setup>
import IconDownArrow from '@/components/icons/IconDownArrow.vue'
import { ref } from 'vue'
import i18n from '@/plugins/index.js'
import { setLocale } from '@vee-validate/i18n'

const locale = ref('Eng')
const isVisible = ref(false)

const toggle = () => {
  isVisible.value = !isVisible.value
}

const setActive = (e) => {
  isVisible.value = false
  console.log(i18n.global.locale)
  locale.value = e.target.value
  if (locale.value == 'Geo' || locale.value == 'ქართული') {
    setLocale('ka')
    i18n.global.locale.value = 'ka'
  } else {
    setLocale('en')
    i18n.global.locale.value = 'en'
  }
}
</script>

<template>
  <div class="flex flex-col relative text-white cursor-pointer">
    <div class="flex items-center" @click="toggle">
      <p class="mr-2">{{ locale }}</p>
      <icon-down-arrow></icon-down-arrow>
    </div>
    <div v-show="isVisible" class="flex flex-col absolute top-7 right-0.5 text-end">
      <button value="Eng" class="text-end" @click="setActive">Eng</button>
      <button value="Geo" class="text-end" @click="setActive">Geo</button>
    </div>
  </div>
</template>
