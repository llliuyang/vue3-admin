<template>
  <component :is="type" v-bind="linkProps">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from "@/utils/validate"

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
// 判断接收的路径是不是外链
const isExt = computed(() => isExternal(props.to))
// 根据是否为外链来计算标签类型
const type = computed(() => {
  if (isExt.value) {
    return "a"
  }
  return "router-link"
})
// 计算标签属性
const linkProps = computed(() => {
  // 'a'标签属性
  if (isExt.value) {
    return {
      href: props.to,
      target: "_blank",
      rel: "noopener"
    }
  }
  // router-link标签属性
  return {
    to: props.to
  }
})
</script>
<style scoped></style>
