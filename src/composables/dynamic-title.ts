import { $t } from '@/modules/i18n'
import { head } from '@/modules/unhead'

export function useDynamicTitle() {
  const router = useRouter()

  useHead({
    titleTemplate: (title?: string) => title ? `${title} - Visue Starter` : 'Visue Starter',
    meta: [
      {
        name: 'description',
        content: 'Opinionated Vite Starter Template',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
      },
    ],
  })

  watch(
    () => [
      router.currentRoute.value,
      lang.value,
    ],
    () => {
      const title = router.currentRoute.value.meta.name
      if (title) {
        head.push({
          title: $t(`page.${title}`),
        })
      }
    },
    { immediate: true },
  )
}
