<template>
  <div class="tags-view-container">
    <div class="tags-view-wrapper">
      <router-link
        class="tags-view-item"
        :class="{ active: isActive(tag) }"
        v-for="(tag, index) in visitedViews"
        :key="index"
        :to="{ path: tag.path, query: tag.query }"
      >
        <span>{{ tag.meta.title }}</span>
        <el-icon class="icon-close">
          <CloseBold @click.prevent.stop="closeSelectedTag(tag)"></CloseBold>
        </el-icon>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CloseBold } from "@element-plus/icons-vue"
import { useTagsView } from "@/stores/tagsView"
import { storeToRefs } from "pinia"
import { RouteLocationNormalizedLoaded } from "vue-router"

const store = useTagsView()
const route = useRoute()
const { visitedViews } = storeToRefs(store)
// 添加tag
const addTags = () => {
  const { name } = route
  if (name) {
    store.addView(route)
  }
}

watch(
  () => route.path,
  () => {
    addTags()
  },
  { immediate: true }
)

// 判断是否是当前已经激活的tag
const isActive = (tag: RouteLocationNormalizedLoaded) => {
  return tag.path === route.path
}
// 关闭当前右键的tag
const closeSelectedTag = (tag: RouteLocationNormalizedLoaded) => {
  store.delView(tag)
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-wrapper {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    .tags-view-item {
      display: inline-block;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      background: #fff;
      color: #495060;
      padding: 0 8px;
      box-sizing: border-box;
      font-size: 12px;
      margin-left: 5px;
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;
        &::before {
          position: relative;
          display: inline-block;
          content: "";
          width: 8px;
          height: 8px;
          border-radius: 50%;
          margin-right: 5px;
          background: #fff;
        }
      }
    }
    span {
      vertical-align: middle;
    }
  }
  .icon-close {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    position: relative;
    left: 2px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -1px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>