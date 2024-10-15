import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      loaders: ['vue'],
      pattern: ['**/*.vue'],
    },
    {
      builder: 'mkdist',
      format: 'cjs',
      input: './src',
      loaders: ['js'],
      pattern: ['**/*.ts'],
      ext: 'cjs',
    },
    {
      builder: 'mkdist',
      format: 'esm',
      input: './src',
      loaders: ['js'],
      pattern: ['**/*.ts'],
      ext: 'mjs',
    },
  ],
  declaration: true,
  clean: true,
})
