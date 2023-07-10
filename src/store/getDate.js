import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDateStore = defineStore('getDate', () => {
  const getDate = (time) => {
    const likeDate = new Date(time)
    const currentDate = new Date()
    const date = ref(null)

    const timeDiffMinutes = Math.round((currentDate - likeDate) / (1000 * 60))

    if (timeDiffMinutes < 60) {
      date.value = `${timeDiffMinutes} min ago`
    } else if (timeDiffMinutes < 1440) {
      const hours = Math.floor(timeDiffMinutes / 60)
      date.value = `${hours} hours ago`
    } else {
      const days = Math.floor(timeDiffMinutes / 1440)

      date.value = `${days} days ago`
    }

    return date.value
  }

  return { getDate }
})
