import type { ColorSchemeType, DesignEffects, Preferences } from '@/types'
import type { ColorItem } from '@/utils'
import { PREFERENCE_PRESETS } from '@/constants'
import { loadLanguageAsync } from '@/modules/i18n'

// @ts-expect-error: Transition API
const isAppearanceTransition = document.startViewTransition
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

const { system: preferredColorMode, store: storeColorSchema } = useColorMode({
  // https://paco.me/writing/disable-theme-transitions
  disableTransition: true,
})

export const preferences = storage.createReactiveStorage<Preferences>('preferences', PREFERENCE_PRESETS)

export const colorMode = computed(() => storeColorSchema.value === 'auto' ? preferredColorMode.value : storeColorSchema.value)
export const preferredDark = computed(() => preferredColorMode.value === 'dark')
export const isDark = computed(() => colorMode.value === 'dark')
export const themeColor = computed(() => preferences.value.themeColor)
export const radius = computed(() => preferences.value.radius)
export const isCompact = computed(() => preferences.value.compact)
export const lang = computed(() => preferences.value.lang)

export const designEffects = computed<DesignEffects>(() => {
  return {
    isDark: unref(isDark),
    isCompact: unref(isCompact),
    themeColor: unref(themeColor),
    radius: unref(radius),
  }
})

export function changeStoreColorSchema(auto?: boolean) {
  if (auto) {
    storeColorSchema.value = 'auto'
  }
  else {
    storeColorSchema.value = isDark.value ? 'light' : 'dark'
  }
  updatePreferences({ colorSchema: storeColorSchema.value })
}

export function toggleColorSchema(event: MouseEvent, mode: ColorSchemeType) {
  if (mode !== 'auto' && preferences.value.colorSchema === 'auto' && colorMode.value === mode) {
    updatePreferences({ colorSchema: mode })
    return
  }
  if (mode === 'auto' && colorMode.value === preferredColorMode.value) {
    updatePreferences({ colorSchema: mode })
    return
  }
  toggleDark(event, mode === 'auto')
}

/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
export function toggleDark(event?: MouseEvent, auto?: boolean) {
  if (!isAppearanceTransition || !event) {
    changeStoreColorSchema(auto)
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  const transition = document.startViewTransition(async () => {
    changeStoreColorSchema(auto)
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}

export async function updatePreferences(updates: Partial<Preferences>) {
  if (updates.colorSchema) {
    storeColorSchema.value = updates.colorSchema
  }

  if (updates.lang) {
    await loadLanguageAsync(updates.lang)
  }

  if (updates.themeColor) {
    if (preferences.value.themeColor) {
      document.body.classList.remove(`theme-${preferences.value.themeColor}`)
    }
    document.body.classList.add(`theme-${updates.themeColor}`)
    calculateCSSColorVariables()
  }

  if (typeof updates.radius === 'number') {
    document.body.style.setProperty('--radius', `${updates.radius}rem`)
  }

  preferences.value = { ...preferences.value, ...updates }
}

// https://www.shadcn-vue.com/docs/theming.html
export function calculateCSSColorVariables() {
  const colorItems: ColorItem[] = [
    { color: getColorVariable('--primary', true), name: 'primary' },
    { color: getColorVariable('--background', true), name: 'background' },
  ]

  updateColorVariables(colorItems)
}

export async function initPreferences() {
  await updatePreferences(preferences.value)
}
