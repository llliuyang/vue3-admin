import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
import Router from "./router/index"
import { createPinia } from "pinia"

// 初始化css，重置css默认样式
import "normalize.css/normalize.css"
// 全局css
import "@/styles/index.scss"
// 引入svg注册脚本
import "virtual:svg-icons-register"
import initSvgIcon from "@/icons/index"

const app = createApp(App)
app.use(createPinia())
app.use(Router)
app.use(initSvgIcon)
app.mount("#app")
