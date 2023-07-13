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
        alpha_num_lower: 'use lower case alphanumerical Latin characters',
        geo_num: 'use georgian letters',
        max: '{field} can contain max 0:{max} character',
        confirmed: 'confirm password does not match password',
        alpha: 'use Latin characters',
        alpha_latin: 'use Latin characters',
        numeric: 'should contain 4 digit number'
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
        alpha_num_lower: 'გამოიყენეთ დაბალი რეგისტრის ლათინური სიმბოლოები და რიცხვები',
        geo_num: 'გამოიყენეთ ქართული სიმბოლოები',
        confirmed: 'განმეორებითი პაროლი არ ემთხვევა პაროლს',
        alpha: 'გამოიყენეთ ქართული სიმბოლოები',
        numeric: 'აღნიშნული ველი უნდა შედგებოდეს 4 ციფრისგან',
        image: 'ფოტოს ფორმატი არასწორია',
        alpha_geo: 'გამოიყენეთ ლათინური სიმბოლოები'
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
