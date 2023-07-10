<script setup>
import DeleteConfirmation from '@/components/quotes/DeleteConfirmation.vue'
import IconExit from '@/components/icons/IconExit.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import UserCard from '@/components/ui/UserCard.vue'
import axiosInstance from '@/config/axios/index.js'
import { ref } from 'vue'

const showConfirmation = ref(false)
const props = defineProps({ quote: { type: Object, required: true } })
const emit = defineEmits(['close'])

const deleteQuote = async () => {
  await axiosInstance.post('/api/quote/delete', { id: props.quote.id })
  emit('close')
}
</script>

<template>
  <div class="border-b-2 border-border p-8 flex justify-between relative">
    <div class="flex">
      <router-link :to="{ name: 'edit-quote', params: { quoteId: quote.id } }">
        <icon-edit class="border-r-2 border-border pr-2 w-6"></icon-edit>
      </router-link>
      <icon-trash class="pl-2 w-6" @click="showConfirmation = !showConfirmation"></icon-trash>
    </div>

    <p class="hidden md:block">{{ $t('view_quote.header') }}</p>

    <icon-exit @click="$emit('close')"></icon-exit>

    <delete-confirmation
      v-if="showConfirmation"
      :quote="quote.quote"
      @cancel="$emit('close')"
      @delete-item="deleteQuote"
    ></delete-confirmation>
  </div>

  <user-card class="px-8"></user-card>
</template>
