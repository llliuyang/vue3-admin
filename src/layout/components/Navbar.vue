<template>
  <div class="navbar">
    <hambuger @toggleClick="toggleSidebar" :is-active="sidebar.opened" />
    <breadcrumb></breadcrumb>
    <div class="right-menu">
      <!--      全屏切换-->
      <el-tooltip :content="screenfullTipContent" effect="dark">
        <screenfull
          ref="screenfullRef"
          class="right-menu-item hover-effect"
        ></screenfull>
      </el-tooltip>
      <!--element组件size切换-->
      <el-tooltip content="Global Size" effect="dark" placement="bottom">
        <size-select class="right-menu-item hover-effect"></size-select>
      </el-tooltip>
      <!--头像-->
      <avatar></avatar>
      <!--      设置-->
      <div
        class="setting right-menu-item hover-effect"
        @click="openSettingPanel"
      >
        <el-icon><Setting /></el-icon>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Setting } from "@element-plus/icons-vue"
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
import { Ref } from "vue"

const store = useAppStore()
const { sidebar } = storeToRefs(store)
const toggleSidebar = () => {
  store.toggleSidebar()
}
const screenfullRef: Ref = ref(null)
let screenfullTipContent: Ref<string> = ref("")
watch(
  () => screenfullRef.value?.isFullscreen,
  (val) => {
    screenfullTipContent.value = val ? "Exit Fullscreen" : "Fullscreen"
  }
)

const emit = defineEmits<{ (event: "showSetting", isShow: boolean): void }>()
const openSettingPanel = () => {
  emit("showSetting", true)
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    .setting {
      font-size: 24px;
      display: flex;
      align-items: center;
    }
    &-item {
      padding: 0 8px;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
  }
}
</style>
