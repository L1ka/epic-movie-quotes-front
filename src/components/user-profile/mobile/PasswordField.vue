<script setup>
import IconLeftArrow from '@/components/icons/IconLeftArrow.vue'
import ValidationInformation from '@/components/user-profile/ValidationInformation.vue'
import TheInput from '@/components/ui/TheInput.vue'
import { ref } from 'vue'

const props = defineProps({
  input: { type: Boolean, required: true },
  value: { type: String, required: true },
  confirmValue: { type: String, required: true },
  name: { type: String, required: true },
  rules: { type: String, required: false },
  errors: { type: Object, required: false },
  valid: { type: Boolean, required: false },
  placeholder: { type: String, required: false },
  label: { type: String, required: false }
})
const value = ref(props.value)
const confirmValue = ref(props.confirmValue)

const emit = defineEmits(['visible', 'edit'])
</script>

<template>
  <div v-if="input" class="fixed top-0 left-0 right-0 bottom-0 bg-black/30"></div>
  <div v-if="input" class="fixed top-20 left-0 right-0 bottom-0 bg-black"></div>
  <div
    class="mb-6 absolute top-[10%] left-[50%] translate-x-[-50%] z-40 py-10 w-full"
    id="2"
    v-if="input"
  >
    <icon-left-arrow class="ml-8 self-start mb-6" @click="$emit('visible')"></icon-left-arrow>
    <div class="bg-light-black w-full py-24 px-10">
      <validation-information></validation-information>

      <p class="mb-2">{{ $t('profile.new') }} {{ label }}</p>

      <the-input
        v-model="value"
        :name="name"
        :rules="rules"
        :errors="errors"
        class="text-dark-gray"
        :valid="valid"
        :placeholder="placeholder"
        type="password"
      ></the-input>

      <p class="mb-2">{{ $t('profile.confirm_password') }}</p>
      <the-input
        v-model="confirmValue"
        name="confirm_password"
        rules="confirmed:@password"
        :errors="errors"
        class="mb-[0] w-[750px] text-dark-gray"
        :valid="valid"
        type="password"
        :placeholder="$t('profile.repeat_password')"
      ></the-input>
    </div>

    <div class="flex justify-between w-full px-10 mt-8">
      <p @click="$emit('visible')">{{ $t('profile.cancel') }}</p>
      <p @click="$emit('edit')" class="bg-base-red px-5 py-2 rounded">{{ $t('profile.edit') }}</p>
    </div>
  </div>
</template>
