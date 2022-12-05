<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view v-if="showTagsView"></tags-view>
      </div>
      <app-main></app-main>
    </div>
    <!--    右侧抽屉面板-->
    <right-panel
      v-model="showSetting"
      title="样式风格设置"
      :size="settingsPanelWidth"
    >
      <settings />
    </right-panel>
  </div>
</template>

<script lang="ts" setup>
import variables from "@/styles/variables.module.scss"
import { useSettingsStore } from "@/stores/settings"
const showSetting = ref(false)
const openSetting = () => {
  showSetting.value = true
}
const settingsPanelWidth = computed(() => variables.settingPanelWidth)

const settingsStore = useSettingsStore()
const showTagsView = computed(() => settingsStore.settings.tagsView)
const otherHeight = computed(() => (showSetting.value ? 84 : 50) + "px")
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .header {
      .navbar {
        height: 50px;
        background: #f2f2f2;
      }
      .tags-view-container {
        height: 34px;
        background: #f8f8f8;
      }
    }
    .app-main {
      /* main = 100% - navbar + tagsview */
      min-height: calc(100vh - v-bind(otherHeight));
      background: #f2f2f2;
    }
  }
}
</style>
