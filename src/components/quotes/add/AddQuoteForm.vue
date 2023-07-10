<script setup>
import AddImage from '@/components/quotes/add/AddImage.vue'
import axiosInstance from '@/config/axios/index.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'

const emit = defineEmits(['update'])
const router = useRouter()
const { user } = storeToRefs(useUserStore())
const props = defineProps({
  id: { type: String, required: true },
  image: { type: [File, null], required: true }
})

const handleSubmit = async (data) => {
  await axiosInstance.post(
    'api/quote/create',
    {
      ...data,
      ...{ image: props.image ? props.image : data.image },
      id: props.id,
      user_id: user.value.id
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  emit('update')

  router.push({ name: 'movie-description', params: { id: props.id } })
}
</script>

<template>
  <Form class="mb-12" @submit="handleSubmit">
    <add-image name="image" :image="image"> </add-image>

    <div class="relative mb-4">
      <Field
        as="textarea"
        name="quote.en"
        rows="4"
        rules="required|min:3|max:30|alpha_num"
        placeholder="Start create new quote"
        class="bg-transparent rounded-lg indent-3 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
      />
      <p class="absolute top-4 right-3 md:right-8">Eng</p>
    </div>
    <ErrorMessage name="quote.en" class="text-red" />
    <div class="relative mb-4">
      <Field
        as="textarea"
        name="quote.ka"
        rows="4"
        rules="required|min:3|max:30|geo_num"
        placeholder="ახალი ციტატა"
        class="bg-transparent rounded-lg indent-3 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
      />
      <p class="absolute top-4 right-3 md:right-8">ქარ</p>
    </div>
    <ErrorMessage name="quote.ka" class="text-red" />

    <button class="bg-base-red w-full py-2 md:py-4 text-sm-light rounded-lg">
      {{ $t('add_quote.save') }}
    </button>
  </Form>
</template>
