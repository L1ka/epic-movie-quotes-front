import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import axiosInstance from '@/config/axios/index.js'

export const useUserStore = defineStore('getUser', () => {
  let user = ref('')
  const getUser = async () => {
    try {
      await axiosInstance.get(`/api/user`).then((response) => (user.value = response.data.data))
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => {
    getUser()
  })

  return { getUser, user }
})
