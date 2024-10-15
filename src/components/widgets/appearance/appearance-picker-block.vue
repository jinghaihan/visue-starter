<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'

interface Props {
  label?: string
  contentClass?: HTMLAttributes['class']
}

withDefaults(defineProps<Props>(), {})
</script>

<template>
  <div class="pt-2">
    <Label for="color" class="text-xs"> {{ label }} </Label>
    <div :class="contentClass" class="grid gap-2 py-1.5">
      <slot />
    </div>
  </div>
</template>
