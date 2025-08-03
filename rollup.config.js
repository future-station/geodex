import terser from '@rollup/plugin-terser';

export default [
  // ESM build for modern environments
  {
    input: 'browser.js',
    output: {
      file: 'dist/geodex.esm.js',
      format: 'es',
      exports: 'named'
    },
    plugins: [],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  },
  // Minified ESM build
  {
    input: 'browser.js',
    output: {
      file: 'dist/geodex.esm.min.js',
      format: 'es',
      exports: 'named'
    },
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  },
  // UMD build for browsers
  {
    input: 'browser.js',
    output: {
      file: 'dist/geodex.umd.js',
      format: 'umd',
      name: 'CountryDataList',
      exports: 'named'
    },
    plugins: [],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  },
  // Minified UMD build for browsers
  {
    input: 'browser.js',
    output: {
      file: 'dist/geodex.min.js',
      format: 'umd',
      name: 'CountryDataList',
      exports: 'named'
    },
    plugins: [
      terser({
        compress: {
          pure_getters: true,
          unsafe: true,
          unsafe_comps: true,
          warnings: false
        }
      })
    ],
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  }
];
