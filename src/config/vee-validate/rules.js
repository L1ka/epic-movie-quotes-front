import { defineRule } from 'vee-validate'
import { required, min, email, max, alpha_num, confirmed } from '@vee-validate/rules'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('email', email)
defineRule('alpha_num', alpha_num)
defineRule('confirmed', confirmed)

defineRule('alpha_num_lower', (value) => {
  if (!/^[a-z0-9]+$/.test(value)) {
    return false
  }

  return true
})
