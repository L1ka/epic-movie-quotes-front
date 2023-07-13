<script setup>
import TheComment from '@/components/news-feed/post/TheComment.vue'
import AddComment from '@/components/news-feed/post/AddComment.vue'
import AddLike from '@/components/news-feed/post/AddLike.vue'
import PostCardHeader from '@/components/news-feed/post/PostCardHeader.vue'
import { Form } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  quotes: { type: Array, required: true }
})

const showAllItems = ref(false)
const show = (e) => {
  showAllItems.value = e
}
</script>

<template>
  <div v-for="(quote, index) in quotes" :key="index" class="lg:w-full">
    <Form v-if="quote.movie" class="px-8 py-6 bg-black mb-10 rounded-md lg:mr-7">
      <div class="text-white">
        <post-card-header :quote="quote" :movie="quote.movie"></post-card-header>

        <add-like :quote="quote" @show="show($event)"></add-like>

        <the-comment :quote="quote" v-model="showAllItems"></the-comment>

        <add-comment :quoteId="quote.id" :movieId="quote.movie.id"></add-comment>
      </div>
    </Form>
  </div>
</template>
