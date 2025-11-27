import pino from 'pino'
import { env } from '@/config/env'

/**
 * Application logger using Pino
 */
const logger = pino({
  name: 'your-web-app',
  level: env.isDevelopment ? 'debug' : 'info',
  browser: {
    asObject: true,
  },
})

// Sanitize sensitive headers for logging
const sanitizeHeaders = (headers) => {
  if (!headers) return {}
  const sanitized = { ...headers }
  const sensitiveKeys = ['authorization', 'cookie', 'x-api-key']
  for (const key of sensitiveKeys) {
    if (sanitized[key]) {
      sanitized[key] = '[REDACTED]'
    }
  }
  return sanitized
}

export default {
  debug: (msg, data) => logger.debug(data, msg),
  info: (msg, data) => logger.info(data, msg),
  warn: (msg, data) => logger.warn(data, msg),
  error: (msg, data) => {
    // Sanitize any headers in error data
    if (data?.headers) {
      data = { ...data, headers: sanitizeHeaders(data.headers) }
    }
    logger.error(data, msg)
  },
}
