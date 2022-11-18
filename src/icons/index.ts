import { App } from "vue"
import SvgIcon from "@/components/SvgIcon/index.vue"

export default (app: App) => {
  app.component("svg-icon", SvgIcon) // 全局注册svg-icon组件
}
