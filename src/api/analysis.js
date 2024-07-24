import { axiosGet, axiosPost } from '@/api/request'

export const getTradeWay = () => axiosGet('/risk_analysis/dependency/analysis/list/trade_way')

export const getDomesticAddress = () =>
  axiosGet('/risk_analysis/dependency/analysis/list/domestic_address')

export const getAnalysisList = (data) =>
  axiosGet('/risk_analysis/dependency/analysis/query/record', data)
