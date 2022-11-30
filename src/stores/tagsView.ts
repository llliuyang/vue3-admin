import { defineStore } from "pinia"
import {
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteRecordName
} from "vue-router"

export const useTagsView = defineStore("tag", () => {
  const visitedViews = ref<RouteLocationNormalizedLoaded[]>([])
  // 添加视图
  const addView = (view: RouteLocationNormalizedLoaded) => {
    // 去重
    if (visitedViews.value.some((v) => v.path === view.path)) return
    // 没有 title 时的处理
    visitedViews.value.push(
      Object.assign({}, view, { title: view.meta?.title || "tag-name" })
    )
    addCachedView(view)
  }
  // 删除视图
  const delView = (view: RouteLocationNormalizedLoaded) => {
    const i = visitedViews.value.indexOf(view)
    if (i > -1) {
      visitedViews.value.splice(i, 1)
    }
    delCachedView(view)
  }

  // 缓存
  const cachedViews = ref<RouteRecordName[]>([])
  // 添加缓存
  const addCachedView = (view: RouteLocationNormalized) => {
    if (cachedViews.value.includes(view.name!)) return
    if (!view.meta.noCache) {
      // 需要缓存
      cachedViews.value.push(view.name!)
    }
  }
  // 删除缓存
  const delCachedView = (view: RouteLocationNormalized) => {
    const i = cachedViews.value.indexOf(view.name!)
    i > -1 && cachedViews.value.splice(i, 1)
  }
  // 关闭视图也要删除相应的缓存
  const delAllViews = () => {
    visitedViews.value = visitedViews.value.filter((tag) => tag.meta.affix) // 只保留固定的标签
    cachedViews.value = [] // 清空缓存
  }
  const delOtherViews = (view: RouteLocationNormalized) => {
    visitedViews.value = visitedViews.value.filter(
      (tag) => tag.meta.affix || tag.path === view.path // 保留自己和固定的，其它删除
    )
    cachedViews.value = cachedViews.value.filter((name) => name !== view.name) // 保留自己的缓存，其它删除
  }
  return {
    visitedViews,
    addView,
    delView,
    cachedViews,
    addCachedView,
    delCachedView,
    delAllViews,
    delOtherViews
  }
})
