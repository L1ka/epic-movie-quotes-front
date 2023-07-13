<script setup>
import { Field, ErrorMessage } from 'vee-validate'

const props = defineProps({
  placeholder: { type: String, required: false },
  name: { type: String, required: true },
  rules: { type: String, required: false },
  type: { type: String, required: false },
  lang: { type: String, required: false },
  errorsFromBack: { type: [String, Object], required: false }
})
</script>

<template>
  <div class="w-full mb-3">
    <div class="relative">
      <Field
        :as="type"
        :name="name"
        :type="type"
        :rules="rules"
        class="border-2 border-dark-gray bg-transparent w-full py-4 rounded-md indent-3"
        :placeholder="placeholder"
      />
      <span
        class="absolute md:right-[4%] right-[12%] top-[50%] translate-y-[-50%] text-dark-gray"
        >{{ lang }}</span
      >
    </div>

    <ErrorMessage :name="name" class="text-red" />
    <p class="text-red">{{ errorsFromBack ? errorsFromBack : '' }}</p>
  </div>
</template>
