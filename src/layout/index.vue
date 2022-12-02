<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @showSetting="openSetting"></navbar>
        <tags-view></tags-view>
      </div>
      <app-main></app-main>
    </div>
    <!--    右侧抽屉面板-->
    <right-panel
      v-model="showSetting"
      title="样式风格设置"
      :size="settingsPanelWidth"
    >
    </right-panel>
  </div>
</template>

<script lang="ts" setup>
import variables from "@/styles/variables.module.scss"
const showSetting = ref(false)
const openSetting = () => {
  showSetting.value = true
}
const settingsPanelWidth = computed(() => variables.settingPanelWidth)
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
      min-height: calc(100vh - 84px);
      background: #f2f2f2;
    }
  }
}
</style>
