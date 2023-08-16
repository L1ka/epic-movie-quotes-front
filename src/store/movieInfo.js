import { defineStore } from 'pinia'

export const useInfoStore = defineStore('movieInfo', () => {
  const movieInfo = [
    {
      label: 'წელი/Year',
      placeholder: 'წელი/Year',
      name: 'year',
      rules: 'required|min:4|max:4|numeric'
    },
    {
      label: 'Director:',
      placeholder: 'Director',
      name: 'director.en',
      rules: 'required|min:3|max:100|alpha_latin',
      lang: 'Eng'
    },
    {
      label: 'რეჟისორი:',
      placeholder: 'რეჟისორი',
      name: 'director.ka',
      rules: 'required|min:3|max:100|alpha_geo',
      lang: 'ქარ'
    },
    {
      label: 'Description:',
      placeholder: 'Movie description',
      name: 'discription.en',
      rules: 'required|min:3|max:200|alpha_latin',
      lang: 'Eng',
      type: 'textarea'
    },
    {
      label: 'ფილმის აღწერა:',
      placeholder: 'ფილმის აღწერა',
      name: 'discription.ka',
      rules: 'required|min:3|max:200|alpha_geo',
      lang: 'ქარ',
      type: 'textarea'
    }
  ]

  return { movieInfo }
})
