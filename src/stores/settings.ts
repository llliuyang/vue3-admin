import { defineStore } from "pinia"
import variables from "@/styles/variables.module.scss"

export const useSettingStore = defineStore(
  "settings",
  () => {
    // theme是用户选择的主题
    // originalTheme是当前生效的主题, 刷新需要重新生成无需存放到sessionStorage中
    const settings = reactive({ theme: variables.theme, originalTheme: "" })
    type ISettings = typeof settings
    type Valueof<T> = T[keyof T]

    const changeSetting = ({
      key,
      value
    }: {
      key: keyof ISettings
      value: Valueof<ISettings>
    }) => {
      settings[key] = value
    }
    return { settings, changeSetting }
  },
  {
    persist: {
      storage: window.sessionStorage,
      paths: ["settings.theme"]
    }
  }
)
