<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
import AllQuotes from '@/components/movie-description/all-quotes/AllQuotes.vue'
import EditOrDeleteMovie from '@/components/movie-description/movie-card/EditOrDeleteMovie.vue'
import MovieGenres from '@/components/movie-description/movie-card/MovieGenres.vue'
import QuoteSum from '@/components/movie-description/movie-card/QuoteSum.vue'
import axiosInstance from '@/config/axios/index.js'
import { onMounted, ref } from 'vue'
import { useLocaleStore } from '@/store/locale.js'
import { storeToRefs } from 'pinia'

const { selectedLocale } = storeToRefs(useLocaleStore())

const props = defineProps({ id: { type: String } })

const backUrl = import.meta.env.VITE_API_BASE_URL
const movie = ref(null)

const getMovie = async () => {
  await axiosInstance.get(`/api/get-movie/${props.id}`).then((res) => {
    movie.value = res.data.data
  })
}

const getQuoteSum = () => {
  getMovie()
}

onMounted(() => {
  getMovie()
})
</script>

<template>
  <div class="lg:w-[80%] w-screen lg:self-end h-full p-8 text-white" v-if="movie">
    <div class="text-white border-b-2 border-border pb-6 md:border-0">
      <div>
        <p class="hidden md:block mb-4">{{ $t('movie.description') }}</p>
        <div class="flex flex-col md:flex-row w-full">
          <div
            :style="{ 'background-image': 'url( ' + backUrl + movie.image + ')' }"
            class="md:w-[55%] w-full h-52 rounded-md md:mr-8 bg-cover bg-center"
          ></div>

          <div class="flex flex-col mt-6 md:mt-0 md:w-[45%]">
            <div class="md:flex items-center justify-between">
              <p class="text-sm text-light-yallow flex md:text-xs lg:text-sm-dark xl:text-sm-m">
                {{ movie.title[selectedLocale] }}
                <span class="ml-2 md:ml-0">({{ movie.year }})</span>
              </p>

              <edit-or-delete-movie
                :title="movie.title"
                :movie-id="movie.id"
              ></edit-or-delete-movie>
            </div>

            <movie-genres :genres="movie.genres"></movie-genres>

            <p class="mb-4">{{ $t('movie.director') }}: {{ movie.director[selectedLocale] }}</p>

            <p class="mb-4 lg:text-sm-light">
              {{ movie.discription[selectedLocale] }}
            </p>

            <router-link
              @click="$emit('modal')"
              :to="{ name: 'add-quote' }"
              class="bg-base-red py-2 px-2 lg:px-4 lg:text-sm-light flex items-center justify-center rounded-md self-start md:hidden"
            >
              <icon-plus class="mr-2"></icon-plus>{{ $t('quote.add_quote') }}
            </router-link>
          </div>
        </div>

        <quote-sum :length="movie.quotes.length" @update="getMovie()"></quote-sum>
      </div>
    </div>
    <all-quotes :id="movie.id" @update="getQuoteSum"></all-quotes>
    <router-view></router-view>
  </div>
</template>
