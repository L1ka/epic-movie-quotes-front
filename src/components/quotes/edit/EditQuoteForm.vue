<script setup>
import AddImage from '@/components/quotes/edit/AddImage.vue'
import TheInput from '@/components/quotes/edit/TheInput.vue'
import axiosInstance from '@/config/axios/index.js'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({ quote: { type: Object, required: true } })

const handleSubmit = async (data) => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        formData.append(`${key}[${subKey}]`, subValue)
      })
    } else {
      formData.append(key, value)
    }
  })

  formData.append('image', data.image)

  formData.append('_method', 'patch')

  await axiosInstance
    .post(`api/quotes/${props.quote.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then((res) => console.log(res))

  router.replace({ name: 'movie-description', params: { id: props.quote.movie_id } })
}
</script>

<template>
  <Form @submit="handleSubmit" v-if="quote">
    <the-input
      name="quote.en"
      language="Eng"
      :value="quote.quote?.en"
      rules="required|min:3|max:30|alpha_latin"
    ></the-input>

    <the-input
      name="quote.ka"
      language="ქარ"
      :value="quote.quote?.ka"
      rules="required|min:3|max:30|alpha_geo"
    ></the-input>

    <add-image :image="quote.image"> </add-image>

    <button class="bg-base-red w-full py-4 rounded-md mb-10">
      {{ $t('edit_quote.save') }}
    </button>
  </Form>
</template>
