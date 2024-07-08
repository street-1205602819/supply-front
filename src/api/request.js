import axios from 'axios'
import { ElMessage } from 'element-plus'
import qs from 'qs'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true, // send cookies when cross-domain requests
  crossDomain: true
})

service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (response.config.responseType === 'blob') {
      return Promise.resolve(res)
    }
    if (res.code !== 200) {
      if (response.config.requestType !== requestType.RETAIN) {
        ElMessage({
          message: res.msg || res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res)
    } else {
      return Promise.resolve(res)
    }
  },
  (error) => {
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export const axiosGet = (url, params, options) =>
  service.request({
    method: 'get',
    url,
    params,
    ...options
  })

export const axiosPostForm = (url, data, options) =>
  service.request({
    url,
    data: qs.stringify(data),
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    ...options
  })

export const axiosPost = (url, data, options) =>
  service.request({
    url,
    data,
    method: 'post',
    ...options
  })

export default service
