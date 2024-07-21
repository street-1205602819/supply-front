import { axiosGet, axiosPost } from '@/api/request'

export const getList = (data) => axiosGet('/risk_analysis/dependency/analysis/list/trade_type', data)
