<script setup>
import AddImage from '@/components/quotes/edit/AddImage.vue'
import TheInput from '@/components/quotes/edit/TheInput.vue'
import axiosInstance from '@/config/axios/index.js'
import { Form } from 'vee-validate'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const quotes = ref(null)
const props = defineProps({
  id: { type: Number, required: true },
  quoteId: { type: Number, required: true }
})

const handleSubmit = async (data) => {
  const formData = new FormData()
  formData.append('image', data.image)

  await axiosInstance
    .post(
      'api/quote/update',
      { ...data, ...formData, id: quotes.value.id },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  router.push({ name: 'movie-description', params: { id: quotes.value.movie_id } })
}

const getQuotes = async () => {
  console.log(props.id)
  await axiosInstance
    .post('/api/get-quote', { id: props.quoteId })
    .then((res) => {
      quotes.value = res.data.quote
      quotes.value.quote = JSON.parse(quotes.value.quote)
    })
    .catch((err) => console.log(err))
}

onMounted(() => {
  getQuotes()
})
</script>

<template>
  <Form @submit="handleSubmit" v-if="quotes">
    <the-input name="quote.en" language="Eng" :value="quotes.quote.en"></the-input>

    <the-input name="quote.ka" language="ქარ" :value="quotes.quote.ka"></the-input>

    <add-image :image="quotes.image"> </add-image>

    <button class="bg-base-red w-full py-4 rounded-md mb-10">Save changes</button>
  </Form>
</template>
