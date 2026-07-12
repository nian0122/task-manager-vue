import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // Guard for SSR environments (Nuxt, etc.)
  const isClient = typeof window !== 'undefined'

  let initiaValue: T = defaultValue
  if (isClient) {
    const storedValue = localStorage.getItem(key)
    try {
      initiaValue = storedValue !== null ? JSON.parse(storedValue) : defaultValue
    } catch {
      initiaValue = defaultValue
    }
  }

  const state = ref<T>(initiaValue) as Ref<T>

  if (isClient) {
    watch(
      state,
      (newValue) => {
        try {
          localStorage.setItem(key , JSON.stringify(newValue))
        } catch (error) {
          console.warn(`Failed to persist "${key}" to localStorage:`, error)
        }
      },
      { deep: true }
    )
  }

  return state
}
