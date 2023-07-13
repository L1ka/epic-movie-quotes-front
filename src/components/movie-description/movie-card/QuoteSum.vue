<script setup>
import IconPlus from '@/components/icons/IconPlus.vue'
const props = defineProps({ length: { type: Number, required: true } })
</script>

<template>
  <div class="items-center mt-8 hidden md:flex p-8">
    <p class="border-r-2 border-border min-w-max pr-4 text-sm-light">
      {{ $t('quote.quotes') }} ({{ $t('my_movies.sum') }} {{ length }})
    </p>
    <router-link
      @update="$emit('update')"
      :to="{ name: 'add-quote' }"
      class="bg-base-red py-2 px-2 lg:px-4 lg:text-sm-light flex items-center justify-center rounded-md self-start ml-4"
    >
      <icon-plus class="mr-2"></icon-plus>{{ $t('quote.add_quote') }}
    </router-link>
  </div>
</template>
