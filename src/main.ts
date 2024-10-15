import type { App as _App } from 'vue'
import App from './App.vue'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@/assets/main.css'

async function bootstrap() {
  const app = createApp(App)

  await initPreferences()

  Promise.all(
    Object.values(import.meta.glob<{ install: (app: _App) => void }>('./modules/*.ts', { eager: true }))
      .map(async i => await i.install?.(app)),
  )

  app.mount('#app')
}

bootstrap()
