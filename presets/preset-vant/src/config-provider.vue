<script lang="ts" setup>
import type { UseConfigProviderOptions } from './use-config-provider'
import { ConfigProvider } from 'vant'
import { toRefs } from 'vue'
import { useConfigProvider } from './use-config-provider'

interface Props extends UseConfigProviderOptions {}
const props = withDefaults(defineProps<Props>(), {})

const { props: configProviderProps } = useConfigProvider(
  toRefs(props) as UseConfigProviderOptions,
)
</script>

<template>
  <ConfigProvider v-bind="configProviderProps">
    <slot />
  </ConfigProvider>
</template>
