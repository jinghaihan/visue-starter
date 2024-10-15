<template>
  <VTooltip>
    <RouterLink icon-btn to="/component-library">
      <VIconButton icon="i-lucide-component" />
    </RouterLink>
    <template #content>
      {{ $t('page.component-library') }}
    </template>
  </VTooltip>
</template>
