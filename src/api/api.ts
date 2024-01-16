import toast from 'react-hot-toast'

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_REST_URL,
})

api.interceptors.request.use(async (config: any) => {
  const token = localStorage.getItem(`@pizzaria:token`)

  if (config.headers && token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem(`@pizzaria:token`)
      localStorage.removeItem(`@pizzaria:user`)

      window.location.href = '/sign-in'
    }

    if (!error.response.config.url.includes('session/oauth')) {
      toast.error(error.response.data.message)
    }

    return Promise.reject(error.response)
  },
)

export { api }
