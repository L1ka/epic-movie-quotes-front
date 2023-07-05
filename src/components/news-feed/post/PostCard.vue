<script setup>
import TheComment from '@/components/news-feed/post/TheComment.vue'
import AddComment from '@/components/news-feed/post/AddComment.vue'
import AddLike from '@/components/news-feed/post/AddLike.vue'
import PostCardHeader from '@/components/news-feed/post/PostCardHeader.vue'
import { Form } from 'vee-validate'
import { ref, onMounted } from 'vue'

const props = defineProps({
  quote: { type: Object, required: true },
  userId: { type: Number, required: true }
})

const quote = ref(props.quote)

const showAllItems = ref(false)
const show = (e) => {
  showAllItems.value = e
}

onMounted(() => {
  window.Echo.channel('comments').listen('AddComment', (data) => {
    if (quote.value.id === data.movie.quote_id) {
      quote.value.comments.unshift(data.movie)
    }
  })
})
</script>

<template>
  <div v-if="quote.movie" class="lg:w-[70%] xl:w-[55%]">
    <Form class="px-8 py-6 bg-black mb-10 rounded-md lg:mr-7">
      <div class="text-white">
        <post-card-header :quote="quote" :movie="quote.movie"></post-card-header>

        <add-like :quote="quote" @show="show($event)"></add-like>

        <the-comment :quote="quote" v-model="showAllItems"></the-comment>

        <add-comment :quoteId="quote.id" :movieId="quote.movie.id"></add-comment>
      </div>
    </Form>
  </div>
</template>
