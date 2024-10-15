<script lang="ts" setup>
import { BUILTIN_THEME_COLOR_PRESETS, COLOR_SCHEMA_PRESETS, PAGE_TRANSITION_PRESETS, RADII_PRESETS } from '@/constants'
</script>

<template>
  <AppearancePickerBlock :label="$t('appearance.color-scheme.title')" content-class="grid-cols-3">
    <AppearancePickerButton
      v-for="(preset) in COLOR_SCHEMA_PRESETS"
      :key="preset.type"
      :active="preset.type === preferences.colorSchema"
      :icon="preset.icon"
      :text="$t(`appearance.color-scheme.${preset.type}`)"
      @click="(e: MouseEvent) => toggleColorSchema(e, preset.type)"
    />
  </AppearancePickerBlock>

  <AppearancePickerBlock :label="$t('appearance.theme-color.title')" content-class="grid-cols-3">
    <AppearancePickerButton
      v-for="preset in BUILTIN_THEME_COLOR_PRESETS"
      :key="preset.type"
      :active="preset.type === preferences.themeColor"
      :color="preset.color"
      :text="$t(`appearance.theme-color.builtin.${preset.type}`)"
      @click="updatePreferences({ themeColor: preset.type })"
    />
  </AppearancePickerBlock>

  <AppearancePickerBlock :label="$t('appearance.radius.title')" content-class="grid-cols-5">
    <AppearancePickerButton
      v-for="r in RADII_PRESETS"
      :key="r"
      :active="r === preferences.radius"
      :text="`${r}`"
      @click="updatePreferences({ radius: r })"
    />
  </AppearancePickerBlock>

  <AppearancePickerBlock :label="$t('appearance.page-transition.title')" content-class="grid-cols-4">
    <div
      v-for="preset in PAGE_TRANSITION_PRESETS"
      :key="preset"
      :class="{
        'outline-primary outline outline-2': preset === preferences.pageTransition,
      }"
      class="relative cursor-pointer rounded-md p-2 outline-1 outline-border outline"
      @click="updatePreferences({ pageTransition: preset })"
    >
      <div :class="`${preset}-slow`" class="h-10 w-12 rounded-md bg-accent" />
    </div>
  </AppearancePickerBlock>
</template>
