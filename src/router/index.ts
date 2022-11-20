import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout,
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation",
          icon: "documentation",
          hidden: true
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: {
      title: "System",
      icon: "lock"
    },
    children: [
      {
        path: "/user",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management",
          icon: "user",
          hidden: true
        }
      },
      {
        path: "menu",
        component: () =>
          import(/* webpackChunkName: "menu" */ "@/views/system/menu.vue"),
        meta: {
          title: "Menu Management",
          icon: "list"
        }
      },
      {
        path: "role",
        component: () =>
          import(/* webpackChunkName: "role" */ "@/views/system/role.vue"),
        meta: {
          title: "Role Management",
          icon: "people"
        }
      }
    ]
  },
  {
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "https://baidu.com",
        redirect: "/",
        meta: {
          title: "External-Link",
          icon: "link"
        }
      }
    ]
  }
]

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () =>
          import(
            /* webpackChunkName: 'dashboard' */ "@/views/dashboard/index.vue"
          ),
        meta: {
          title: "Dashboard", // 需要配置声明文件否则无提示
          icon: "dashboard"
        }
      }
    ]
  }
]

export const routes = [...constantRoutes, ...asyncRoutes]
export default createRouter({
  history: createWebHistory(),
  routes
})
