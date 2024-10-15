<template>
  <div w-full>
    <div flex items-center justify-end p-4>
      <Toolbar />
    </div>
    <div w-full flex flex-col items-center px-4 py-10>
      <slot />
      <ArtPlum />
    </div>
  </div>
</template>
