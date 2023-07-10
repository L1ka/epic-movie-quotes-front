<script setup>
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

const backUrl = import.meta.env.VITE_API_BASE_URL
const uploadedImage = ref(null)
const props = defineProps({ image: { type: String, required: true } })
const imageValue = ref(props.image)

const handleFileUpload = (event) => {
  const file = event.target.files[0]

  const reader = new FileReader()

  reader.addEventListener(
    'load',
    () => {
      uploadedImage.value = reader.result
    },
    false
  )

  if (file) {
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="mb-10 relative">
    <div
      v-if="!uploadedImage"
      :style="{ 'background-image': 'url(' + backUrl + image + ')' }"
      class="w-full h-[300px] lg:h-[500px] bg-cover bg-no-repeat bg-center rounded-md mb-4"
    ></div>
    <div
      v-if="uploadedImage"
      :style="{ 'background-image': 'url( ' + uploadedImage + ')' }"
      class="w-full h-[300px] lg:h-[500px] bg-cover bg-no-repeat bg-center rounded-md mb-4"
    ></div>

    <div
      class="bg-black/70 rounded-lg py-5 px-4 flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
    >
      <icon-photo></icon-photo>
      <p class="mt-3">{{ $t('edit_quote.change_photo') }}</p>

      <Field
        type="file"
        v-model="imageValue"
        @change="handleFileUpload"
        name="image"
        rules="required"
        class="z-10 w-full absolute top-[50%] translate-y-[-50%] py-2 cursor-pointer"
      />
    </div>
  </div>
  <ErrorMessage name="image" class="text-red" />
</template>
