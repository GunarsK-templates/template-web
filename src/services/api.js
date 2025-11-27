import axios from 'axios'
import { env } from '@/config/env'
import { API_TIMEOUTS } from '@/config/api'

/**
 * Axios instance with base configuration
 */
const api = axios.create({
  baseURL: env.apiUrl,
  timeout: API_TIMEOUTS.DEFAULT,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error in development
    if (env.isDevelopment) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        message: error.message,
      })
    }
    return Promise.reject(error)
  }
)

export default api

// API methods
export const apiService = {
  // Health check
  health: () => api.get('/health'),

  // Example CRUD operations
  items: {
    getAll: () => api.get('/api/v1/items'),
    getById: (id) => api.get(`/api/v1/items/${id}`),
    create: (data) => api.post('/api/v1/items', data),
    update: (id, data) => api.put(`/api/v1/items/${id}`, data),
    delete: (id) => api.delete(`/api/v1/items/${id}`),
  },
}
