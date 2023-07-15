<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useAnimationStore } from '@/store/scrollAnimation.js'
import { storeToRefs } from 'pinia'

const { handleScroll } = useAnimationStore()
const { firstImageRef, secondImageRef, thirdImageRef } = storeToRefs(useAnimationStore())

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="container">
    <div class="h-screen w-screen">
      <div>
        <img
          src="@/assets/images/image1.png"
          ref="firstImageRef"
          class="first h-full w-full bg-cover bg-no-repeat bg-center"
        />

        <div class="absolute text-white top-[135%] md:w-[50%] w-[85%] md:ml-36 ml-12 flex z-10">
          <div class="w-12 lg:w-28 h-0.5 lg:h-1 bg-white mt-4 lg:mt-8 mr-2"></div>
          <div>
            <p class="md:text-m-bold lg:text-lg text-sm-m">
              “You have to leave somethig behind to go forward”
            </p>
            <p class="md:text-sm-bold lg:text-m-bold text-sm-dark mt-4">Interstellar, 2014</p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="@/assets/images/image2.png"
          ref="secondImageRef"
          class="second h-full w-full bg-cover bg-no-repeat bg-left"
        />

        <div class="absolute text-white top-[235%] md:w-[50%] w-[85%] md:ml-36 ml-12 z-10 flex">
          <div class="w-12 lg:w-28 h-0.5 lg:h-1 bg-white mt-4 lg:mt-8 mr-2"></div>
          <div>
            <p class="md:text-m-bold lg:text-lg text-sm-m">
              “I see in your eyes the same fear that would take the heart of me....”
            </p>
            <p class="md:text-sm-bold lg:text-m-bold text-sm-dark mt-4">
              The Royal Tenenbaums,2001
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          src="@/assets/images/image3.png"
          ref="thirdImageRef"
          class="third h-full w-full bg-cover bg-no-repeat bg-center"
        />

        <div class="absolute text-white top-[335%] z-10 md:w-[50%] w-[85%] md:ml-36 ml-12 flex">
          <div class="w-12 lg:w-28 h-0.5 lg:h-1 bg-white mt-4 lg:mt-8 mr-2"></div>
          <div>
            <p class="md:text-m-bold lg:text-lg text-sm-m">
              “I think we’re just gonna have to be secretly in love with earch other and leave it
              that”
            </p>
            <p class="md:text-sm-bold lg:text-m-bold text-sm-dark mt-4">
              The Royal Tenenbaums,2001
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.first {
  position: absolute;
  z-index: 1;
  top: 100%;
}

.second {
  position: absolute;
  z-index: 2;
  top: 200%;
}

.third {
  position: absolute;
  z-index: 3;
  top: 300%;
}

.fixed {
  position: fixed;
  top: 0%;
}
</style>
