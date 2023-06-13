<script setup>
import IconErrorMark from '@/components/icons/IconErrorMark.vue'
import IconValid from '@/components/icons/IconValid.vue'
import IconEye from '@/components/icons/IconEye.vue'
import { ref } from 'vue'

import { Field, ErrorMessage } from 'vee-validate'
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  modelValue: {
    type: [String, Boolean],
    required: true
  },
  rules: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  errorsFromBack: {
    type: [String, Object],
    required: false
  },
  errors: {
    type: Object,
    required: false
  },
  valid: {
    type: Boolean,
    required: false
  }
})

const inputStyle = () => {
  if (props.errors) {
    if (props.errors[props.name]) {
      return 'border-2 border-base-red'
    }
    if (!props.errors[props.name] && props.modelValue !== '') {
      return 'border-2 border-green  focus:border-0'
    }
  }
}

const passwordIsVisible = ref(false)
</script>

<template>
  <div class="flex flex-col mb-4 w-full">
    <label for="name" class="text-white mb-2">{{ label }}<span class="text-red"> *</span></label>

    <div class="relative flex flex-col">
      <Field
        :rules="rules"
        :type="passwordIsVisible ? 'text' : type"
        :name="name"
        :placeholder="placeholder"
        class="bg-gray indent-3 py-3 placeholder:text-dark-gray rounded"
        :class="inputStyle()"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :validateOnInput="true"
      />

      <icon-valid
        :class="errors[name] || !modelValue ? 'hidden' : 'block'"
        class="absolute right-6 top-[50%] translate-y-[-50%]"
      ></icon-valid>
      <icon-error-mark
        v-if="errors[name]"
        class="absolute right-6 top-[50%] translate-y-[-50%]"
      ></icon-error-mark>
      <icon-eye
        @click="passwordIsVisible = !passwordIsVisible"
        v-if="name == 'password' || name == 'confirm_password'"
        class="absolute right-14 top-[50%] translate-y-[-50%]"
      ></icon-eye>
    </div>
    <ErrorMessage :name="name" class="text-red" />

    <p class="text-red">{{ errorsFromBack?.length === 0 ? '' : errorsFromBack }}</p>
  </div>
</template>
