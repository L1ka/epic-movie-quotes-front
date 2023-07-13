import { defineRule } from 'vee-validate'
import {
  required,
  min,
  email,
  max,
  alpha_num,
  confirmed,
  alpha,
  numeric,
  image,
  one_of
} from '@vee-validate/rules'

defineRule('required', required)
defineRule('min', min)
defineRule('max', max)
defineRule('email', email)
defineRule('alpha_num', alpha_num)
defineRule('confirmed', confirmed)
defineRule('alpha', alpha)
defineRule('numeric', numeric)
defineRule('image', image)
defineRule('one_of', one_of)

defineRule('alpha_num_lower', (value) => {
  if (!value) {
    return true
  }
  if (!/^[a-z0-9]+$/.test(value)) {
    return false
  }

  return true
})

defineRule('alpha_geo', (value) => {
  if (!/^[ა-ჰ\s?,.'":;]+$/.test(value)) {
    return false
  }

  return true
})

defineRule('alpha_latin', (value) => {
  if (!/^[a-zA-Z\s?,.'":;]+$/.test(value)) {
    return false
  }

  return true
})
