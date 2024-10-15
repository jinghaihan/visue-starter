import type { BuiltinRadiusType, BuiltinThemeType, ColorSchemeType, PageTransitionType, Preferences } from './types'

export const NAMESPACE = 'visue'

export const PREFERENCE_PRESETS: Preferences = {
  colorSchema: 'auto',
  themeColor: 'rose',
  radius: 0.5,
  compact: false,
  lang: 'en',
  pageTransition: 'fade',
}

export const COLOR_SCHEMA_PRESETS: { icon: string, type: ColorSchemeType }[] = [
  {
    icon: 'i-lucide-sun',
    type: 'light',
  },
  {
    icon: 'i-lucide-moon',
    type: 'dark',
  },
  {
    icon: 'i-lucide-sun-moon',
    type: 'auto',
  },
]

export const BUILTIN_THEME_COLOR_PRESETS: { color: string, type: BuiltinThemeType }[] = [
  {
    color: 'rgb(113,113,122)',
    type: 'zinc',
  },
  {
    color: 'rgb(244,63,94)',
    type: 'rose',
  },
  {
    color: 'rgb(59,130,246)',
    type: 'blue',
  },
  {
    color: 'rgb(34,197,94)',
    type: 'green',
  },
  {
    color: 'rgb(249,115,22)',
    type: 'orange',
  },
  {
    color: 'rgb(239,68,68)',
    type: 'red',
  },
  {
    color: 'rgb(100,116,139)',
    type: 'slate',
  },
  {
    color: 'rgb(120,113,108)',
    type: 'stone',
  },
  {
    color: 'rgb(107,114,128)',
    type: 'gray',
  },
  {
    color: 'rgb(115,115,115)',
    type: 'neutral',
  },
  {
    color: 'rgb(234,179,8)',
    type: 'yellow',
  },
  {
    color: 'rgb(139,92,246)',
    type: 'violet',
  },
]

export const RADII_PRESETS: BuiltinRadiusType[] = [0, 0.3, 0.5, 0.75, 1]

export const SUPPORT_LANGUAGE_PRESETS = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en',
  },
]

export const PAGE_TRANSITION_PRESETS: PageTransitionType[] = ['fade', 'fade-slide', 'fade-up', 'fade-down']
