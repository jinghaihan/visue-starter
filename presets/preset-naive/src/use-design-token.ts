import type { CustomThemeCommonVars, ThemeCommonVars } from 'naive-ui'
import type { MaybeRefOrGetter } from 'vue'
import { TinyColor } from '@ctrl/tinycolor'
import { nextTick, reactive, watch } from 'vue'

export interface UseDesignTokenOptions<T> {
  designEffects?: MaybeRefOrGetter<T>
}

export function useDesignToken<T>(options?: UseDesignTokenOptions<T>) {
  const rootStyles = getComputedStyle(document.body)

  const convertToRgb = (str: string): string => {
    return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString()
  }

  const getCssVariableValue = (
    variable: string,
    options: { isColor?: boolean, isHslColor?: boolean } = { isColor: true, isHslColor: true },
  ) => {
    const { isColor = true, isHslColor = true } = options
    const value = rootStyles.getPropertyValue(variable)
    return isColor && isHslColor ? convertToRgb(`hsl(${value})`) : value
  }

  const token = reactive<Partial<ThemeCommonVars & CustomThemeCommonVars>>({
    bodyColor: '',
    invertedColor: '',
    borderColor: '',
    borderRadius: '',
    dividerColor: '',
    textColorBase: '',
    baseColor: '',
    modalColor: '',
    popoverColor: '',
    tableColor: '',
    cardColor: '',
    primaryColor: '',
    primaryColorHover: '',
    primaryColorPressed: '',
    primaryColorSuppl: '',
    successColor: '',
    successColorHover: '',
    successColorPressed: '',
    successColorSuppl: '',
    errorColor: '',
    errorColorHover: '',
    errorColorPressed: '',
    errorColorSuppl: '',
    infoColor: '',
    infoColorHover: '',
    infoColorPressed: '',
    infoColorSuppl: '',
    warningColor: '',
    warningColorHover: '',
    warningColorPressed: '',
    warningColorSuppl: '',
  })

  watch(
    () => options?.designEffects,
    () => {
      nextTick(() => {
        token.bodyColor = getCssVariableValue('--background')
        token.invertedColor = getCssVariableValue('--background-800')
        token.dividerColor = token.borderColor = getCssVariableValue('--border')
        token.borderRadius = getCssVariableValue('--radius', { isColor: false })
        token.textColorBase = getCssVariableValue('--foreground')
        token.baseColor = getCssVariableValue('--primary-foreground')
        token.modalColor = token.popoverColor = getCssVariableValue('--popover')
        token.tableColor = token.cardColor = getCssVariableValue('--card')

        token.primaryColor = getCssVariableValue('--primary')
        token.primaryColorHover = getCssVariableValue('--primary-600')
        token.primaryColorPressed = getCssVariableValue('--primary-700')
        token.primaryColorSuppl = getCssVariableValue('--primary-800')

        token.successColor = getCssVariableValue('--un-preset-radix-green9', { isHslColor: false })
        token.successColorHover = getCssVariableValue('--un-preset-radix-green4', { isHslColor: false })
        token.successColorPressed = getCssVariableValue('--un-preset-radix-green5', { isHslColor: false })
        token.successColorSuppl = getCssVariableValue('--un-preset-radix-green3', { isHslColor: false })

        token.errorColor = getCssVariableValue('--un-preset-radix-red9', { isHslColor: false })
        token.errorColorHover = getCssVariableValue('--un-preset-radix-red4', { isHslColor: false })
        token.errorColorPressed = getCssVariableValue('--un-preset-radix-red5', { isHslColor: false })
        token.errorColorSuppl = getCssVariableValue('--un-preset-radix-red3', { isHslColor: false })

        token.infoColor = getCssVariableValue('--un-preset-radix-blue9', { isHslColor: false })
        token.infoColorHover = getCssVariableValue('--un-preset-radix-blue4', { isHslColor: false })
        token.infoColorPressed = getCssVariableValue('--un-preset-radix-blue5', { isHslColor: false })
        token.infoColorSuppl = getCssVariableValue('--un-preset-radix-blue3', { isHslColor: false })

        token.warningColor = getCssVariableValue('--un-preset-radix-yellow9', { isHslColor: false })
        token.warningColorHover = getCssVariableValue('--un-preset-radix-yellow4', { isHslColor: false })
        token.warningColorPressed = getCssVariableValue('--un-preset-radix-yellow5', { isHslColor: false })
        token.warningColorSuppl = getCssVariableValue('--un-preset-radix-yellow3', { isHslColor: false })
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
