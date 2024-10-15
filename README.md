<p align='center'>
  <img src='https://github.com/jinghaihan/visue-starter/blob/master/static/banner.png' alt='Visue Starter - Opinionated Vite Starter Template' width='900'/>
</p>

<p align='center'>
  Opinionated Vite starter template, Inspired by <b>Vitesse</b><sup><em>(❤)</em></sup><br>
</p>

<br>

<p align='center'>
  <a href="https://visue-starter.netlify.app/">Live Demo</a>
</p>
<br>

> **Note**: The purpose of writing this project is to be able to quickly put it into actual development. This project is based on the best practices I am used to, and it may not suit everyone's preferences.
>
> Provides preset adaptation of mainstream UI libraries, hoping to reduce the complexity of your project construction.

<br>

## Features

- ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [esbuild](https://github.com/evanw/esbuild) - born with fastness

- 🗂 [File based routing](https://github.com/posva/unplugin-vue-router)

- 📦 [Components auto importing](https://github.com/unplugin/unplugin-vue-components)

- 🍍 [State Management via Pinia](https://pinia.vuejs.org/)
- 🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine

+ 😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

- 🌍 [I18n ready](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n)

- 🗒 [Markdown Support](https://github.com/unplugin/unplugin-vue-markdown)

- 🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)

- 📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly

- 🦾 TypeScript, of course

- ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest)

- 🪶 [Shadcn/ui](https://github.com/unovue/shadcn-vue) - accessible and customizable components
- 📑 Adaptation of commonly used component libraries

- 🌓 Dark Mode Support - dynamically changeable theme colors

- ☁️ Deploy on Netlify, zero-config

<br>

## Pre-packed

### UI Frameworks

- [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.
  - [`unocss-preset-shadcn`](https://github.com/hyoban/unocss-preset-shadcn) -  Use [shadcn/ui](https://ui.shadcn.com/) or [shadcn-vue](https://shadcn-vue.com/) or [shadcn-svelte](https://www.shadcn-svelte.com/) or [SolidUI](https://www.solid-ui.com/) with [UnoCSS](https://unocss.dev/).
  - [`unocss-preset-radix`](https://github.com/endigma/unocss-preset-radix) -  A preset for UnoCSS to let you use Radix color palette

- [Shadcn/ui](https://github.com/unovue/shadcn-vue) - Accessible and customizable components that you can copy and paste into your apps.

- `UI Libraries Presets` - Make the UI library adapt to shadcn's design token.

  - [Ant Design Vue](https://github.com/vueComponent/ant-design-vue) - An enterprise-class UI components based on Ant Design and Vue.
  - [Naive UI](https://github.com/tusen-ai/naive-ui) - Fairly Complete, Theme Customizable, Uses TypeScript, Fast.

  + [Vant](https://github.com/youzan/vant) - A lightweight, customizable Vue UI library for mobile web apps.

<br>

> You can import the corresponding UI library presets from presets to adapt the style and theme of shadcn/ui.

+ package.json

```json
{
  "dependencies": {
    "@visue/preset-antd": "workspace:*"
  }
}
```

+ vite.config.ts - some presets also provide vite plugins, please configure them at the same time.

```typescript
import { AntDesignVueResolver } from '@visue/preset-antd/resolver'
// import { ViteVConsole } from '@visue/preset-vant/vite'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),

    // ViteVConsole({ ... })
  ]
})
```

+ postcss.config.mjs - Vant is adapted through [postcss-mobile-forever](https://github.com/wswmsword/postcss-mobile-forever), please make sure it is configured.

```javascript
import { PostcssViewport } from '@visue/preset-vant/postcss'

export default {
  plugins: {
    ...PostcssViewport({}),
    'autoprefixer': {},
    'postcss-nested': {},
  },
}
```

+ App.vue

```vue
<script lang="ts" setup>
import { ConfigProvider } from '@visue/preset-antd'
import { NAMESPACE } from './constants'
</script>

<template>
  <ConfigProvider :lang="lang" :design-effects="designEffects">
    ...
  </ConfigProvider>
</template>
```

<br>

### Icons

- [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
- [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

- [Vue Router](https://github.com/vuejs/router)
  - [`unplugin-vue-router`](https://github.com/posva/unplugin-vue-router) - file system based routing
- [Pinia](https://pinia.vuejs.org) - Intuitive, type safe, light and flexible Store for Vue using the composition api
  - [`pinia-plugin-persistedstate`](https://github.com/prazdevs/pinia-plugin-persistedstate) -  Configurable persistence and rehydration of Pinia stores

- [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
- [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing

- [`unplugin-vue-markdown`](https://github.com/unplugin/unplugin-vue-markdown) - Markdown as components / components in Markdown
  - [`@shikijs/markdown-it`](https://github.com/shikijs/shiki) - [Shiki](https://github.com/shikijs/shiki) for syntax highlighting
- [Vue I18n](https://github.com/intlify/vue-i18n-next) - Internationalization
  - [`unplugin-vue-i18n`](https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n) - unplugin for Vue I18n

- [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs

- [@unhead/vue](https://github.com/unjs/unhead) - manipulate document head reactively

### Coding Style

- Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
- [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi

### Dev tools

- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
- [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
- [Netlify](https://www.netlify.com/) - zero-config deployment
- [VS Code Extensions](./.vscode/extensions.json)
  - [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
  - [UnoCSS](https://marketplace.visualstudio.com/items?itemName=antfu.unocss) - Decoration and tooltip for matched utilities
  - [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
  - [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Try it now!

> Visue Starter requires Node >=18

### GitHub Template

[Create a repo from this template on GitHub](https://github.com/jinghaihan/visue-starter/generate).

### Clone to local

If you prefer to do it manually with the cleaner git history

```bash
npx degit jinghaihan/visue-starter my-visue-app
cd my-visue-app
pnpm i # If you don't have pnpm installed, run: npm install -g pnpm
```

## Checklist

When you use this template, try follow the checklist to update your info properly

- [ ] Change the author name in `LICENSE`
- [ ] Change the title in `index.html`
- [ ] Change the hostname in `vite.config.ts`
- [ ] Change the favicon in `public`
- [ ] Clean up the READMEs and remove routes

And, enjoy :)

### Development

Just run and visit <http://localhost:3000>

```bash
pnpm dev
```

### Build

To build the App, run

```bash
pnpm build
```

And you will see the generated file in `dist` that ready to be served.

### Deploy on Netlify

Go to [Netlify](https://app.netlify.com/start) and select your clone, `OK` along the way, and your App will be live in a minute.

### Docker Production Build

First, build the visue-app image by opening the terminal in the project's root directory.

```bash
docker buildx build . -t visue-app:latest
```

Run the image and specify port mapping with the `-p` flag.

```bash
docker run --rm -it -p 8080:80 visue-app:latest
```
