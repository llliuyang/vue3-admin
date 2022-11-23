import { defineStore } from "pinia"
import { Size } from "@/plugins/element"

export const useAppStore = defineStore(
  "app",
  () => {
    // state
    const state = reactive({
      sidebar: {
        opened: true
      },
      size: "default"
    })
    const sidebar = computed(() => state.sidebar)
    const size = computed(() => state.size)
    // actions
    const setSize = (size: Size) => {
      state.size = size
    }
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    return {
      state, // 需要导出响应式数据，persist 插件才会存储
      sidebar,
      toggleSidebar,
      size,
      setSize
    }
  },
  {
    persist: {
      storage: window.sessionStorage,
      paths: ["state.sidebar.opened", "state.size"]
    }
  }
)
