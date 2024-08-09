import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  rules: {
    'style/no-tabs': 'off',
    'node/prefer-global/process': 'off',
  },
})
