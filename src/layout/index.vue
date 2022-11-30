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
