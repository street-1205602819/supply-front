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
    // console.log(response);
    if (String(response.headers['content-type']).includes('application/vnd.vnd.ms-excel')) {
      return Promise.resolve(response)
    }
    if (response.config.responseType === 'blob') {
      return Promise.resolve(res)
    }
    if (res.code !== 1) {
      ElMessage({
        message: res.data || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(res)
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error) => {
    ElMessage.error(error.message || '请求失败')
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

export const download = (url, data) => {
  axios({
    method: 'post',
    url: import.meta.env.VITE_BASE_URL + url,
    responseType: 'blob',
    data
  }).then(function (response) {
    const blob = new Blob([response.data])
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', '热点资讯数据.xlsx')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    ElMessage.success('操作成功')
  })
}
export default service
