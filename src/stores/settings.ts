import { defineStore } from "pinia"
import variables from "@/styles/variables.module.scss"

export const useSettingsStore = defineStore(
  "settings",
  () => {
    // theme是用户选择的主题
    // originalTheme是当前生效的主题, 刷新需要重新生成无需存放到sessionStorage中
    const settings = reactive({
      theme: variables.theme,
      originalTheme: "",
      tagsView: true,
      sidebarLogo: true
    })
    type ISettings = typeof settings
    type Valueof<T> = T[keyof T]

    const changeSetting = ({
      key,
      value
    }: {
      key: keyof ISettings
      value: Valueof<ISettings>
    }) => {
      if (key in settings) {
        ;(settings[key] as Valueof<ISettings>) = value
      }
    }
    return { settings, changeSetting }
  },
  {
    persist: {
      storage: window.sessionStorage,
      paths: ["settings.theme", "settings.tagsView", "settings.sidebarLogo"]
    }
  }
)
