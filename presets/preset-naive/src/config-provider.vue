<script lang="ts" setup>
import type { UseConfigProviderOptions } from './use-config-provider'
import { NConfigProvider } from 'naive-ui'
import { toRefs } from 'vue'
import { useConfigProvider } from './use-config-provider'

interface Props extends UseConfigProviderOptions {}
const props = withDefaults(defineProps<Props>(), {})

const { props: configProviderProps } = useConfigProvider(
  toRefs(props) as UseConfigProviderOptions,
)
</script>

<template>
  <NConfigProvider v-bind="configProviderProps">
    <slot />
  </NConfigProvider>
</template>
