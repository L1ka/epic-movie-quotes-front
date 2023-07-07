<script setup>
import UserImage from '@/components/user-profile/UserImage.vue'
import UpdateUserForm from '@/components/user-profile/mobile/UpdateUserForm.vue'
import { RouterView } from 'vue-router'

const emit = defineEmits(['modal'])
const showInput = () => {
  emit('modal')
}
</script>

<template>
  <div class="lg:hidden max-h-full">
    <router-view></router-view>

    <div class="bg-light-black flex flex-col items-center mt-6 w-full h-screen">
      <div class="mb-24 mt-6 flex flex-col w-full px-8">
        <user-image></user-image>

        <update-user-form @modal="showInput"></update-user-form>
      </div>
    </div>
  </div>
</template>
