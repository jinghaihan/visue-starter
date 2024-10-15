import type { MaybeRefOrGetter } from 'vue'
import { nextTick, reactive, watch } from 'vue'

export interface UseDesignTokenOptions<T> {
  designEffects?: MaybeRefOrGetter<T>
}
export function useDesignToken<T>(options?: UseDesignTokenOptions<T>) {
  // const rootStyles = getComputedStyle(document.body)

  const themeVars = reactive({})

  watch(
    () => options?.designEffects,
    () => {
      nextTick(() => {

      })
    },
    {
      immediate: true,
      deep: true,
    },
  )

  return {
    themeVars,
  }
}
