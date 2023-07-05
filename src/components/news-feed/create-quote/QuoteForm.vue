<script setup>
import IconExit from '@/components/icons/IconExit.vue'
import DropDown from '@/components/news-feed/create-quote/DropDown.vue'
import UserCard from '@/components/news-feed/UserCard.vue'
import AddImage from '@/components/quotes/add/AddImage.vue'
import { Form, Field } from 'vee-validate'
import { ref } from 'vue'
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'
import axiosInstance from '@/config/axios/index.js'

const { user } = storeToRefs(useUserStore())
const open = ref(true)
const movieId = ref(null)
const emit = defineEmits(['update'])

const getMovieId = (id) => {
  movieId.value = id
}

const handleSubmit = async (data) => {
  const formData = new FormData()
  formData.append('image', data.image)

  await axiosInstance.post(
    'api/quote/create',
    { ...data, ...formData, id: movieId.value, user_id: user.value.id },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  emit('update')
  open.value = false
}
</script>

<template>
  <div
    class="rounded-lg bg-modal-black absolute top-0 left-0 right-0 text-white lg:mr-7 lg:top-36 lg:left-[25%] xl:left-[49%] xl:translate-x-[-50%] xl:w-[57%]"
    v-if="open"
  >
    <div class="border-b-2 border-border flex justify-center items-center py-8">
      <p class="text-sm-light capitalize">write new quote</p>
      <icon-exit class="absolute right-6" @click="open = false"></icon-exit>
    </div>
    <Form class="px-8 mb-12" @submit="handleSubmit">
      <user-card :user="user" class="mb-8"></user-card>

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

      <add-image name="image"> </add-image>

      <drop-down @select="getMovieId($event)"></drop-down>

      <button class="bg-base-red w-full py-2 text-sm-light rounded-lg mt-8">Post</button>
    </Form>
  </div>
</template>
