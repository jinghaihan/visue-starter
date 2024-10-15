<template>
  <VTooltip>
    <RouterLink icon-btn to="/">
      <VIconButton icon="i-lucide-home" />
    </RouterLink>
    <template #content>
      {{ $t('page.home') }}
    </template>
  </VTooltip>
</template>
