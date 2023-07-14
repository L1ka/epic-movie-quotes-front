<script setup>
import TheButton from '@/components/ui/TheButton.vue'
import SetLocale from '@/components/ui/SetLocale.vue'
import { RouterView, useRouter } from 'vue-router'
import ScrollAnimation from '@/components/landing/ScrollAnimation.vue'
import { computed } from 'vue'

const router = useRouter()

const modal = computed(() => {
  return router.currentRoute.value.name !== 'landing'
    ? ' fixed top-0 left-0  right-0  bottom-0 bg-[#191525]'
    : ''
})
</script>

<template>
  <div :class="modal">
    <div>
      <div class="h-screen px-2 md:px-12 lg:px-[70px] pt-[30px]">
        <router-view></router-view>

        <nav class="flex justify-between items-center flex-col md:flex-row">
          <p class="text-light-yallow uppercase text-sm mb-4">Movie quotes</p>

          <div class="flex justify-around items-center sm:w-[45%] xl:w-[25%] lg:w-[35%] w-[100%]">
            <set-locale></set-locale>

            <the-button
              :title="$t('landing.sign_up')"
              color="bg-base-red"
              to="registration"
            ></the-button>

            <the-button :title="$t('landing.log_in')" to="login"></the-button>
          </div>
        </nav>

        <div
          class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col w-[90%] lg:w-[80%] xl:w-[60%] 2xl:w-[45%]"
        >
          <h1 class="text-light-yallow text-m lg:text-2lg text-center">
            {{ $t('landing.title') }}
          </h1>
          <the-button
            :title="$t('registration.get_started')"
            color="bg-base-red  self-center mt-[24px]"
            to="login"
            class="px-8"
          ></the-button>
        </div>
      </div>
    </div>
    <scroll-animation></scroll-animation>
  </div>
</template>
