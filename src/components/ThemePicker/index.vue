<template>
  <el-color-picker
    v-model="theme"
    class="theme-picker"
    :predefine="themeColor"
    popper-class="theme-picker-dropdown"
  >
  </el-color-picker>
</template>

<script lang="ts" setup>
import { useSettingsStore } from "@/stores/settings"
import { useGenerateTheme } from "@/hooks/useGenerateTheme"

const store = useSettingsStore()
const { generateTheme } = useGenerateTheme()

const themeColor = [
  "#409EFF",
  "#1890ff",
  "#304156",
  "#212121",
  "#11a983",
  "#13c2c2",
  "#6959CD",
  "#f5222d"
]
// 设置默认色，从store中取值
const defaultTheme = computed(() => store.settings.theme)
const theme = ref("")
// 监听默认主题色的改变
watch(
  defaultTheme,
  (val) => {
    theme.value = val
  },
  {
    immediate: true
  }
)
// 根据用户选择的theme变化，重新生成主题
watch(theme, (val) => {
  // 同步到store
  store.changeSetting({ key: "theme", value: val })
  generateTheme(val)
})
</script>

<style lang="scss">
.theme-picker {
  height: 26px !important;
  margin-right: 8px;
  .el-color-picker__trigger {
    height: 26px !important;
    width: 26px !important;
    padding: 2px;
  }
}
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}
.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
