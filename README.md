# Template Web

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
- Security scanning (npm audit, Trivy, TruffleHog)

## Getting Started

### Prerequisites

- Node.js 22+
- npm 10+
- [Task](https://taskfile.dev/) (optional, for task runner)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GunarsK-templates/template-web.git
   cd template-web
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

```text
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

### Task Commands

Using [Task](https://taskfile.dev/) runner (recommended):

```bash
# Install dependencies
task install

# Start development server
task dev:start

# Build for production
task build

# Preview production build
task preview

# Lint (check only)
task lint

# Lint and auto-fix
task lint:fix

# Format code
task format

# Check code formatting
task format:check

# Run npm security audit
task security:audit

# Lint Markdown files
task lint:markdown

# Run all CI checks
task ci:all

# Build Docker image
task docker:build

# Run Docker container
task docker:run

# Clean build artifacts
task clean
```

### npm Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Lint (check only)
npm run lint:fix  # Lint and auto-fix
npm run format    # Format code
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

### Using Task

```bash
task docker:build
task docker:run
```

### Manual Commands

```bash
# Build
docker build \
  --build-arg VITE_API_URL=https://api.example.com \
  -t template-web:latest .

# Run
docker run -p 80:80 template-web:latest
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
