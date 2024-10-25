import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  esbuild:{
    pure:['console.log'],
    drop:['debugger'],
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })]
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/root.scss" as *;'
      }
    }
  },
  server: {
    //代理设置
    proxy: {
      //开发环境
      '/dev': {
        target: 'http://localhost:8899',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, '')
      },
      //生产环境
      '/prod': {
        target: 'http://120.26.161.36:8899/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod/, '')
      }
    }
  },
  build:{
    minify:'esbuild',
    rollupOptions:{
        output: {
          manualChunks(name) {
            if (name.includes("node_modules")) {
              return name.toString().split("node_modules/")[1].split("/")[0].toString(); 
            }
          }
        }
    }
  }
})
