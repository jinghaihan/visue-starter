import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
} from 'unocss'
import presetAnimations from 'unocss-preset-animations'
import { presetRadix } from 'unocss-preset-radix'
import { builtinColors, presetShadcn } from 'unocss-preset-shadcn'

export default defineConfig({
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-col-center': 'flex flex-col items-center justify-center',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.3,
    }),
    presetTypography({
      selectorName: 'markdown',
    }),
    presetAnimations(),
    // https://github.com/endigma/unocss-preset-radix
    presetRadix({
      // https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette#choosing-a-brand-scale
      palette: ['green', 'red', 'blue', 'yellow'],
      // https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale
      aliases: {
        success: 'green',
        error: 'red',
        info: 'blue',
        warning: 'yellow',
      },
      darkSelector: '.dark',
      lightSelector: '.light',
      extend: true,
    }),
    // https://github.com/hyoban/unocss-preset-shadcn
    presetShadcn(builtinColors.map(c => ({ color: c }))),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
  ],
  content: {
    pipeline: {
      include: [
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        '(components|src)/**/*.{js,ts}',
      ],
    },
  },
})
