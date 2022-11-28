<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar></navbar>
        <tags-view></tags-view>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import AppMain from "@/layout/components/AppMain.vue"
// import Navbar from "@/layout/components/Navbar.vue"
// import Sidebar from "@/layout/components/Sidebar/index.vue"
// import TagsView from "@/layout/components/TagsView/index.vue"
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
      background: cyan;
      .navbar {
        height: 50px;
        background: #1890ff;
      }
      .tags-view {
        height: 34px;
        background: #12efff;
      }
    }
    .app-main {
      /* main = 100% - navbar + tagsview */
      min-height: calc(100vh - 84px);
      background: darkcyan;
    }
  }
}
</style>
