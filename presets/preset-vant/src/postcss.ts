import type { Options } from 'postcss-mobile-forever'
import Viewport from 'postcss-mobile-forever'

export const POSTCSS_MOBILE_FOREVER_OPTIONS_PRESET: Options = {
  appSelector: '#app',
  viewportWidth: 375,
  maxDisplayWidth: 600,
  rootContainingBlockSelectorList: [
    'van-tabbar',
    'van-popup',
  ],
  border: true,
}

export function PostcssViewport(options?: Options) {
  return Viewport({
    ...POSTCSS_MOBILE_FOREVER_OPTIONS_PRESET,
    ...options,
  })
}
