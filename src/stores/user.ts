import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {
    const username = ref<string>('')
    const previousNames = ref<string[]>([])
    const otherNames = computed(() => difference(previousNames.value, [username.value]))

    function setUsername(name: string) {
      if (username.value) {
        previousNames.value = uniq([...previousNames.value, username.value])
      }
      username.value = name
    }

    return {
      username,
      previousNames,
      otherNames,
      setUsername,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['username', 'previousNames'],
    },
  },
)
