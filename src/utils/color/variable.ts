import { NAMESPACE } from '@/constants'
import { getColors } from 'theme-colors'
import { converToHexColor, convertToHslCssVar, convertToRgbColor } from './convert'

export interface ColorItem {
  color: string
  name: string
  alias?: string
}

export function generatorColorVariables(colorItems: ColorItem[]) {
  const colorVariables: Record<string, string> = {}

  colorItems.forEach(({ color, name, alias }) => {
    const colorsMap = getColors(converToHexColor(color))

    let mainColor = colorsMap['500']

    const colorKeys = Object.keys(colorsMap)

    colorKeys.forEach((key) => {
      const colorValue = colorsMap[key]

      if (colorValue) {
        const hslColor = convertToHslCssVar(colorValue)
        colorVariables[`--${name}-${key}`] = hslColor
        if (alias) {
          colorVariables[`--${alias}-${key}`] = hslColor
        }

        if (key === '500') {
          mainColor = hslColor
        }
      }
    })
    if (alias && mainColor) {
      colorVariables[`--${alias}`] = mainColor
    }
  })

  return colorVariables
}

export function updateColorVariables(colorItems: ColorItem[]) {
  const colorVariables = generatorColorVariables(colorItems)

  const id = `__${NAMESPACE}-colors__`
  const styleElement = document.querySelector(`#${id}`) || document.createElement('style')

  let cssText = ':root {'
  for (const key in colorVariables) {
    if (Object.prototype.hasOwnProperty.call(colorVariables, key)) {
      cssText += `${key}: ${colorVariables[key]};`
    }
  }
  cssText += '}'

  styleElement.textContent = cssText

  if (!document.querySelector(`#${id}`)) {
    setTimeout(() => {
      document.head.append(styleElement)
    })
  }
}

export function getColorVariable(variable: string, isHslColor: boolean = false) {
  const roots = [document.documentElement, document.body]

  for (const element of roots) {
    const colorValue = getComputedStyle(element).getPropertyValue(variable)
    if (colorValue) {
      return isHslColor ? convertToRgbColor(`hsl(${colorValue})`) : colorValue
    }
  }

  return ''
}
