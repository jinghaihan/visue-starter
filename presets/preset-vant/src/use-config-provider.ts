import type { ConfigProviderProps } from 'vant'
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { DesignEffects } from './types'
import type { UseDesignTokenOptions } from './use-design-token'

import { useDark } from '@vueuse/core'
import { Locale } from 'vant'
import EN from 'vant/es/locale/lang/en-US'
import { computed, ref, unref, watch } from 'vue'
import { useDesignToken } from './use-design-token'

export interface UseConfigProviderOptions<
  T extends DesignEffects = any,
> extends UseDesignTokenOptions<T> {
  lang?: MaybeRefOrGetter<string>
}

export function useConfigProvider<T extends DesignEffects>(options?: UseConfigProviderOptions<T>) {
  const { lang = 'en', designEffects } = options || {}

  const effects = ref(typeof designEffects === 'function' ? (designEffects as () => T)() : designEffects) as Ref<T>
  const _isDark = useDark()
  const isDark = computed(() => unref(effects)?.isDark ?? _isDark.value)

  const { themeVars } = useDesignToken<T>({
    designEffects,
  })
  const props = computed((): Partial<ConfigProviderProps> => {
    return {
      theme: isDark.value ? 'dark' : 'light',
      themeVars,
    }
  })

  Locale.use('en-US', EN)

  watch(
    () => unref(lang),
    async (_lang) => {
      let locale
      switch (_lang) {
        case 'en':
          Locale.use('en-US', EN)
          break
        case 'zh-CN':
          locale = (await import('vant/es/locale/lang/zh-CN')).default
          Locale.use('en-US', locale)
          break
        default:
          Locale.use('en-US', EN)
          break
      }
    },
    {
      immediate: true,
    },
  )

  return {
    props,
  }
}
