import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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
    if (error.response.status === (500 || 419 || 403 || 401)) {
      const frontUrl = import.meta.env.VITE_FRONT_BASE_URL
      window.location.replace(`${frontUrl}/403`)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
