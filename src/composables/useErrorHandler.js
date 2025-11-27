import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { RETRY_CONFIG } from '@/config/api'
import logger from '@/utils/logger'

/**
 * Centralized error handling composable
 */
export function useErrorHandler() {
  const router = useRouter()
  const message = useMessage()

  /**
   * Handle API errors with appropriate user feedback
   */
  const handleError = (error, context = {}) => {
    const status = error.response?.status
    const errorMessage = error.response?.data?.error || error.message

    logger.error('API Error', {
      status,
      message: errorMessage,
      url: error.config?.url,
      method: error.config?.method,
      ...context,
    })

    switch (status) {
      case 400:
        message.error(errorMessage || 'Invalid request')
        break
      case 401:
        handle401()
        break
      case 403:
        handle403()
        break
      case 404:
        message.warning('Resource not found')
        break
      case 408:
      case 504:
        message.error('Request timed out. Please try again.')
        break
      case 500:
      case 502:
      case 503:
        message.error('Server error. Please try again later.')
        break
      default:
        if (error.code === 'ERR_NETWORK') {
          message.error('Network error. Please check your connection.')
        } else {
          message.error(errorMessage || 'An unexpected error occurred')
        }
    }
  }

  /**
   * Handle 401 Unauthorized - redirect to login or home
   */
  const handle401 = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    message.warning('Session expired. Please log in again.')
    // Redirect to login if you have auth, otherwise home
    router.push('/')
  }

  /**
   * Handle 403 Forbidden
   */
  const handle403 = () => {
    message.error('You do not have permission to perform this action')
  }

  /**
   * Execute API call with automatic retry for transient errors
   */
  const withRetry = async (apiCall, options = {}) => {
    const { maxRetries = RETRY_CONFIG.MAX_RETRIES, onRetry } = options
    let lastError

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await apiCall()
      } catch (error) {
        lastError = error
        const status = error.response?.status

        // Don't retry client errors (4xx except 408)
        if (status && status >= 400 && status < 500 && status !== 408) {
          throw error
        }

        // Don't retry if no more attempts
        if (attempt === maxRetries - 1) {
          throw error
        }

        // Wait before retry (exponential backoff)
        const delay = RETRY_CONFIG.DELAYS[attempt] || RETRY_CONFIG.DELAYS[RETRY_CONFIG.DELAYS.length - 1]
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay))
        }

        if (onRetry) {
          onRetry(attempt + 1, maxRetries)
        }

        logger.info('Retrying API call', { attempt: attempt + 1, maxRetries })
      }
    }

    throw lastError
  }

  return {
    handleError,
    handle401,
    handle403,
    withRetry,
  }
}
