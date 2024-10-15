<script lang="ts" setup>
import type { PrimitiveProps } from 'radix-vue'
import type { HTMLAttributes } from 'vue'

interface Props extends PrimitiveProps {
  class?: HTMLAttributes['class']
  icon?: string
}

withDefaults(defineProps<Props>(), {
  as: 'button',
})
</script>

<template>
  <Button variant="ghost" size="icon" :as="as">
    <i :class="icon" />
  </Button>
</template>
