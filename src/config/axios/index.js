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

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === (500 || 419 || 401)) {
      console.log('500 erroooor')
      const frontUrl = import.meta.env.VITE_FRONT_BASE_URL
      window.location.replace(`${frontUrl}/403`)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
