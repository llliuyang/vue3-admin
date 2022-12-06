<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker></theme-picker>
    </div>
    <!--tagsView标签开关-->
    <div class="drawer-item">
      <span>Open TagsView</span>
      <el-switch v-model="tagsView" class="drawer-switch"> </el-switch>
    </div>
    <!--    侧边栏logo-->
    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch v-model="showSidebarLogo" class="drawer-switch"> </el-switch>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "@/stores/settings"

const settingsStore = useSettingsStore()

const tagsView = computed({
  get() {
    return settingsStore.settings.tagsView
  },
  set(val) {
    settingsStore.changeSetting({
      key: "tagsView",
      value: val
    })
  }
})

const showSidebarLogo = computed({
  get() {
    return settingsStore.settings.sidebarLogo
  },
  set(val) {
    settingsStore.changeSetting({
      key: "sidebarLogo",
      value: val
    })
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>
