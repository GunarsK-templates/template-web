<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import {
  NConfigProvider,
  NNotificationProvider,
  NMessageProvider,
  NDialogProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NSpace,
  NButton,
  NGlobalStyle,
  darkTheme,
} from 'naive-ui'
import { useTheme, THEMES } from '@/composables/useTheme'

const { theme, toggleTheme, getThemeConfig } = useTheme()

const currentTheme = computed(() => (theme.value === THEMES.DARK ? darkTheme : null))

// Navigation items - customize for your app
const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
]
</script>

<template>
  <n-config-provider
    :theme="currentTheme"
    :theme-overrides="getThemeConfig()"
  >
    <n-notification-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-global-style />
          <n-layout class="app-layout">
            <!-- Header -->
            <n-layout-header
              bordered
              class="app-header"
            >
              <div class="header-content">
                <!-- Logo/Brand -->
                <RouterLink
                  to="/"
                  class="brand"
                >
                  Your App
                </RouterLink>

                <!-- Navigation -->
                <nav class="nav-links">
                  <n-space>
                    <RouterLink
                      v-for="item in navItems"
                      :key="item.to"
                      :to="item.to"
                      class="nav-link"
                    >
                      {{ item.label }}
                    </RouterLink>
                  </n-space>
                </nav>

                <!-- Actions -->
                <div class="header-actions">
                  <n-button
                    quaternary
                    circle
                    @click="toggleTheme"
                  >
                    {{ theme === THEMES.DARK ? '☀️' : '🌙' }}
                  </n-button>
                </div>
              </div>
            </n-layout-header>

            <!-- Main Content -->
            <n-layout-content class="app-content">
              <RouterView />
            </n-layout-content>

            <!-- Footer -->
            <n-layout-footer
              bordered
              class="app-footer"
            >
              <p>&copy; {{ new Date().getFullYear() }} Your App. All rights reserved.</p>
            </n-layout-footer>
          </n-layout>
        </n-dialog-provider>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-header {
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  color: inherit;
}

.nav-links {
  display: flex;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: inherit;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover {
  background-color: rgba(128, 128, 128, 0.1);
}

.nav-link.router-link-active {
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.app-content {
  padding: 24px;
  min-height: calc(100vh - 64px - 60px);
}

.app-footer {
  padding: 16px 24px;
  text-align: center;
}
</style>
