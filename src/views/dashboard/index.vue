<template>
  <div>
    <h1>Dashboard page</h1>
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon
      icon-class="eye"
      class-name="custom-class"
      @click="handleClick"
    ></svg-icon>
  </div>
</template>

<script setup>
const handleClick = () => {
  alert("Good Job!")
}
</script>

<style>
.custom-class {
  font-size: 200px;
  color: green;
  cursor: pointer;
}
</style>
