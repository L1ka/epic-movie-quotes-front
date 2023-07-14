import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import axiosInstance from '@/config/axios/index.js'

export const useGenresStore = defineStore('getGenres', () => {
  const options = ref({})

  const getGenres = async () => {
    await axiosInstance.get('api/get-genres').then((res) => {
      console.log(res)
      res.data.data.forEach((element) => {
        options.value = { ...options.value, [element.id]: element.genre }
      })
    })
  }

  onMounted(() => {
    getGenres()
  })

  return { options }
})
