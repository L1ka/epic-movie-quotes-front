<script setup>
import IconThreeDots from '@/components/icons/IconThreeDots.vue'
import LikeAndComment from '@/components/movie-description/all-quotes/LikeAndComment.vue'
import DeleteConfirmation from '@/components/quotes/DeleteConfirmation.vue'
import CrudModal from '@/components/movie-description/all-quotes/CrudModal.vue'
import QuoteInfo from '@/components/movie-description/all-quotes/QuoteInfo.vue'
import { onMounted, ref, watch } from 'vue'
import axiosInstance from '@/config/axios/index.js'
import { useRoute } from 'vue-router'

const quotes = ref(null)
const route = useRoute()
const emit = defineEmits(['update'])
const props = defineProps({ id: { type: Number, required: true } })

const deleteBox = (index) => {
  toggleHiddenDiv(index)
  document.getElementById('index-' + index).style.display = 'block'
}

const show = (index) => {
  document.getElementById('index-' + index).style.display = 'none'
}

const toggleHiddenDiv = (i) => {
  quotes.value[i].show = !quotes.value[i].show
}

const deleteQuote = async (id, index) => {
  await axiosInstance.delete(`/api/quote/${id}`)

  show.value = false
  document.getElementById('index-' + index).style.display = 'none'
  getQuotes()
  emit('update')
}

const getQuotes = async () => {
  await axiosInstance.get(`/api/quotes/${props.id}`).then((res) => {
    console.log(res.data.data)
    quotes.value = res.data.data
  })
}

watch(
  () => route.params,
  () => {
    if (route.name == 'movie-description') getQuotes()
  }
)

onMounted(() => {
  getQuotes()
})
</script>

<template>
  <div class="text-white w-full md:w-[55%] mt-16" v-if="quotes">
    <div class="pb-8 md:hidden">
      <p>{{ $t('quote.all_quotes') }}</p>
      <p>({{ $t('quote.sum') }} {{ quotes.length }})</p>
    </div>

    <div
      class="bg-black p-8 md:pt-0 mb-10 relative rounded-md"
      v-for="(quote, index) in quotes"
      :key="index"
    >
      <quote-info :image="quote.image" :quote="quote.quote"></quote-info>

      <div class="flex justify-between items-center mt-3 md:mt-8 relative md:static">
        <like-and-comment
          :like-sum="quote.likes_count"
          :comment-sum="quote.comments.length"
        ></like-and-comment>

        <icon-three-dots
          @click="toggleHiddenDiv(index)"
          class="w-6 md:w-8 md:absolute top-3 right-8"
        ></icon-three-dots>

        <crud-modal
          v-if="quote.show"
          @delete-quote="deleteBox(index)"
          :quoteId="quote.id"
        ></crud-modal>

        <delete-confirmation
          v-show="false"
          :id="`index-${index}`"
          :quote="quote.quote"
          @cancel="show(index)"
          @delete-item="deleteQuote(quote.id, index)"
          class="absolute right-0 top-12 left-auto"
        ></delete-confirmation>
      </div>
    </div>
  </div>
</template>
