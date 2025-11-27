<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const props = defineProps({
  code: {
    type: String,
    default: '500',
  },
})

const router = useRouter()

const errorConfig = computed(() => {
  const configs = {
    400: {
      status: 'error',
      title: 'Bad Request',
      description: 'The request could not be understood by the server.',
    },
    401: {
      status: 'warning',
      title: 'Unauthorized',
      description: 'You need to be logged in to access this page.',
    },
    403: {
      status: 'warning',
      title: 'Forbidden',
      description: 'You do not have permission to access this page.',
    },
    404: {
      status: 'info',
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    },
    500: {
      status: 'error',
      title: 'Server Error',
      description: 'Something went wrong on our end. Please try again later.',
    },
  }

  return configs[props.code] || configs['500']
})

const goHome = () => router.push('/')
const goBack = () => router.back()
</script>

<template>
  <div class="error-page">
    <n-result
      :status="errorConfig.status"
      :title="`${code} - ${errorConfig.title}`"
      :description="errorConfig.description"
    >
      <template #footer>
        <n-button style="margin-right: 8px" @click="goBack"> Go Back </n-button>
        <n-button type="primary" @click="goHome"> Go Home </n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
</style>
