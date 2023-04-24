// vite.config.ts
import VueMacros from 'unplugin-vue-macros/vite'
import ReactivityTransform from '@vue-macros/reactivity-transform/vite'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    ReactivityTransform(),
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
  ],
})
