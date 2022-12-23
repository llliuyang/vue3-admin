import { defineStore } from "pinia"
import { login as loginApi } from "@/api/user"
import { removeToken, setToken } from "@/utils/auth"
import { useTagsView } from "@/stores/tagsView"

export interface IUserInfo {
  username: string
  password: string
}

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    token: ""
  })
  const login = async (userInfo: IUserInfo) => {
    try {
      const { username, password } = userInfo
      const response = await loginApi({
        username: username.trim(),
        password
      })
      const { data } = response
      state.token = data.token
      setToken(data.token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const { delAllViews } = useTagsView()
  const logout = () => {
    // 清空store里的token
    state.token = ""
    // 清空本地缓存的token
    removeToken()
    // 清除所有标签页
    delAllViews()
  }

  return {
    state,
    login,
    logout
  }
})
