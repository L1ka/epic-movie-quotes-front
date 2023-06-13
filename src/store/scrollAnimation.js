import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAnimationStore = defineStore('animation', () => {
  const scrollPosition = ref(0)
  const prevScrollPosition = ref(0)
  const firstImageRef = ref(null)
  const secondImageRef = ref(null)
  const thirdImageRef = ref(null)

  const handleScroll = () => {
    prevScrollPosition.value = scrollPosition.value
    scrollPosition.value = window.pageYOffset || document.documentElement.scrollTop

    if (scrollPosition.value > prevScrollPosition.value) {
      handleDownScroll()
    } else {
      handleUpScroll()
    }
  }

  const handleDownScroll = () => {
    const secondImageElement = secondImageRef.value
    const firstImageElement = firstImageRef.value

    if (secondImageElement) {
      const { top } = secondImageElement.getBoundingClientRect()

      if (top <= 0) {
        secondImageRef.value.classList.add('fixed')
      }
    }

    if (firstImageElement) {
      const { top } = firstImageElement.getBoundingClientRect()

      if (top <= 0) {
        firstImageRef.value.classList.add('fixed')
      }
    }
  }
  const handleUpScroll = () => {
    const secondImageElement = thirdImageRef.value
    const firstImageElement = secondImageRef.value
    if (secondImageElement) {
      const { top } = secondImageElement.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (top >= windowHeight) {
        secondImageRef.value.classList.remove('fixed')
      }
    }

    if (firstImageElement) {
      const { top } = firstImageElement.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (top >= windowHeight) {
        firstImageRef.value.classList.remove('fixed')
      }
    }
  }

  return {
    firstImageRef,
    secondImageRef,
    thirdImageRef,
    handleScroll
  }
})
