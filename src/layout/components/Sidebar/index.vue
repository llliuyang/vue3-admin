<template>
  <div style="color: white" @click="isCollapse = !isCollapse">展收测试</div>
  <el-menu
    class="sidebar-container-menu"
    mode="vertical"
    :default-active="activeMenu"
    :collapse="isCollapse"
    :collapse-transition="true"
    :background-color="scssVariables.menuBg"
    :text-color="scssVariables.menuText"
    :active-text-color="scssVariables.menuActiveText"
  >
    <sidebar-item
      v-for="route in menuRoutes"
      :key="route.path"
      :item="route"
      :base-path="route.path"
    ></sidebar-item>
  </el-menu>
</template>

<script lang="ts" setup>
import scssVariables from "@/styles/variables.module.scss"
import SidebarItem from "@/layout/components/Sidebar/SidebarItem.vue"
// 导入路由表
import { routes } from "@/router"

const isCollapse = ref(false)
const route = useRoute()
// 根据路由路径 对应 当前激活的菜单 页面刷新后 激活当前路由匹配的菜单
const activeMenu = computed(() => {
  return route.path
})
// 渲染路由
const menuRoutes = computed(() => routes)
</script>
