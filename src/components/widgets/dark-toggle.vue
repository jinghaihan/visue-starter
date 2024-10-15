<script lang="ts" setup>
const iconClass = computed(() => {
  return isDark.value ? 'i-lucide-moon' : 'i-lucide-sun '
})
</script>

<template>
  <VTooltip :key="iconClass">
    <VIconButton :icon="iconClass" @click="toggleDark" />
    <template #content>
      {{ $t('widget.toggle-dark') }}
    </template>
  </VTooltip>
</template>
