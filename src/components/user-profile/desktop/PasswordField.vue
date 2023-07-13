<script setup>
import ValidationInformation from '@/components/user-profile/ValidationInformation.vue'
import TheInput from '@/components/ui/TheInput.vue'
import { ref } from 'vue'

const props = defineProps({
  value: { type: String, required: true },
  confirmValue: { type: String, required: true },
  errors: { type: Object, required: false },
  valid: { type: Boolean, required: false }
})
const value = ref(props.value)
const confirmValue = ref(props.confirmValue)
</script>

<template>
  <div class="mb-6 input">
    <validation-information></validation-information>

    <p class="mb-2">{{ $t('profile.new_password') }}</p>
    <the-input
      v-model="value"
      name="password"
      rules="required|min:8|max:15|alpha_num_lower"
      :errors="errors"
      class="mb-6 w-[750px] text-dark-gray"
      :valid="valid"
      type="password"
      :placeholder="$t('profile.enter_password')"
    ></the-input>

    <p class="mb-2">{{ $t('profile.confirm_password') }}</p>
    <the-input
      v-model="confirmValue"
      name="confirm_password"
      rules="required|confirmed:@password"
      :errors="errors"
      class="mb-[0] w-[750px] text-dark-gray"
      :valid="valid"
      type="password"
      :placeholder="$t('profile.repeat_password')"
    ></the-input>
  </div>
</template>
