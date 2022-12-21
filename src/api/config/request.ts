import axios from "axios"
import { getToken } from "@/utils/auth"
import { ElMessage } from "element-plus"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000
})
// 设置请求拦截
service.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      // 携带token
      config.headers!.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 设置响应拦截
service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code !== 0) {
      ElMessage.error(message)
      return Promise.reject(message)
    }
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service
