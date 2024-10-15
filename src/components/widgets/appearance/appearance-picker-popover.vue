<template>
  <Popover>
    <VTooltip>
      <PopoverTrigger as-child>
        <VIconButton icon="i-lucide-paintbrush" />
      </PopoverTrigger>
      <template #content>
        {{ $t('appearance.title') }}
      </template>
      <PopoverContent class="w-100">
        <div class="py-2">
          <h1 class="text-md text-foreground font-semibold">
            {{ $t('appearance.title') }}
          </h1>
          <p class="mt-2 text-xs text-muted-foreground">
            {{ $t('appearance.sub-title') }}
          </p>
        </div>

        <AppearancePickerContent />
      </PopoverContent>
    </VTooltip>
  </Popover>
</template>
