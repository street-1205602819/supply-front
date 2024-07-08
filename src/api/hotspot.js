import { axiosGet, axiosPost } from '@/api/request'

export const getList = (data) => axiosGet('/web/extension/detail/reference/app/list', data)
