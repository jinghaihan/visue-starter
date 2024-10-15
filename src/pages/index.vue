<script lang="ts" setup>
definePage({
  meta: {
    name: 'home',
    keepAlive: true,
  },
})

const router = useRouter()
const userStore = useUserStore()
const name = ref<string>(userStore.username)

function go() {
  if (name.value) {
    router.push(`/hi/${encodeURIComponent(name.value)}`)
  }
}
</script>

<template>
  <main flex flex-col items-center gap-2>
    <div text-4xl>
      <div i-lucide-cloud-rain-wind />
    </div>

    <p>
      <a rel="noreferrer" href="https://github.com/jinghaihan/visue-starter" target="_blank">
        Visue Starter
      </a>
    </p>

    <p>
      <em text-sm opacity-75>{{ $t('demo.introduce') }}</em>
    </p>

    <div mt-4 flex flex-col items-center>
      <p text-info-11>
        COMPOSITION API / FILE-BASED ROUTER / PERSISTED STORE / COMPONENTS AUTO-IMPORTING
      </p>
      <p text-info-12>
        UNOCSS / MARKDOWN / i18n / DARK MODE / SHADCN UI / DYNAMIC TITLE
      </p>
    </div>

    <Input
      v-model:model-value="name"
      mt-4
      class="!w-60"
      :placeholder="$t('demo.whats-your-name')"
      @keydown.enter="go"
    />

    <Button mt-2 w-auto class="!px-3" size="xs" :disabled="!name" @click="go">
      {{ $t('button.go') }}
    </Button>
  </main>
</template>
