<script lang="ts" setup>
interface Props {
  active?: boolean
  text?: string
  icon?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  active: false,
})
</script>

<template>
  <Button
    variant="outline"
    h-8 px-3 outline-1 outline duration-0
    class="!justify-start"
    :class=" props.active ? 'outline-primary outline-2' : 'outline-border'"
    :disabled="props.active"
  >
    <div flex items-center gap-2>
      <div
        v-if="props.icon"
        size-4 shrink-0
        :class="props.icon"
      />
      <span
        v-if="props.color"
        size-5 flex items-center justify-center rounded-full
        :style="{
          backgroundColor: props.color,
        }"
      >
        <div v-if="props.active" i-lucide-check size-3 text-white />
      </span>
      <span class="text-xs capitalize">
        {{ text }}
      </span>
    </div>
  </Button>
</template>
