import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': localStorage.getItem('locale') || 'en'
  }
})

export default axiosInstance
