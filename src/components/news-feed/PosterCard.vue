<script setup>
import TheComment from '@/components/news-feed/TheComment.vue'
import IconHeart from '@/components/icons/IconHeart.vue'
import IconMessage from '@/components/icons/IconMessage.vue'
</script>

<template>
  <div class="px-8 py-6x bg-black lg:w-[70%] xl:w-[55%] mb-10 rounded-md lg:mr-7">
    <div class="flex items-center mb-4 pt-8">
      <img
        src="@/assets/images/testimage.png"
        alt=""
        class="rounded-full h-12 w-12 mr-4 md:w-16 md:h-16"
      />
      <p class="text-white text-sm lg:text-sm-bold capitalize">Maia Nakashidze</p>
    </div>
    <p class="text-white text-sm mb-4 lg:text-sm-bold">
      “Follow your dream.”movie- <span class="text-light-yallow">Billy Elliot.</span> (2000)
    </p>
    <img src="@/assets/images/test.png" alt="" class="mb-4 rounded-lg min-w-[100%]" />
    <div class="border-solid border-b-2 border-border pb-4 flex mb-4">
      <div class="mr-6 flex">
        <p class="text-white mr-3 text-sm lg:text-sm-bold">2</p>
        <icon-message class="w-6 lg:w-8"></icon-message>
      </div>
      <div class="flex">
        <p class="text-white mr-3 text-sm lg:text-sm-bold">5</p>
        <icon-heart class="w-6 lg:w-8"></icon-heart>
      </div>
    </div>
    <the-comment></the-comment>
    <div class="flex items-center mt-4 mb-10">
      <img
        src="@/assets/images/testimage.png"
        alt=""
        class="rounded-full h-12 w-12 mr-4 md:w-16 md:h-16"
      />
      <textarea
        placeholder="Write a comment"
        class="bg-light-black rounded-lg indent-7 pt-4 w-full"
      ></textarea>
    </div>
  </div>
</template>
