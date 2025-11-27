<script setup>
import { NCard, NSpace, NTag } from 'naive-ui'

const features = [
  'Vue 3 with Composition API',
  'Naive UI component library',
  'Pinia state management',
  'Vue Router with lazy loading',
  'Axios for API calls',
  'Error handling with retry logic',
  'Theme support (light/dark)',
  'Pino structured logging',
  'Environment validation',
  'Docker support',
  'CI/CD with GitHub Actions',
]
</script>

<template>
  <div class="about-view">
    <h1>About This Template</h1>

    <n-card title="Features" class="features-card">
      <n-space wrap>
        <n-tag v-for="feature in features" :key="feature" type="success">
          {{ feature }}
        </n-tag>
      </n-space>
    </n-card>

    <n-card title="Getting Started" class="getting-started-card">
      <ol>
        <li>Clone the template</li>
        <li>Run <code>npm install</code></li>
        <li>Copy <code>.env.example</code> to <code>.env</code></li>
        <li>Configure your API URL</li>
        <li>Run <code>npm run dev</code></li>
      </ol>
    </n-card>

    <n-card title="Project Structure" class="structure-card">
      <pre><code>src/
├── components/     # Reusable UI components
├── composables/    # Vue composables (hooks)
├── config/         # Configuration files
├── errors/         # Error pages
├── router/         # Route definitions
├── services/       # API services
├── stores/         # Pinia stores
├── styles/         # Global styles
├── utils/          # Utility functions
└── views/          # Page components</code></pre>
    </n-card>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
}

.features-card,
.getting-started-card,
.structure-card {
  margin-top: 24px;
}

ol {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

code {
  background-color: rgba(128, 128, 128, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

pre {
  background-color: rgba(128, 128, 128, 0.1);
  padding: 16px;
  border-radius: 8px;
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
}
</style>
