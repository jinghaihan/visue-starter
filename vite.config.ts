import path from 'node:path'
import VueI18n from '@intlify/unplugin-vue-i18n/vite'
import Shiki from '@shikijs/markdown-it'
import { unheadVueComposablesImports } from '@unhead/vue'
import { AntDesignVueResolver } from '@visue/preset-antd/resolver'
import Vue from '@vitejs/plugin-vue'
import LinkAttributes from 'markdown-it-link-attributes'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,
    port: 3000,
  },

  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, 'src')}/`,
    },
  },

  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      extensions: ['.vue', '.md'],
      dts: 'src/typings/typed-router.d.ts',
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-i18n',
        '@vueuse/core',
        unheadVueComposablesImports,
        VueRouterAutoImports,
        {
          'vue-router/auto': ['useLink'],
          'lodash-es': [
            'cloneDeep',
            'debounce',
            'isEqual',
            'once',
            'throttle',
            'chunk',
            'difference',
            'orderBy',
            'uniq',
            'merge',
            'omit',
            'pick',
            'camelCase',
            'kebabCase',
            'snakeCase',
            'upperFirst',
          ],
        },
      ],
      dts: 'src/typings/auto-imports.d.ts',
      dirs: [
        'src/composables',
        'src/stores',
        'src/utils',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/typings/components.d.ts',
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),

    // https://github.com/antfu/unocss
    // see uno.config.ts for config
    Unocss(),

    // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      include: [path.resolve(__dirname, 'i18n/**')],
    }),

    // https://github.com/unplugin/unplugin-vue-markdown
    Markdown({
      wrapperClasses: 'markdown',
      headEnabled: true,
      async markdownItSetup(md) {
        md.use(LinkAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener',
          },
        })
        md.use(await Shiki({
          defaultColor: false,
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
        }))
      },
    }),

    // https://github.com/vitejs/vite-plugin-vue
    Vue({
      include: [/\.vue$/, /\.md$/],
    }),
  ],

  // https://github.com/vitest-dev/vitest
  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
  },
})
