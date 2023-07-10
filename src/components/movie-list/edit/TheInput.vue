<script setup>
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  label: { type: String, required: false },
  name: { type: String, required: true },
  value: { type: [String, Number], required: false },
  rules: { type: String, required: false },
  type: { type: String, required: false },
  lang: { type: String, required: false }
})
const value = ref(props.value)
</script>

<template>
  <div class="w-full mb-3">
    <div class="relative flex items-center border-2 border-dark-gray rounded-md py-4 px-3">
      <label for="year" class="text-dark-gray min-w-max">{{ label }}:</label>
      <Field
        v-model="value"
        :name="name"
        :type="type"
        :rules="rules"
        class="bg-transparent rounded-md indent-3 focus:shadow-none focus:border-0 w-full pr-10 sm:pr-16"
      />
      <span class="absolute right-3 top-[50%] translate-y-[-50%] text-dark-gray">{{ lang }}</span>
    </div>
    <ErrorMessage :name="name" class="text-red" />
  </div>
</template>
