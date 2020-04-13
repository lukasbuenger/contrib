import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const configure = (pkgName) => ({
  input: `packages/${pkgName}/src/index.ts`,
  external: ['react', 'react-dom'],
  plugins: [
    typescript({
      tsconfig: `packages/${pkgName}/tsconfig.json`,
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
  output: [
    {
      file: `packages/${pkgName}/dist/index.js`,
      format: 'cjs',
    },
    {
      file: `packages/${pkgName}/dist/index.es.js`,
      format: 'esm',
    },
  ],
})

export default [configure('use-fieldset')]
