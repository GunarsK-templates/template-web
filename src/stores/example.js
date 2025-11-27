import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * Example Pinia store demonstrating patterns
 */
export const useExampleStore = defineStore('example', () => {
  // State
  const items = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const itemCount = computed(() => items.value.length)
  const hasItems = computed(() => items.value.length > 0)

  // Actions
  const setItems = (newItems) => {
    items.value = newItems
  }

  const addItem = (item) => {
    items.value.push(item)
  }

  const removeItem = (id) => {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const setLoading = (value) => {
    loading.value = value
  }

  const setError = (err) => {
    error.value = err
  }

  const reset = () => {
    items.value = []
    loading.value = false
    error.value = null
  }

  return {
    // State
    items,
    loading,
    error,
    // Getters
    itemCount,
    hasItems,
    // Actions
    setItems,
    addItem,
    removeItem,
    setLoading,
    setError,
    reset,
  }
})
