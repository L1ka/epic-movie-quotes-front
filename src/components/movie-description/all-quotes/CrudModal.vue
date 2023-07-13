<script setup>
import IconOpenEye from '@/components/icons/IconOpenEye.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconEdit from '@/components/icons/IconEdit.vue'

const props = defineProps({ quoteId: { type: Number, required: true } })
</script>

<template>
  <div
    class="bg-light-black md:text-sm-light flex flex-col py-6 px-8 rounded-md text-xs absolute bottom-7 right-0 md:-right-40 md:bottom-auto md:top-10"
  >
    <router-link
      :to="{ name: 'view-quote', params: { quoteId: quoteId } }"
      class="flex items-center mb-4 cursor-pointer"
    >
      <icon-open-eye class="mr-3 md:w-8"></icon-open-eye>
      <p>{{ $t('quote.view_quote') }}</p>
    </router-link>
    <router-link
      :to="{ name: 'edit-quote', params: { quoteId: quoteId } }"
      class="flex items-center mb-4 cursor-pointer"
    >
      <icon-edit class="mr-3 md:w-8"></icon-edit>
      <p>{{ $t('quote.edit') }}</p>
    </router-link>
    <div class="flex items-center cursor-pointer" @click="$emit('delete-quote')">
      <icon-trash class="mr-3 md:w-8"></icon-trash>
      <p>{{ $t('quote.delete') }}</p>
    </div>
  </div>
</template>
