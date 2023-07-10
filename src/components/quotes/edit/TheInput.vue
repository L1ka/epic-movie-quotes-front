<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  language: { type: String, required: true },
  value: { type: String, required: true },
  rules: { type: String, required: true }
})

const inputValue = ref(props.value)
</script>

<template>
  <div class="relative mb-4">
    <Field
      v-model="inputValue"
      as="textarea"
      :name="name"
      :rules="rules"
      rows="4"
      class="bg-transparent rounded-lg indent-2 pt-4 w-full border-2 border-border pr-16 pl-2 md:placeholder:text-sm-m"
    />
    <p class="absolute top-4 right-12">{{ language }}</p>
  </div>
  <ErrorMessage :name="name" class="text-red" />
</template>
