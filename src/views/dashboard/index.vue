<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon
      icon-class="eye"
      class-name="custom-class"
      @click="handleClick"
    ></svg-icon>

    <el-button type="primary">按钮</el-button>

    缓存测试 <input type="text" />

    <el-date-picker
      placeholder="Pick a day"
      type="date"
      v-model="date"
    ></el-date-picker>
  </div>
</template>

<script setup lang="ts">
const { proxy } = getCurrentInstance()!
const handleClick = () => {
  proxy?.$message.success("恭喜你，这是一条成功消息")
}
// const handleClick = () => {
//   alert("Good Job!")
// }
const date = ref()
</script>

<style>
.custom-class {
  font-size: 200px;
  color: green;
  cursor: pointer;
}
</style>
