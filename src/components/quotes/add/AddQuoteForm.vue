<script setup>
import AddImage from '@/components/quotes/add/AddImage.vue'
import axiosInstance from '@/config/axios/index.js'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { fetchUser } from '@/services/api'

const emit = defineEmits(['update'])
const router = useRouter()
const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
const props = defineProps({
  id: { type: String, required: true },
  image: { type: [File, null], required: true }
})

const handleSubmit = async (data) => {
  const formData = new FormData()
  formData.append('image', props.image ? props.image : data.image)
  formData.append('quote', JSON.stringify(data.quote))
  formData.append('user_id', user.value.id)
  formData.append('movie_id', props.id)

  await axiosInstance.post(`api/quotes`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  emit('update')

  router.push({ name: 'movie-description', params: { id: props.id } })
}

onMounted(() => getUser())
</script>

<template>
  <Form class="mb-12" @submit="handleSubmit">
    <add-image name="image" :image="image"> </add-image>

    <div class="relative mb-4">
      <Field
        as="textarea"
        name="quote.en"
        rows="4"
        rules="required|min:3|max:200|alpha_latin"
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
        rules="required|min:3|max:200|alpha_geo"
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
