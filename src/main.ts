import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Router from "./router/index"
import { createPinia } from "pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"

// 初始化css，重置css默认样式
import "normalize.css/normalize.css"
// 全局css
import "@/styles/index.scss"
// 引入svg注册脚本
import "virtual:svg-icons-register"
import initSvgIcon from "@/icons/index"

// 注册element-plus
import installElementPlus from "./plugins/element"

import "./permission"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)
app.use(Router)
// 安装element-plus插件
app.use(installElementPlus)
app.use(initSvgIcon)
app.mount("#app")
