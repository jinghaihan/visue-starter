import {
  AntDesignVueResolver as _AntDesignVueResolver,
  type AntDesignVueResolverOptions,
} from 'unplugin-vue-components/resolvers'

export const ANTD_RESOLVER_OPTIONS_PRESET: AntDesignVueResolverOptions = {
  importStyle: 'css-in-js',
}

export function AntDesignVueResolver(options?: AntDesignVueResolverOptions) {
  return _AntDesignVueResolver({
    ...ANTD_RESOLVER_OPTIONS_PRESET,
    ...options,
  })
}
