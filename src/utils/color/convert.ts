import { TinyColor } from '@ctrl/tinycolor'

export function convertToHsl(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl()
  const hsl = `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`
  return a < 1 ? `${hsl} ${a}` : hsl
}

export function convertToHslCssVar(color: string): string {
  const { a, h, l, s } = new TinyColor(color).toHsl()
  const hsl = `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`
  return a < 1 ? `${hsl} / ${a}` : hsl
}

export function convertToRgbColor(str: string): string {
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toRgbString()
}

export function converToHexColor(str: string): string {
  return new TinyColor(str.replaceAll(/deg|grad|rad|turn/g, '')).toHexString()
}

export function isValidColor(color?: string) {
  if (!color) {
    return false
  }
  return new TinyColor(color).isValid
}
