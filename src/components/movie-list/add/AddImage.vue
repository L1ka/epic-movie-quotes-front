<script setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { Field, ErrorMessage } from 'vee-validate'
</script>

<template>
  <div class="w-full mb-3">
    <div class="relative text-xs py-6 border-2 border-dark-gray rounded-md">
      <Field
        type="file"
        name="image"
        rules="required"
        class="w-full z-10 absolute top-[50%] translate-y-[-50%] py-2 cursor-pointer md:hidden"
      />

      <div
        class="w-full px-3 flex items-center justify-between md:justify-start absolute top-[50%] translate-y-[-50%]"
      >
        <div class="flex items-center mr-4 relative">
          <icon-photo class="mr-2"></icon-photo>
          <p class="md:hidden">{{ $t('add_movie.upload_image') }}</p>
          <p class="hidden md:block">{{ $t('edit_movie.drop_image') }}</p>
        </div>
        <div class="relative">
          <Field
            type="file"
            name="image"
            rules="required"
            class="z-10 w-full absolute top-[50%] translate-y-[-50%] py-2 cursor-pointer hidden md:inline"
          />

          <p class="px-2 py-2 rounded bg-purple">{{ $t('edit_movie.choose_file') }}</p>
        </div>
      </div>
    </div>
    <ErrorMessage name="image" class="text-red" />
  </div>
</template>
