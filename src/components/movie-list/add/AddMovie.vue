<script setup>
import AddMovieHeader from '@/components/movie-list/add/AddMovieHeader.vue'
import SubmitButton from '@/components/movie-list/add/SubmitButton.vue'
import UserCard from '@/components/ui/UserCard.vue'
import TheInput from '@/components/movie-list/add/TheInput.vue'
import AddImage from '@/components/movie-list/add/AddImage.vue'
import { onClickOutside } from '@vueuse/core'
import { useInfoStore } from '@/store/movieInfo.js'
import { ref, onMounted } from 'vue'
import { Form } from 'vee-validate'
import axiosInstance from '@/config/axios/index.js'
import Multiselect from '@vueform/multiselect'
import { useRouter } from 'vue-router'
import { fetchGenres } from '@/services/api'
import { fetchUser } from '@/services/api'

const route = useRouter()
const user = ref(null)
const getUser = async () => {
  user.value = await fetchUser()
}
const { movieInfo } = useInfoStore()
const options = ref({})
const modal = ref(null)
const image = ref('')
const errorsFromBack = ref('')
const SelectedValue = ref([])
const show = ref(true)
const showGenreArror = ref(false)
const getGenres = async () => {
  options.value = await fetchGenres()
}

onClickOutside(modal, () => {
  show.value = false
  route.push({ name: 'movie-list' })
})

const onDrop = (e) => {
  e.preventDefault()
  image.value = e.dataTransfer.files[0]
}

const handleSubmit = async (data) => {
  if (!SelectedValue.value.length) return
  const formData = new FormData()
  formData.append('image', image.value ? image.value : data.image)
  formData.append('title', JSON.stringify(data.title))
  formData.append('discription', JSON.stringify(data.discription))
  formData.append('director', JSON.stringify(data.director))
  formData.append('year', data.year)
  formData.append('user_id', user.value.id)
  formData.append('genre', JSON.stringify(SelectedValue.value))
  console.log(SelectedValue.value)
  await axiosInstance
    .post('/api/movies', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(() => route.push({ name: 'movie-list' }))
    .catch((error) => {
      errorsFromBack.value = error.response.data.message
    })
}

onMounted(() => {
  getGenres()
  getUser()
})
</script>

<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent
    @dragleave.prevent
    class="flex justify-center top-0 left-0 bottom-0 right-0 backdrop-brightness-50 bg-light-black/30 absolute z-40"
  >
    <Form
      v-if="show && options"
      ref="modal"
      class="w-full lg:w-[60%] flex flex-col items-center px-7 bg-modal-black text-white z-50 overflow-y-scroll max-h-[1000px] lg:mt-28"
      @submit="handleSubmit"
    >
      <add-movie-header></add-movie-header>

      <user-card class="self-start" sidebar="sidebar"></user-card>

      <the-input
        placeholder="Movie name"
        name="title.en"
        rules="required|min:3|max:30|alpha_latin"
        lang="Eng"
        :errorsFromBack="errorsFromBack"
      ></the-input>

      <the-input
        placeholder="ფილმის სახელი"
        name="title.ka"
        rules="required|min:3|max:30|alpha_geo"
        lang="ქარ"
        :errorsFromBack="errorsFromBack"
      ></the-input>

      <div class="w-full mb-3 relative">
        <Multiselect
          name="genre"
          v-model="SelectedValue"
          :options="options"
          placeholder="ჟანრი/genre"
          mode="tags"
          class="w-full"
        />
        <p v-if="showGenreArror" class="text-base-red mt-2">{{ $t('add_movie.required') }}</p>
      </div>

      <the-input
        v-for="(movie, index) in movieInfo"
        :key="index"
        :rules="movie.rules"
        :name="movie.name"
        :placeholder="movie.placeholder"
        :lang="movie?.lang"
        :type="movie?.type"
      ></the-input>

      <add-image :image="image"></add-image>

      <submit-button
        @submit="SelectedValue.length == 0 ? (showGenreArror = true) : ''"
      ></submit-button>
    </Form>
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
