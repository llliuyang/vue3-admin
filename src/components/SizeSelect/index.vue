<template>
  <el-dropdown trigger="click" @command="handleSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size"></svg-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in sizeOptions"
          :key="item.value"
          :command="item.value"
          :disabled="size === item.value"
        >
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { Size } from "@/plugins/element"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/stores/app"

const { proxy } = getCurrentInstance()!
const sizeOptions = ref([
  { label: "Default", value: "default" },
  { label: "Large", value: "large" },
  { label: "Small", value: "small" }
])
const store = useAppStore()
const { size } = storeToRefs(store)

const handleSize = (command: Size) => {
  store.setSize(command)
  proxy?.$message.success({
    type: "success",
    message: `Switch Size to ${command}`
  })
}
</script>

<style lang="scss" scoped>
.size-icon {
  font-size: 18px;
}
</style>
