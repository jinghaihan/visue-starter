import type { builtinColors, builtinRadiuses } from 'unocss-preset-shadcn'

export type ColorSchemeType = 'auto' | 'light' | 'dark'
export type BuiltinThemeType = typeof builtinColors[number]
export type BuiltinRadiusType = typeof builtinRadiuses[number]
export type SupportI18nType = 'zh-CN' | 'en'
export type PageTransitionType = 'fade' | 'fade-slide' | 'fade-up' | 'fade-down'

export interface Preferences {
  colorSchema: ColorSchemeType
  themeColor: typeof builtinColors[number]
  radius: typeof builtinRadiuses[number]
  compact: boolean
  lang: SupportI18nType
  pageTransition: PageTransitionType
}

export interface DesignEffects {
  isDark: boolean
  isCompact: boolean
  themeColor: BuiltinThemeType
  radius: BuiltinRadiusType
}
