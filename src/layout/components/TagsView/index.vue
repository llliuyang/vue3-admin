<template>
  <div class="tags-view-container">
    <scroll-panel>
      <div class="tags-view-wrapper">
        <router-link
          class="tags-view-item"
          :class="{ active: isActive(tag) }"
          v-for="(tag, index) in visitedViews"
          :key="index"
          :to="{ path: tag.path, query: tag.query }"
        >
          <!--          右键菜单-->
          <el-dropdown
            trigger="contextmenu"
            @command="(command:any)=>handleTagCommand(command,tag)"
          >
            <span style="line-height: 26px">{{ tag.meta.title }}</span>
            <!--            affix固定的路由tag无法删除-->
            <span
              v-if="!isAffix(tag)"
              class="el-icon-close"
              @click.prevent.stop="closeSelectedTag(tag)"
            ></span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
                <el-dropdown-item command="other">关闭其它</el-dropdown-item>
                <el-dropdown-item command="self" v-if="!isAffix(tag)"
                  >关闭</el-dropdown-item
                >
                <el-dropdown-item command="refresh">刷新</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!--          关闭icon-->
          <el-icon class="icon-close" v-if="!isAffix(tag)">
            <CloseBold @click.prevent.stop="closeSelectedTag(tag)"></CloseBold>
          </el-icon>
        </router-link>
      </div>
    </scroll-panel>
  </div>
</template>

<script lang="ts" setup>
import { CloseBold } from "@element-plus/icons-vue"
import { useTagsView } from "@/stores/tagsView"
import { storeToRefs } from "pinia"
import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordRaw
} from "vue-router"

import path from "path-browserify"
import { routes } from "@/router"
import ScrollPanel from "@/layout/components/TagsView/ScrollPanel.vue"

const store = useTagsView()
const route = useRoute()
const router = useRouter()
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
  // 如果移除的view是当前选中状态view, 就让删除后的集合中最后一个tag view为选中态
  if (isActive(tag)) {
    toLastView(visitedViews.value, tag)
  }
}

const toLastView = (
  visitedViews: RouteLocationNormalizedLoaded[],
  view: RouteLocationNormalizedLoaded
) => {
  const theLastView = visitedViews.at(-1)
  // 如果存在最后的view
  if (theLastView) {
    router.push(theLastView.path)
  } else {
    // 如果集合之中已经没有了view
    // 如果删除的是Dashboard,就重定向回Dashboard
    if (view.name === "Dashboard") {
      router.push({ path: view.path })
    } else {
      // 删除的不是Dashboard,跳转到首页 /
      router.push("/")
    }
  }
}

const filterAffixTags = (routes: RouteRecordRaw[], basePath = "/") => {
  let tags: RouteLocationNormalizedLoaded[] = []
  routes.forEach((route) => {
    if (route.meta && route.meta.affix) {
      // 把路由路径解析成完整路径，路由可能是相对路径
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        name: route.name,
        path: tagPath,
        meta: { ...route.meta }
      } as RouteLocationNormalizedLoaded)
    }
    // 深度优先遍历 子路由（子路由路径可能相对于route.path父路由路径）
    if (route.children) {
      const childTags = filterAffixTags(route.children, route.path)
      if (childTags.length) {
        tags = [...tags, ...childTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const affixTags = filterAffixTags(routes)
  for (const tag of affixTags) {
    if (tag.name) {
      store.addView(tag)
    }
  }
}

const isAffix = (tag: RouteLocationNormalizedLoaded) => {
  return tag.meta && tag.meta.affix
}

onMounted(() => {
  initTags()
})

// 右键菜单
const enum TagCommandType {
  All = "all",
  Other = "other",
  Self = "self",
  Refresh = "refresh"
}
const handleTagCommand = (
  command: TagCommandType,
  view: RouteLocationNormalized
) => {
  switch (command) {
    case TagCommandType.All:
      closeAllTag(view)
      break
    case TagCommandType.Other:
      closeOtherTag(view)
      break
    case TagCommandType.Self:
      closeSelectedTag(view)
      break
    case TagCommandType.Refresh:
      refreshSelectedTag(view)
      break
  }
}

const closeAllTag = (view: RouteLocationNormalized) => {
  store.delAllViews()
  // 关闭所有后，只剩下固定的，让视图切换到最后固定的
  toLastView(visitedViews.value, view)
}

const closeOtherTag = (view: RouteLocationNormalized) => {
  store.delOtherViews(view)
  // 如果当前不是激活的，关闭其他后，就激活当前view路由
  if (!isActive(view)) {
    router.push(view.path)
  }
}

const refreshSelectedTag = (view: RouteLocationNormalized) => {
  // 刷新之前，将该路由名称从缓存列表中删除
  store.delCachedView(view)
  // router.push(view.path) 是无法刷新页面的，因为页面没有任何变化
  // 跳转到重定向路由来解决
  router.push("/redirect" + view.path)
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  width: 100%;
  height: 34px;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  overflow: hidden;
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
        .el-dropdown {
          color: #fff;
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
