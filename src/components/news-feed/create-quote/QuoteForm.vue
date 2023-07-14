<script setup>
import IconExit from '@/components/icons/IconExit.vue'
import DropDown from '@/components/news-feed/create-quote/DropDown.vue'
import UserCard from '@/components/news-feed/UserCard.vue'
import AddImage from '@/components/quotes/add/AddImage.vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'
import { useUserStore } from '@/store/getUser.js'
import { storeToRefs } from 'pinia'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router'

const { user } = storeToRefs(useUserStore())

const router = useRouter()

const movieId = ref(null)
const image = ref(null)
const modal = ref(null)

const selectMovie = (id) => {
  movieId.value = id
}

const onDrop = (e) => {
  e.preventDefault()
  image.value = e.dataTransfer.files[0]
}

const closeModal = () => {
  router.push({ name: 'news-feed' })
}

const handleSubmit = async (data) => {
  await axiosInstance.post(
    'api/quote/store',
    {
      ...data,
      ...{ image: image.value ? image.value : data.image },
      id: movieId.value,
      user_id: user.value.id
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  closeModal()
}

onClickOutside(modal, () => closeModal())
</script>

<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
    class="top-0 left-0 right-0 bottom-0 fixed backdrop-blur-sm bg-black/50 z-40"
  ></div>
  <div
    class="z-50 rounded-lg bg-modal-black absolute top-0 left-0 right-0 text-white lg:mr-7 lg:top-36 lg:left-[25%] xl:left-[49%] xl:translate-x-[-50%] xl:w-[57%]"
    ref="modal"
  >
    <div class="border-b-2 border-border flex justify-center items-center py-8">
      <p class="text-sm-light capitalize">{{ $t('add_quote.add_new_quote') }}</p>
      <icon-exit class="absolute right-6" @click="closeModal()"></icon-exit>
    </div>
    <Form class="px-8 mb-12" @submit="handleSubmit">
      <user-card :user="user" class="mb-8"></user-card>

      <div class="relative">
        <Field
          as="textarea"
          name="quote.en"
          rows="4"
          rules="required|min:3|max:30|alpha_latin"
          placeholder="Start create new quote"
          class="bg-transparent rounded-lg indent-3 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
        />
        <p class="absolute top-4 right-3 md:right-8">Eng</p>
      </div>
      <ErrorMessage name="quote.en" class="text-red mb-4" />

      <div class="relative mt-4">
        <Field
          as="textarea"
          name="quote.ka"
          rows="4"
          rules="required|min:3|max:30|alpha_geo"
          placeholder="ახალი ციტატა"
          class="bg-transparent rounded-lg indent-3 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
        />
        <p class="absolute top-4 right-3 md:right-8">ქარ</p>
      </div>
      <ErrorMessage name="quote.ka" class="text-red" />

      <add-image name="image" :image="image"> </add-image>

      <drop-down @select="selectMovie($event)"></drop-down>

      <button class="bg-base-red w-full py-2 text-sm-light rounded-lg mt-8">
        {{ $t('add_quote.post') }}
      </button>
    </Form>
  </div>
</template>
