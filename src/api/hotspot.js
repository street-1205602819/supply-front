import { axiosGet, download } from '@/api/request'

export const getList = (data) => axiosGet('/risk_analysis/hot/consult/query/record', data)

export const downloadExcel = (data) => download('/risk_analysis/hot/consult/download/excel', data)
