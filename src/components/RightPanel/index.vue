<template>
  <div class="right-panel">
    <el-drawer
      :model-value="modelValue"
      :direction="direction"
      :show-close="showClose"
      :with-header="withHeader"
      :custom-class="customClass"
      :title="title"
      :size="size"
      @close="handleClose"
    >
      <slot></slot>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    validator(val: string) {
      return ["rtl", "ltr", "btt", "ttb"].includes(val)
    },
    default: "rtl"
  },
  showClose: {
    type: Boolean,
    default: true
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: "setting-panel"
  },
  title: {
    type: String,
    ddefault: "Setting Panel"
  },
  size: {
    type: [String, Number]
  }
})

const emit = defineEmits(["update:modelValue", "close"])
const handleClose = () => {
  emit("update:modelValue", false)
  emit("close")
}
</script>

<style lang="scss" scoped></style>
