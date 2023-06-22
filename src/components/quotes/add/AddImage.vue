<script setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { Field } from 'vee-validate'

const props = defineProps({
  name: { type: String, required: true }
})
</script>

<template>
  <div
    class="w-full mb-3 relative text-xs md:text-sm-bold py-12 border-2 border-dark-gray rounded-md"
  >
    <Field
      type="file"
      :name="name"
      class="w-full z-10 absolute top-[50%] translate-y-[-50%] py-2 cursor-pointer md:hidden"
    />

    <div
      class="w-full px-3 flex items-center justify-between md:justify-start absolute top-[50%] translate-y-[-50%]"
    >
      <div class="flex items-center mr-4 relative">
        <icon-photo class="mr-2"></icon-photo>
        <p class="md:hidden">Upload image</p>
        <p class="hidden md:block">Drag & drop your image here or</p>
      </div>
      <div class="relative">
        <Field
          type="file"
          :name="name"
          class="z-10 w-full absolute top-[50%] translate-y-[-50%] py-2 cursor-pointer hidden md:block"
        />
        <p class="px-2 py-2 rounded bg-purple">Choose file</p>
      </div>
    </div>
  </div>
</template>
