import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { index: 'src/index.ts', zod: 'src/zod.ts' },
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  sourcemap: true,
})
