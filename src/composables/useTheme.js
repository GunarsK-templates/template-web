import { ref, watch } from 'vue'

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

const STORAGE_KEY = 'app-theme'

/**
 * Theme management composable
 */
export function useTheme() {
  // Initialize from localStorage or system preference
  const getInitialTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && Object.values(THEMES).includes(stored)) {
      return stored
    }
    // Check system preference
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK
    }
    return THEMES.LIGHT
  }

  const theme = ref(getInitialTheme())

  // Persist theme changes
  watch(theme, (newTheme) => {
    localStorage.setItem(STORAGE_KEY, newTheme)
    // Update document class for global CSS
    document.documentElement.classList.toggle('dark', newTheme === THEMES.DARK)
  }, { immediate: true })

  const toggleTheme = () => {
    theme.value = theme.value === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT
  }

  const setTheme = (newTheme) => {
    if (Object.values(THEMES).includes(newTheme)) {
      theme.value = newTheme
    }
  }

  const isDark = () => theme.value === THEMES.DARK

  // Naive UI theme config overrides
  const getThemeConfig = () => ({
    common: {
      primaryColor: '#18a058',
      primaryColorHover: '#36ad6a',
      primaryColorPressed: '#0c7a43',
    },
  })

  return {
    theme,
    toggleTheme,
    setTheme,
    isDark,
    getThemeConfig,
    THEMES,
  }
}
