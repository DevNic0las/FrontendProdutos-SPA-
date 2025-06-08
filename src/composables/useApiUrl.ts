import { getCurrentInstance } from 'vue'

export const useApiBaseUrl = (): string => {
  const instance = getCurrentInstance()
  return instance?.appContext.config.globalProperties.$apiBaseUrl ?? ''
}