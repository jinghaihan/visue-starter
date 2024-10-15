<script lang="ts" setup>
const { isFullscreen, toggle } = useFullscreen()

const iconClass = computed(() => {
  return isFullscreen.value ? 'i-lucide-minimize' : 'i-lucide-maximize'
})
</script>

<template>
  <VTooltip>
    <VIconButton :icon="iconClass" @click="toggle" />
    <template #content>
      {{ $t('widget.toggle-fullscreen') }}
    </template>
  </VTooltip>
</template>
