<template>
  <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <span v-if="index === levelList.length - 1">
        {{ item.meta?.title }}
      </span>
      <a v-else @click.prevent="handleLink(item)">{{ item.meta?.title }}</a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { RouteLocationMatched, RouteLocationRaw } from "vue-router"
import { compile } from "path-to-regexp"

type partialRouteLocationMatched = Partial<RouteLocationMatched>
const router = useRouter()
const route = useRoute()
// 导航列表 存放matched里筛选的路由记录
const levelList = ref<Array<partialRouteLocationMatched>>([])

// 根据路由name判断是不是dashboard路由
const isDashboard = (route?: partialRouteLocationMatched) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return (
    (name as string).trim().toLocaleLowerCase() ===
    "Dashboard".toLocaleLowerCase()
  )
}

// 获取面包屑导航
const getBreadcrumb = () => {
  // 对匹配的路由进行过滤 过滤掉没有title属性的路由，没有title就无法作为面包屑导航
  let matched = route.matched.filter(
    (item) => item.meta && item.meta.title
  ) as partialRouteLocationMatched[]

  // 获取第一个匹配路由记录
  const first = matched[0]
  const dashboardRoute = {
    path: "/dashboard",
    meta: {
      title: "Dashboard"
    }
  }
  // 我们要把dashboard作为首页 始终固定在面包屑导航第一个 Dashboard/System/Menu Management
  // 如果第一个匹配到的路由记录不是dashboard 我们就手动把它放在记录数组的第一项
  if (!isDashboard(first)) {
    matched = ([dashboardRoute] as partialRouteLocationMatched[]).concat(
      matched
    )
  }

  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

watch(
  () => route.path,
  () => {
    getBreadcrumb()
  },
  { immediate: true }
)

// 针对 动态路由 /user/:id 进行动态参数填充
// path-to-regexp 文档说明 https://www.npmjs.com/package/path-to-regexp
const pathCompile = (path: string) => {
  const toPath = compile(path) // 比如 path /user/:id
  const params = route.params // { id: 10 }
  return toPath(params) // toPath({ id: 10 }) => /user/10 返回填充后的路径
}

// 点击面包屑可跳转
const handleLink = (route: partialRouteLocationMatched) => {
  const { path, redirect } = route
  // 如果是重定向路由就走重定向路径
  if (redirect) {
    router.push(redirect as RouteLocationRaw)
    return
  }
  router.push(pathCompile(path!))
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  float: left;
  line-height: 50px;
  font-size: 14px;
  margin-left: 8px;
}

.no-redirect {
  color: #97a8be;
  cursor: text;
}
</style>

<style lang="scss">
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-leave-active {
  position: absolute;
}

.breadcrumb-move {
  transition: all 0.5s;
}
</style>
