import type { StorageLike, StorageLikeAsync, UseStorageAsyncOptions, UseStorageOptions } from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { NAMESPACE } from '@/constants'
import localforage from 'localforage'

export type StorageValue = string | number | boolean | object | null

export class Storage {
  private namespace: string

  constructor(namespace: string = NAMESPACE) {
    this.namespace = namespace
  }

  private formatStorageKey(key: string) {
    return `${this.namespace}-${key}`
  }

  createReactiveStorage<T extends StorageValue>(
    key: string,
    defaults: MaybeRefOrGetter<T>,
    storage?: StorageLike,
    options?: UseStorageOptions<T>,
  ) {
    return useStorage<T>(
      this.formatStorageKey(key),
      defaults,
      storage ?? localStorage,
      this.createStorageOptions(options) as UseStorageOptions<T>,
    )
  }

  createReactiveIndexedDB<T extends StorageValue>(
    key: string,
    defaults: MaybeRefOrGetter<T>,
    options?: UseStorageAsyncOptions<T>,
  ) {
    return useStorageAsync<T>(
      this.formatStorageKey(key),
      defaults,
      localforage as StorageLikeAsync,
      this.createStorageOptions<T>(options) as UseStorageAsyncOptions<T>,
    )
  }

  createStorageOptions<T extends StorageValue>(
    options?: UseStorageOptions<T> | UseStorageAsyncOptions<T>,
  ): UseStorageOptions<T> | UseStorageAsyncOptions<T> {
    return merge(
      {
        mergeDefaults: (storageValue: T, defaults: T) => merge(defaults, storageValue),
      },
      options ?? {},
    )
  }
}

export const storage = new Storage()
