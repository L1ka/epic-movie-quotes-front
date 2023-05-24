import { configure } from 'vee-validate'
import { localize } from '@vee-validate/i18n'
import en from '@vee-validate/i18n/dist/locale/en.json'
import ka from '@vee-validate/i18n/dist/locale/ka.json'

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: 'This field is required',
        min: '{field} should contain at least 0:{min} character',
        // lower_case: 'use lower case characters',
        alpha_num_lower: 'use lower case alphanumerical Latin characters',
        max: '{field} can contain max 0:{max} character',
        confirmed: 'confirm password does not match password'
      },
      names: {
        first_name: 'name',
        confirm_password: 'confirm password'
      }
    },
    ka: {
      ...ka,
      messages: {
        required: 'აღნიშნული ველი სავალდებულოა',
        min: '{field}ს ველი უნდა შედგებოდეს მინიმუმ 0:{min} სიმბოლოსგან',
        max: '{field}ს ველი უნდა შედგებოდეს მინიმუმ 0:{max} სიმბოლოსგან',
        email: 'თქვენ მიერ შეყვანილი მეილი არასწორია',
        // lower_case: 'გამოიყენეთ დაბალი რეგისტრის სიმბოლოები',
        alpha_num_lower: 'გამოიყენეთ დაბალი რეგისტრის ლათინური სიმბოლოები და რიცხვები',
        confirmed: 'განმეორებითი პაროლი არ ემთხვევა პაროლს'
      },
      names: {
        email: 'ელ.ფოსტი',
        first_name: 'სახელი',
        password: 'პაროლი',
        confirm_password: 'პაროლი'
      }
    }
  })
})
