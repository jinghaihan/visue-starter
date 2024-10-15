<script lang="ts" setup>
interface Props {
  title?: string
  description?: string
  width?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  width: 400,
})
const openSheet = defineModel<boolean>('open')

const contentStyle = computed(() => {
  return {
    width: `${props.width}px`,
  }
})
</script>

<template>
  <Sheet v-model="openSheet">
    <SheetTrigger as-child>
      <slot name="trigger" />
    </SheetTrigger>
    <SheetContent :style="contentStyle">
      <SheetHeader>
        <SheetTitle>{{ title }}</SheetTitle>
        <SheetDescription>
          {{ description }}
        </SheetDescription>
      </SheetHeader>
      <ScrollArea h-full>
        <slot />
      </ScrollArea>
    </SheetContent>
  </Sheet>
</template>
