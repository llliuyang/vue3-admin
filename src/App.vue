<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
import zhCn from "element-plus/dist/locale/zh-cn.mjs"

const store = useAppStore()
const { size } = storeToRefs(store)
</script>

<style lang="scss">
#app {
  width: 100%;
  max-width: 100%;
  margin: 0;
  padding: 0;
}
</style>
