<script setup>
import { Form, Field } from 'vee-validate'
import axiosInstance from '@/config/axios/index.js'
import { onMounted, ref } from 'vue'
import { fetchUser } from '@/services/api'

const backUrl = import.meta.env.VITE_API_BASE_URL
const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
const comment = ref('')
const emit = defineEmits(['update'])

const props = defineProps({
  quoteId: { type: Number, required: true },
  movieId: { type: Number, required: true }
})

const handleSubmit = async (event, id) => {
  comment.value = ''
  await axiosInstance.post('/api/comment', {
    body: event.target.value,
    user_id: user.value.id,
    quote_id: id,
    movie_id: props.movieId
  })

  emit('update')
}

onMounted(() => {
  getUser()
})
</script>

<template>
  <Form class="flex items-center mt-4 mb-10">
    <div
      :style="{ 'background-image': 'url(' + backUrl + user?.image + ')' }"
      class="w-14 h-14 mr-4 bg-cover bg-no-repeat bg-center rounded-full mb-2"
    ></div>

    <Field
      as="textarea"
      v-model="comment"
      name="comment"
      :placeholder="$t('quote.add_comment')"
      class="bg-light-black rounded-lg indent-7 pt-4 w-full"
      @keydown.enter.prevent="handleSubmit($event, quoteId)"
    ></Field>
  </Form>
</template>
