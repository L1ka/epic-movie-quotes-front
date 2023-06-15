<script setup>
import PostCard from '@/components/news-feed/PostCard.vue'
import CreateQuote from '@/components/news-feed/CreateQuote.vue'
import SearchBar from '@/components/news-feed/SearchBar.vue'
import BaseLayout from '@/components/ui/BaseLayout.vue'
</script>

<template>
  <base-layout>
    <div class="flex flex-col xl:items-center lg:items-end">
      <div class="flex justify-between w-full lg:w-[70%] xl:w-[55%] mt-8 mb-6">
        <create-quote></create-quote>
        <search-bar class="hidden lg:flex"></search-bar>
      </div>

      <post-card></post-card>
    </div>
  </base-layout>
</template>
