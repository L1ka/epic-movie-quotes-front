import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import i18n from '@/plugins/index.js'
import { setLocale } from '@vee-validate/i18n'

export const useLocaleStore = defineStore('setLocale', () => {
  const selectedLocale = ref(localStorage.getItem('locale') || 'en')
  const locale = ref(localStorage.getItem('locale') == 'ka' ? 'Geo' : 'Eng')

  onMounted(() => {
    setLocale(localStorage.getItem('locale') || selectedLocale.value)
    i18n.global.locale.value = localStorage.getItem('locale') || selectedLocale.value
  })

  const changeLocale = (e) => {
    selectedLocale.value = e.target.value
    localStorage.setItem('locale', selectedLocale.value)
    locale.value = selectedLocale.value == 'ka' ? 'Geo' : 'Eng'

    setLocale(localStorage.getItem('locale') || selectedLocale.value)
    i18n.global.locale.value = localStorage.getItem('locale') || selectedLocale.value
  }

  return {
    selectedLocale,
    changeLocale,
    locale
  }
})
