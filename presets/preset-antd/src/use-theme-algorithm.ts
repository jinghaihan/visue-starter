import type { MaybeRefOrGetter, Ref } from 'vue'
import type { DesignEffects } from './types'
import { useDark } from '@vueuse/core'
import { theme } from 'ant-design-vue'
import { computed, ref, unref } from 'vue'

export interface UseThemeAlgorithmOptions<T> {
  designEffects?: MaybeRefOrGetter<T>
}

export function useThemeAlgorithm<T extends DesignEffects>(options?: UseThemeAlgorithmOptions<T>) {
  const { designEffects } = options || {}
  const effects = ref(typeof designEffects === 'function' ? (designEffects as () => T)() : designEffects) as Ref<T>
  const isCompact = computed(() => unref(effects)?.isCompact ?? false)
  const _isDark = useDark()
  const isDark = computed(() => unref(effects)?.isDark ?? _isDark.value)

  const algorithm = computed(() => {
    const algorithm = isCompact.value ? [theme.compactAlgorithm] : []
    return isDark.value
      ? [...algorithm, theme.darkAlgorithm]
      : [...algorithm, theme.defaultAlgorithm]
  })

  return {
    algorithm,
  }
}
