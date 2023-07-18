<script setup>
import EditMovieHeader from '@/components/movie-list/edit/EditMovieHeader.vue'
import TheInput from '@/components/movie-list/edit/TheInput.vue'
import TheImage from '@/components/movie-list/edit/TheImage.vue'
import EditImage from '@/components/movie-list/edit/EditImage.vue'
import UserCard from '@/components/ui/UserCard.vue'
import { useGenresStore } from '@/store/getGenres.js'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import axiosInstance from '@/config/axios/index.js'
import { onClickOutside } from '@vueuse/core'
import { useRouter, useRoute } from 'vue-router'
import Multiselect from '@vueform/multiselect'

const route = useRoute()
const id = route.params.id
const image = ref('')
const test = ref(null)
const { options } = storeToRefs(useGenresStore())
const value = ref([])
const movie = ref(null)
const modal = ref(null)
const router = useRouter()
const show = ref(true)

onClickOutside(modal, () => {
  show.value = false
  router.push({ name: 'movie-list' })
})

onMounted(async () => {
  await axiosInstance.get(`api/movies/${id}`).then((res) => {
    movie.value = res.data.data

    res.data.data.genres.forEach((el) => {
      value.value.push(el.id)
    })
  })

  console.log(movie.value)
})

const uploadImage = (file) => {
  const reader = new FileReader()
  reader.addEventListener(
    'load',
    () => {
      test.value = reader.result
    },
    false
  )

  if (file) {
    reader.readAsDataURL(file)
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  uploadImage(file)
}

const onDrop = (e) => {
  const file = e.dataTransfer.files[0]

  uploadImage(file)

  e.preventDefault()
  e.stopPropagation()

  image.value = file
}

const handleSubmit = async (data) => {
  if (!value.value.length) return

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

  formData.append('image', image.value ? image.value : data.image)
  formData.append('genre', JSON.stringify(value.value))
  formData.append('_method', 'patch')

  await axiosInstance
    .post(`api/movies/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      show.value = false
      router.push({ name: 'movie-list' })
    })
}
</script>

<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
    v-if="movie && show"
    class="flex justify-center top-0 left-0 bottom-0 right-0 backdrop-brightness-50 bg-light-black/30 absolute z-40"
  >
    <Form
      ref="modal"
      v-if="movie && show"
      class="w-full lg:w-[60%] flex flex-col items-center px-7 text-white z-10 bg-black overflow-y-scroll max-h-[1000px] lg:mt-28"
      @submit="handleSubmit"
    >
      <edit-movie-header></edit-movie-header>

      <user-card class="self-start"></user-card>

      <the-input
        :value="movie.title.en"
        label="Movie name"
        name="title.en"
        rules="required|min:3|max:30|alpha_latin"
        lang="Eng"
      ></the-input>

      <the-input
        :value="movie.title.ka"
        label="ფილმის სახელი"
        name="title.ka"
        rules="required|min:3|max:30|alpha_geo"
        lang="ქარ"
      ></the-input>

      <div class="w-full mb-3 relative">
        <Multiselect
          name="genre"
          v-model="value"
          :options="options"
          placeholder="ჟანრი/genre"
          mode="tags"
          class="w-full"
          id="test"
        />
        <p v-if="!value.length" class="text-base-red mt-2">{{ $t('add_movie.required') }}</p>
      </div>

      <the-input
        :value="movie.year"
        label="წელი/Year"
        name="year"
        rules="required|min:4|max:4|numeric"
        lang="Eng"
      ></the-input>

      <the-input
        :value="movie.director.en"
        label="Director"
        name="director.en"
        rules="required|min:3|max:30|alpha_latin"
        lang="Eng"
      ></the-input>

      <the-input
        :value="movie.director.ka"
        label="რეჟისორი"
        name="director.ka"
        rules="required|min:3|max:30|alpha_geo"
        lang="ქარ"
      ></the-input>

      <the-input
        :value="movie.discription.en"
        label="Discription"
        name="discription.en"
        rules="required|min:3|max:30|alpha_latin"
        lang="Eng"
      ></the-input>

      <the-input
        :value="movie.discription.ka"
        label="ფილმის აღწერა"
        name="discription.ka"
        rules="required|min:3|max:30|alpha_geo"
        lang="ქარ"
      ></the-input>

      <edit-image @file-change="handleFileUpload($event)" :value="movie.image">
        <the-image :test="test" :image="movie.image"></the-image>
      </edit-image>

      <button class="w-full mb-10 relative bg-base-red rounded py-3">
        {{ $t('edit_movie.save') }}
      </button>
    </Form>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
