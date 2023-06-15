import '@/assets/main.css'
import i18n from '@/plugins/index.js'
import '@/config/vee-validate/rules.js'
import '@/config/vee-validate/messages.js'
import axiosInstance from '@/config/axios/index.js'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.config.globalProperties.$axios = axiosInstance

app.mount('#app')
