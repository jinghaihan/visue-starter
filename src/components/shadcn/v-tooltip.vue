<script lang="ts" setup>
import type { TooltipContentProps } from 'radix-vue'
import type { HTMLAttributes, StyleValue } from 'vue'
import { TooltipProvider } from '@/components/ui/tooltip'

interface Props {
  contentClass?: HTMLAttributes['class']
  contentStyle?: StyleValue
  delayDuration?: number
  side?: TooltipContentProps['side']
}

withDefaults(defineProps<Props>(), {
  delayDuration: 100,
  side: 'top',
})
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <Tooltip>
      <TooltipTrigger as-child tabindex="-1">
        <slot />
      </TooltipTrigger>
      <TooltipContent
        :class="contentClass"
        :side="side"
        :style="contentStyle"
        class="side-content bg-popover text-popover-foreground"
      >
        <slot name="content" />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
