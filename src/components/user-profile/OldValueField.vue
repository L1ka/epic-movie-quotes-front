<script setup>
import { fetchUser } from '@/services/api'
import { onMounted, ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  name: { type: String, required: true },
  id: { type: String, required: true }
})

const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
onMounted(() => getUser())
</script>

<template>
  <div class="flex flex-col text-white mb-6 w-full" v-if="name">
    <p class="mb-2">{{ title }}</p>
    <div class="flex items-center justify-between w-full border-b-2 border-border lg:border-none">
      <p class="lg:bg-gray px-3 py-3 lg:text-dark-gray w-full rounded-md">
        {{ name == 'password' ? '*******' : user?.[name] }}
      </p>
      <p @click="$emit('show', id)" class="p-4 absolute lg:right-20 right-8">
        {{ $t('profile.edit') }}
      </p>
    </div>
  </div>
</template>
