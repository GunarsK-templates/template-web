# Your Web App

A Vue 3 web application template with best practices.

## Features

- Vue 3 with Composition API
- Naive UI component library
- Pinia state management
- Vue Router with lazy loading
- Axios for API calls with retry logic
- Centralized error handling
- Theme support (light/dark)
- Pino structured logging
- Environment validation
- Docker support with nginx
- CI/CD with GitHub Actions
- Security scanning (npm audit, Trivy)

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-org/your-web-app.git
cd your-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Edit `.env` with your configuration

5. Start development server:
```bash
npm run dev
```

### Configuration

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | Yes (unless using mock) |
| `VITE_USE_MOCK_DATA` | Use mock data instead of API | No (default: false) |

## Project Structure

```
src/
├── components/
│   └── shared/          # Reusable UI components
├── composables/
│   ├── useTheme.js      # Theme management
│   └── useErrorHandler.js # Error handling
├── config/
│   ├── api.js           # API configuration
│   └── env.js           # Environment validation
├── constants/           # Shared constants
├── errors/              # Error pages
├── router/              # Route definitions
├── services/
│   └── api.js           # API client
├── stores/              # Pinia stores
├── styles/              # Global styles
├── utils/
│   └── logger.js        # Logging utility
├── views/               # Page components
├── App.vue              # Root component
└── main.js              # Entry point
```

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format
```

### Adding a New Page

1. Create a view component in `src/views/`:
```vue
<script setup>
// Component logic
</script>

<template>
  <!-- Component template -->
</template>
```

2. Add route in `src/router/index.js`:
```javascript
{
  path: '/new-page',
  name: 'NewPage',
  component: () => import('@/views/NewPage.vue'),
  meta: { title: 'New Page' },
}
```

### Using the API Service

```javascript
import { apiService } from '@/services/api'
import { useErrorHandler } from '@/composables/useErrorHandler'

const { handleError, withRetry } = useErrorHandler()

// Simple API call
try {
  const response = await apiService.items.getAll()
  // handle response
} catch (error) {
  handleError(error)
}

// API call with automatic retry
try {
  const response = await withRetry(() => apiService.items.getAll())
  // handle response
} catch (error) {
  handleError(error)
}
```

### Using Pinia Store

```javascript
import { useExampleStore } from '@/stores/example'

const store = useExampleStore()

// Read state
console.log(store.items)
console.log(store.itemCount)

// Update state
store.addItem({ id: 1, name: 'New Item' })
store.removeItem(1)
```

## Docker

### Build

```bash
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t your-web-app:latest .
```

### Run

```bash
docker run -p 80:80 your-web-app:latest
```

## Customization

### Changing Theme Colors

Edit `src/composables/useTheme.js`:
```javascript
const getThemeConfig = () => ({
  common: {
    primaryColor: '#your-color',
    primaryColorHover: '#your-hover-color',
    primaryColorPressed: '#your-pressed-color',
  },
})
```

### Adding Authentication

1. Create auth store in `src/stores/auth.js`
2. Add auth guards in `src/router/index.js`
3. Update API interceptors in `src/services/api.js`
4. See `admin-web` template for full auth implementation

## License

MIT
