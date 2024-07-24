import { axiosGet, axiosPost } from '@/api/request'

export const getList = (data) => axiosGet('/risk_analysis/hot/consult/query/record', data)

export const downloadExcel = (data) => axiosPost('/risk_analysis/hot/consult/download/excel', data)
