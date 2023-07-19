import axiosInstance from '@/config/axios/index.js'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

export async function fetchMovies() {
  const response = ref(null)
  await axiosInstance.get('/api/movies').then((res) => (response.value = res.data.data))
  return response.value
}

export async function fetchMovie(id) {
  const response = ref(null)
  await axiosInstance
    .get(`/api/movies/${id}`)
    .then((res) => (response.value = { ...res.data.data }))
  return response.value
}

export async function fetchQuote(movieId) {
  const response = ref(null)
  await axiosInstance.get(`/api/quotes/${movieId}`).then((res) => (response.value = res.data.data))
  return response.value
}

export async function fetchOneQuote(quoteId) {
  const response = ref(null)
  await axiosInstance.get(`/api/quote/${quoteId}`).then((res) => (response.value = res.data.data))
  return response.value
}

export async function fetchNotifications() {
  const response = ref(null)
  await axiosInstance.get(`/api/notifications`).then((res) => (response.value = res.data.data))
  return response.value
}

export async function fetchGenres() {
  const options = ref({})

  const { selectedLocale } = storeToRefs(useLocaleStore())

  await axiosInstance.get('api/genres').then((res) => {
    res.data.data.forEach((element) => {
      options.value = {
        ...options.value,
        [element.id]: element.genre[selectedLocale.value]
      }
    })
  })

  return options.value
}

export async function fetchUser() {
  const response = ref(null)
  await axiosInstance.get(`/api/user`).then((res) => (response.value = res.data.data))
  return response.value
}
