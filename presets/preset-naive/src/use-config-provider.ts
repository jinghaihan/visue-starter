import type { ConfigProviderProps } from 'naive-ui'
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { DesignEffects } from './types'
import type { UseDesignTokenOptions } from './use-design-token'

import { useDark } from '@vueuse/core'
import { darkTheme, dateEnUS, dateZhCN, enUS, lightTheme, zhCN } from 'naive-ui'
import { computed, ref, unref } from 'vue'
import { useDesignToken } from './use-design-token'

export interface UseConfigProviderOptions<T extends DesignEffects = any> extends UseDesignTokenOptions<T> {
  lang?: MaybeRefOrGetter<string>
}

export function useConfigProvider<T extends DesignEffects>(options?: UseConfigProviderOptions<T>) {
  const { lang = 'en', designEffects } = options || {}

  const effects = ref(typeof designEffects === 'function' ? (designEffects as () => T)() : designEffects) as Ref<T>
  const _isDark = useDark()
  const isDark = computed(() => unref(effects)?.isDark ?? _isDark.value)

  const { token } = useDesignToken({
    designEffects: effects,
  })

  const props = computed((): ConfigProviderProps => {
    return {
      locale: unref(lang) === 'zh-CN' ? zhCN : enUS,
      dateLocale: unref(lang) === 'zh-CN' ? dateZhCN : dateEnUS,
      theme: isDark.value ? darkTheme : lightTheme,
      preflightStyleDisabled: true,
      themeOverrides: {
        common: token,
      },
    }
  })

  return {
    props,
  }
}
