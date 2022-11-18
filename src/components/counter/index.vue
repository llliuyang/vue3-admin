<template>
  <div>
    <el-button type="primary" @click="handleClick">计数器</el-button>
    <span>{{ counter.count }}</span>
  </div>
</template>

<script setup lang="ts">
import { useCounterStore } from "@/stores/counter"

const counter = useCounterStore()
const handleClick = () => {
  counter.increment()
}
</script>

<style scoped></style>
