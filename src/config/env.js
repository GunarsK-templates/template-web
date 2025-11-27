/**
 * Environment configuration with validation
 */

function validateEnv() {
  // Check for mock data mode (useful for development)
  const useMockData = import.meta.env.VITE_USE_MOCK_DATA === 'true'
  if (useMockData) {
    console.log('Using mock data - API validation skipped')
    return
  }

  const required = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
  }

  const missing = []
  for (const [key, value] of Object.entries(required)) {
    if (!value) {
      missing.push(key)
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.map((k) => `  - ${k}`).join('\n')}\n\n` +
        `Tip: Set VITE_USE_MOCK_DATA=true to use mock data instead.`
    )
  }
}

// Validate on module load
validateEnv()

export const env = {
  apiUrl: import.meta.env.VITE_API_URL || '',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
}
