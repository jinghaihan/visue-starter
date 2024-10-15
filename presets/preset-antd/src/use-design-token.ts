import type { AliasToken } from 'ant-design-vue/es/theme/interface'
import type { MaybeRefOrGetter } from 'vue'
import { nextTick, reactive, watch } from 'vue'

export interface UseDesignTokenOptions<T> {
  designEffects?: MaybeRefOrGetter<T>
}

export function useDesignToken<T>(options?: UseDesignTokenOptions<T>) {
  const rootStyles = getComputedStyle(document.body)

  const getCssVariableValue = (
    variable: string,
    options: { isColor?: boolean, isHslColor?: boolean } = { isColor: true, isHslColor: true },
  ) => {
    const { isColor = true, isHslColor = true } = options
    const value = rootStyles.getPropertyValue(variable)
    return isColor && isHslColor ? `hsl(${value})` : value
  }

  const token = reactive<Partial<AliasToken>>({
    borderRadius: 0,
    colorBgBase: '',
    colorBgContainer: '',
    colorBgElevated: '',
    colorBgLayout: '',
    colorBgMask: '',
    colorBorder: '',
    colorBorderSecondary: '',
    colorTextBase: '',
    colorPrimary: '',
    colorSuccess: '',
    colorError: '',
    colorInfo: '',
    colorWarning: '',
  })

  watch(
    () => options?.designEffects,
    () => {
      nextTick(() => {
        const radius = Number.parseFloat(getCssVariableValue('--radius', { isColor: false }))
        // 1rem = 16px
        token.borderRadius = radius * 16

        token.colorBgBase = getCssVariableValue('--background')

        token.colorBgContainer = getCssVariableValue('--card')

        token.colorBgElevated = getCssVariableValue('--popover')

        token.colorBgLayout = getCssVariableValue('--background-800')

        token.colorBgMask = getCssVariableValue('--overlay')

        token.colorBorder = token.colorBorderSecondary = getCssVariableValue('--border')

        token.colorTextBase = getCssVariableValue('--foreground')

        token.colorPrimary = getCssVariableValue('--primary')

        token.colorSuccess = getCssVariableValue('--un-preset-radix-green9', { isHslColor: false })

        token.colorError = getCssVariableValue('--un-preset-radix-red9', { isHslColor: false })

        token.colorInfo = getCssVariableValue('--un-preset-radix-blue9', { isHslColor: false })

        token.colorWarning = getCssVariableValue('--un-preset-radix-yellow9', { isHslColor: false })
      })
    },
    {
      immediate: true,
      deep: true,
    },
  )

  return {
    token,
  }
}
