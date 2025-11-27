<script setup>
import { useRouter } from 'vue-router'
import { NResult, NButton } from 'naive-ui'

const router = useRouter()

const goHome = () => router.push('/')
</script>

<template>
  <div class="not-found">
    <n-result
      status="404"
      title="404 - Page Not Found"
      description="The page you are looking for does not exist or has been moved."
    >
      <template #footer>
        <n-button type="primary" @click="goHome"> Go Home </n-button>
      </template>
    </n-result>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
}
</style>
