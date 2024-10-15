<script lang="ts" setup>
import { ConfigProvider } from '@visue/preset-antd'

useDynamicTitle()

const { keepAliveRoutes, resolveRouteComponent } = useKeepAliveRoutes()
</script>

<template>
  <ConfigProvider :lang="lang" :design-effects="designEffects">
    <Layout>
      <RouterView v-slot="{ Component, route }">
        <Transition :name="preferences.pageTransition" appear mode="out-in">
          <KeepAlive :include="keepAliveRoutes">
            <component
              :is="resolveRouteComponent(Component)"
              :key="route.fullPath"
            />
          </KeepAlive>
        </Transition>
      </RouterView>
    </Layout>
  </ConfigProvider>
</template>
