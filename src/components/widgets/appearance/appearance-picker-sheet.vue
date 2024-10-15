<script lang="ts" setup>
const open = ref<boolean>(false)
</script>

<template>
  <VSheet
    v-model:open="open"
    :title="$t('appearance.title')"
    :description="$t('appearance.sub-title')"
  >
    <template #trigger>
      <VIconButton icon="i-lucide-paintbrush" @click="open = true" />
    </template>
    <div px-0.5>
      <AppearancePickerContent />
    </div>
  </VSheet>
</template>
