/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { defineConfig, installPlugins } from '@microtsm/cli';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig((env) => ({
  define: {
    'process.env.NODE_ENV': JSON.stringify(env.mode),
  },
  plugins: [
    vue(),
    istanbul({
      include: 'src/*',
      exclude: ['node_modules', 'test/'],
      extension: ['.js', '.ts', '.vue'],
      requireEnv: false,
    }),
    ...installPlugins(env.command === 'build' ? ['ignoreCssImports'] : []),
  ],
  build: {
    minify: false,
    sourcemap: env.command !== 'build',
    rollupOptions: {
      external: [
        'vue',
        'vue-router',
        'axios',
        '@fewangsit/wangsvue',
        '@fewangsit/wangsvue-presets/wangsvue',
        '@fewangsit/workspace-api-services',
      ],
    },
    lib: {
      entry: 'src/main.ts',
      formats: ['es'],
    },
  },
  server: {
    port: 8040,
  },
  preview: {
    port: 8040,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@fewangsit/wangsvue': resolve(
        __dirname,
        'node_modules/@fewangsit/wangsvue',
      ),
      '@fewangsit/workspace-api-services': resolve(
        __dirname,
        'node_modules/@fewangsit/workspace-api-services',
      ),
    },
  },
}));
