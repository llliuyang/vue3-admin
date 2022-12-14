import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from "path"
// 自动导入
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
// 自动导入element-plus样式
import ElementPlus from "unplugin-element-plus/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"

import DefineOptions from "unplugin-vue-define-options/vite"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "src")
      }
    ]
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"], // 顺便自动导入 vue vue-router
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false }, // 改成true生成一次后禁用即可
      dts: "src/auto-import.d.ts" // 生成的全局变量放到此目录下
    }),
    Components({
      // 默认只针对src/components目录实现自动导入
      dirs: ["src/components", "src/layout/components"], // 后面布局组件也有相关的组件期望自动导入
      dts: "src/components.d.ts",
      resolvers: [ElementPlusResolver()] // 生成的组件的类型放到这里
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[name]",
      inject: "body-last",
      customDomId: "_svg_icons_dom_"
    }),
    ElementPlus(),
    DefineOptions()
  ],
  server: {
    proxy: {
      "/dev-api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, "/api")
      }
    }
  }
})
