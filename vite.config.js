import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitepluginString from 'vite-plugin-string';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), [vitepluginString()]
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    assetsInclude: ['dist\vaisseaux\scene.gltf', 'dist\vaisseaux\MR_INT-005_WhiteNeons_NAD.hdr']
  }
})



