import type { VNode } from 'vue'

export function useKeepAliveRoutes() {
  const router = useRouter()

  const keepAliveRoutes = computed(() => {
    return router.getRoutes()
      .filter(route => route.meta.keepAlive)
      .map(route => route.name as string)
  })

  function resolveRouteComponent(component: VNode) {
    const routeName = router.currentRoute.value.name
    if (!routeName || !component) {
      return component
    }

    const componentName = (component.type as any).name
    if (componentName || componentName === routeName) {
      return component
    }

    (component.type as any).name = routeName
    return component
  }

  return {
    keepAliveRoutes,
    resolveRouteComponent,
  }
}
