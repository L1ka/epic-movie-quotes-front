<script setup>
import Multiselect from '@vueform/multiselect'
import { onMounted, ref, watch } from 'vue'
import axiosInstance from '@/config/axios/index.js'

const options = ref({})
const value = ref(null)

const getGenres = async () => {
  await axiosInstance
    .get('api/get-genres')
    .then((res) => {
      res.data.genres.forEach((element) => {
        options.value = { ...options.value, [element.id]: element.genre }
      })
    })
    .catch((error) => console.log(error))
}

watch(value, (newVal) => {
  console.log(newVal)
})

onMounted(() => {
  getGenres()
})
</script>

<template>
  <div class="w-wull">
    <Multiselect
      v-model="value"
      :options="options"
      placeholder="ჟანრი/genre"
      mode="tags"
      class="border-2 border-red"
      id="test"
    />
  </div>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
