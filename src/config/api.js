/**
 * API configuration constants
 */

export const API_TIMEOUTS = {
  DEFAULT: 30000, // 30 seconds
  UPLOAD: 120000, // 2 minutes for file uploads
  LONG: 60000, // 1 minute for complex operations
}

export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  DELAYS: [0, 2000, 5000], // Exponential backoff: immediate, 2s, 5s
}
