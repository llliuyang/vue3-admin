<template>
  <el-dropdown class="avatar-container">
    <div class="avatar-wrapper">
      <img :src="avatar" class="user-avatar" alt="" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <router-link v-for="item in avatarMenu" :to="item.to" :key="item.to">
          <el-dropdown-item> {{ item.label }}</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided @click="logout">
          <span style="display: block">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import avatar from "@/assets/vue.svg"
import { useUserStore } from "@/stores/user"

const avatarMenu = [
  {
    to: "/",
    label: "首页"
  },
  {
    to: "/profile/index",
    label: "个人设置"
  }
]

const store = useUserStore()
const { proxy } = getCurrentInstance()!

const logout = () => {
  store.logout()
  proxy?.$message.success("退出登录")
  window.location.reload()
}
</script>

<style lang="scss" scoped>
.avatar-container {
  .avatar-wrapper {
    margin-top: 5px;
    .user-avatar {
      width: 30px;
      height: 30px;
      border-radius: 10px;
      cursor: pointer;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      font-size: 12px;
    }
  }
}
</style>
