<script setup lang="ts">
import AppearancePickerPopover from './appearance-picker-popover.vue'
import appearancePickerSheet from './appearance-picker-sheet.vue'
</script>

<template>
  <component :is="isMobile ? appearancePickerSheet : AppearancePickerPopover" />
</template>
