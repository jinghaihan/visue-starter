import type { ConfigProviderProps } from 'ant-design-vue'
import type { Locale } from 'ant-design-vue/es/locale'
import type { MaybeRefOrGetter } from 'vue'
import type { DesignEffects } from './types'
import type { UseDesignTokenOptions } from './use-design-token'
import type { UseThemeAlgorithmOptions } from './use-theme-algorithm'

import { useStyleProvider } from 'ant-design-vue'
import EN from 'ant-design-vue/es/locale/en_US'
import { computed, ref, unref, watch } from 'vue'
import { useDesignToken } from './use-design-token'
import { useThemeAlgorithm } from './use-theme-algorithm'

export interface UseConfigProviderOptions<
  T extends DesignEffects = any,
> extends UseThemeAlgorithmOptions<T>, UseDesignTokenOptions<T> {
  lang?: MaybeRefOrGetter<string>
}

export function useConfigProvider<T extends DesignEffects>(options?: UseConfigProviderOptions<T>) {
  const { lang = 'en', designEffects } = options || {}

  const locale = ref<Locale>()
  const { algorithm } = useThemeAlgorithm<T>({
    designEffects,
  })
  const { token } = useDesignToken<T>({
    designEffects,
  })

  const theme = computed(() => {
    return {
      algorithm: unref(algorithm),
      token,
    }
  })

  const props = computed((): ConfigProviderProps => {
    return {
      theme: unref(theme),
      locale: unref(locale),
    }
  })

  useStyleProvider({
    hashPriority: 'high',
  })

  watch(
    () => unref(lang),
    async (_lang) => {
      switch (_lang) {
        case 'en':
          locale.value = EN
          break
        case 'zh-CN':
          locale.value = (await import('ant-design-vue/es/locale/zh_CN')).default
          break
        default:
          locale.value = EN
          break
      }
    },
    {
      immediate: true,
    },
  )

  return {
    props,
    theme,
    locale,
  }
}
