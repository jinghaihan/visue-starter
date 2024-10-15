<script lang="ts" setup>
import { SUPPORT_LANGUAGE_PRESETS } from '@/constants'

const lang = ref(preferences.value.lang)

watch(
  () => lang.value,
  (_lang) => {
    updatePreferences({ lang: _lang })
  },
)
</script>

<template>
  <DropdownMenu>
    <VTooltip>
      <DropdownMenuTrigger as-child>
        <VIconButton icon="i-lucide-languages" />
      </DropdownMenuTrigger>
      <template #content>
        {{ $t('widget.toggle-langs') }}
      </template>
      <DropdownMenuContent align="start">
        <DropdownMenuRadioGroup v-model="lang">
          <DropdownMenuRadioItem
            v-for="item in SUPPORT_LANGUAGE_PRESETS"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </VTooltip>
  </DropdownMenu>
</template>
