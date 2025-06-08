import type { App } from 'vue'

export default {
  install(app: App) {
    const baseUrl = import.meta.env.VITE_BASE_URL
    app.config.globalProperties.$apiBaseUrl = baseUrl
  }
}