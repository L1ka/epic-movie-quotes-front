<script setup>
import IconExit from '@/components/icons/IconExit.vue'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconFilledDownArrow from '@/components/icons/IconFilledDownArrow.vue'
import { Form, Field } from 'vee-validate'
import IconPhoto from '@/components/icons/IconPhoto.vue'
import { ref } from 'vue'

const open = ref(true)
</script>

<template>
  <div
    class="rounded-lg bg-modal-black absolute top-0 left-0 right-0 text-white lg:mr-7 lg:top-[9%] lg:left-[25%] xl:left-[49%] xl:translate-x-[-50%] xl:w-[57%]"
    v-if="open"
  >
    <div class="border-b-2 border-border flex justify-center items-center py-8">
      <p class="text-sm-light capitalize">write new quote</p>
      <icon-exit class="absolute right-6" @click="open = false"></icon-exit>
    </div>
    <Form class="px-8 mb-12">
      <div class="flex items-center mb-4 pt-8">
        <img
          src="@/assets/images/testimage.png"
          alt=""
          class="rounded-full h-12 w-12 mr-4 md:w-16 md:h-16"
        />
        <p class="text-white text-sm lg:text-sm-bold capitalize">Maia Nakashidze</p>
      </div>
      <div class="relative mb-4">
        <textarea
          name="quoteEng"
          rows="4"
          placeholder="Start create new quote"
          class="bg-transparent rounded-lg indent-7 pt-4 w-full border-2 border-border"
        ></textarea>
        <p class="absolute top-4 right-7">Eng</p>
      </div>
      <div class="relative mb-4">
        <textarea
          name="quoteGeo"
          rows="4"
          placeholder="ახალი ციტატა"
          class="bg-transparent rounded-lg indent-7 pt-4 w-full border-2 border-border"
        ></textarea>
        <p class="absolute top-4 right-7">ქარ</p>
      </div>
      <div
        class="flex justify-between border-2 border-border py-10 w-full rounded-lg relative text-xs mb-4"
      >
        <label for="poster" id="poster">Choose File</label>
        <Field type="file" class="mb-4" name="poster" />
        <div class="flex items-center absolute left-7">
          <icon-photo class="mr-2"></icon-photo>
          <p>Upload image</p>
        </div>
      </div>
      <div class="flex items-center justify-between rounded-lg px-7 h-24 bg-black w-full mb-8">
        <div class="flex items-center">
          <icon-camera class="mr-3"></icon-camera>
          <p class="text-xs">Choose movie</p>
        </div>
        <icon-filled-down-arrow></icon-filled-down-arrow>
      </div>
      <button class="bg-base-red w-full py-2 text-sm-light rounded-lg">Post</button>
    </Form>
  </div>
</template>
