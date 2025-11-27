<script setup>
import { ref, onMounted } from 'vue'
import { NCard, NSpace, NSpin, NEmpty, NButton } from 'naive-ui'
import { apiService } from '@/services/api'
import { useErrorHandler } from '@/composables/useErrorHandler'

const { handleError, withRetry } = useErrorHandler()

const items = ref([])
const loading = ref(true)
const error = ref(null)

const fetchItems = async () => {
  loading.value = true
  error.value = null

  try {
    const response = await withRetry(() => apiService.items.getAll())
    items.value = response.data
  } catch (err) {
    error.value = err
    handleError(err, { context: 'fetchItems' })
  } finally {
    loading.value = false
  }
}

onMounted(fetchItems)
</script>

<template>
  <div class="home-view">
    <h1>Welcome to Your App</h1>
    <p class="subtitle">This is a Vue 3 template with best practices.</p>

    <n-card title="Items" class="items-card">
      <template #header-extra>
        <n-button size="small" @click="fetchItems" :loading="loading">
          Refresh
        </n-button>
      </template>

      <n-spin :show="loading">
        <n-empty v-if="!loading && items.length === 0" description="No items found" />

        <n-space v-else vertical>
          <n-card v-for="item in items" :key="item.id" size="small">
            <h3>{{ item.name }}</h3>
            <p v-if="item.description">{{ item.description }}</p>
          </n-card>
        </n-space>
      </n-spin>
    </n-card>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 800px;
  margin: 0 auto;
}

.subtitle {
  color: var(--text-color-secondary);
  margin-bottom: 24px;
}

.items-card {
  margin-top: 24px;
}
</style>
