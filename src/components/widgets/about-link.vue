<template>
  <VTooltip>
    <RouterLink icon-btn to="/about">
      <VIconButton icon="i-lucide-book-text" />
    </RouterLink>
    <template #content>
      {{ $t('page.about') }}
    </template>
  </VTooltip>
</template>
