<script setup>
import IconHeart from '@/components/icons/IconHeart.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
import axiosInstance from '@/config/axios/index.js'
import { fetchUser } from '@/services/api'
import { ref, computed, onMounted } from 'vue'

const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
const emit = defineEmits(['update', 'show'])

const props = defineProps({
  quote: { type: Object, required: true }
})

const showAllItems = ref(false)

const show = () => {
  showAllItems.value = !showAllItems.value
  return showAllItems.value
}

const likedFromUser = computed(() => {
  return props.quote.liked_by_user
})

const addLikes = async (id) => {
  await axiosInstance.post('/api/like', {
    user_id: user.value.id,
    quote_id: id,
    movie_id: props.quote.movie.id
  })
  emit('update')
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <div class="border-solid border-b-2 border-border pb-4 flex mb-4">
    <div class="mr-6 flex" @click="$emit('show', show())">
      <p class="text-white mr-3 text-sm lg:text-sm-bold">{{ quote.comments.length }}</p>
      <icon-message class="w-6 lg:w-8"></icon-message>
    </div>
    <div class="flex">
      <p class="text-white mr-3 text-sm lg:text-sm-bold">{{ quote.likes_count }}</p>
      <icon-heart
        class="w-6 lg:w-8 cursor-pointer"
        @click="addLikes(quote.id)"
        :class="likedFromUser ? 'fill-red' : 'fill-white'"
      ></icon-heart>
    </div>
  </div>
</template>
