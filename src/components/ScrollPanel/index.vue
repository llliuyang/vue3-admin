<template>
  <el-scrollbar wrap-class="scroll-wrapper">
    <slot></slot>
  </el-scrollbar>
</template>

<style lang="scss">
.scroll-wrapper {
  position: relative;
  width: 100%;
  white-space: nowrap;
  .el-scrollbar__view {
    height: 100%;
  }
}
</style>
