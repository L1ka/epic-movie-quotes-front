<script setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { Field } from 'vee-validate'
import { ref } from 'vue'

const props = defineProps({
  value: { type: [String, File], required: false }
})

const value = ref(props.value)
</script>

<template>
  <div class="w-full mb-3 relative text-xs py-6 pl-3 border-2 border-dark-gray rounded-md">
    <Field
      type="file"
      v-model="value"
      name="image"
      @change="$emit('fileChange', $event)"
      class="z-10 w-[50%] absolute right-0 top-[50%] translate-y-[-50%] py-2 cursor-pointer md:hidden"
    />

    <slot></slot>

    <div
      class="px-3 w-[50%] flex flex-col md:items-center absolute right-0 top-[50%] translate-y-[-50%]"
    >
      <div class="flex flex-col md:items-center mr-4 relative mb-4">
        <p class="text-light-yallow md:mb-4">{{ $t('edit_movie.replace_photo') }}</p>
        <div class="flex items-center">
          <icon-photo class="mr-2 hidden md:block"></icon-photo>
          <input type="div" class="py-10 px-10 absolute opacity-0" />
          <p class="hidden md:block">{{ $t('edit_movie.drop_image') }}</p>
        </div>
      </div>

      <div class="relative">
        <Field
          type="file"
          v-model="value"
          @change="$emit('fileChange', $event)"
          name="image"
          class="z-10 w-full absolute top-[50%] translate-y-[-50%] py-2 cursor-pointer hidden md:block"
        />
        <p class="text-center w-[60%] md:w-full md:px-2 py-2 rounded bg-purple">
          {{ $t('edit_movie.choose_file') }}
        </p>
      </div>
    </div>
  </div>
</template>
