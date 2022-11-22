import { defineStore } from "pinia"

export const useAppStore = defineStore(
  "app",
  () => {
    // state
    const state = reactive({
      sidebar: {
        opened: true
      }
    })
    const sidebar = computed(() => state.sidebar)
    // actions
    const toggleSidebar = () => {
      state.sidebar.opened = !state.sidebar.opened
    }
    return {
      sidebar,
      toggleSidebar
    }
  },
  {
    persist: {
      storage: window.sessionStorage,
      paths: ["state.sidebar.opened"]
    }
  }
)
