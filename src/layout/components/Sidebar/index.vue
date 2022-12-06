<template>
  <div class="sidebar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse"></logo>
    <scroll-panel>
      <el-menu
        class="sidebar-container-menu"
        mode="vertical"
        :default-active="activeMenu"
        :collapse="!sidebar.opened"
        :collapse-transition="true"
        :background-color="scssVariables.menuBg"
        :text-color="scssVariables.menuText"
        :active-text-color="themeColor"
      >
        <sidebar-item
          v-for="route in menuRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        ></sidebar-item>
      </el-menu>
    </scroll-panel>
  </div>
</template>

<script lang="ts" setup>
import scssVariables from "@/styles/variables.module.scss"
import SidebarItem from "@/layout/components/Sidebar/SidebarItem.vue"
// 导入路由表
import { routes } from "@/router"
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/settings"
import Logo from "@/layout/components/Sidebar/Logo.vue"
import ScrollPanel from "@/components/ScrollPanel/index.vue"

const store = useAppStore()
const { sidebar } = storeToRefs(store)

const route = useRoute()
// 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta.activeMenu) return meta.activeMenu
  return path
})
// 渲染路由
const menuRoutes = computed(() => routes)

// 应用主题色
const settingsStore = useSettingsStore()
const themeColor = computed(() => settingsStore.settings.theme)

// logo
const showLogo = computed(() => settingsStore.settings.sidebarLogo)
// sidebar opened就是非折叠
const isCollapse = computed(() => !store.sidebar.opened)

const logoHeight = computed(() => (showLogo.value ? 50 : 0) + "px")
</script>

<style lang="scss" scoped>
.sidebar-wrapper {
  .sidebar-container-menu {
    height: calc(100vh - v-bind(logoHeight));
  }
}
</style>
