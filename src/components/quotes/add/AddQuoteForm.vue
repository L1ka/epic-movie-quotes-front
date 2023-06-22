<script setup>
import AddImage from '@/components/quotes/add/AddImage.vue'
import axiosInstance from '@/config/axios/index.js'
import { Form, Field } from 'vee-validate'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: { type: String }
})

const router = useRouter()

const handleSubmit = async (data) => {
  const formData = new FormData()
  formData.append('image', data.image)

  await axiosInstance
    .post(
      'api/quote/create',
      { ...data, ...formData, id: props.id },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err))

  router.push({ name: 'movie-description', params: { id: props.id } })
}
</script>

<template>
  <Form class="mb-12" @submit="handleSubmit">
    <add-image name="image"> </add-image>

    <div class="relative mb-4">
      <Field
        as="textarea"
        name="quote.en"
        rows="4"
        placeholder="Start create new quote"
        class="bg-transparent rounded-lg indent-3 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
      />
      <p class="absolute top-4 right-3 md:right-8">Eng</p>
    </div>
    <div class="relative mb-4">
      <Field
        as="textarea"
        name="quote.ka"
        rows="4"
        placeholder="ახალი ციტატა"
        class="bg-transparent rounded-lg indent-3 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
      />
      <p class="absolute top-4 right-3 md:right-8">ქარ</p>
    </div>

    <button class="bg-base-red w-full py-2 md:py-4 text-sm-light rounded-lg">Add quote</button>
  </Form>
</template>
