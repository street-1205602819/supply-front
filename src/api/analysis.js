import { axiosGet } from '@/api/request'

export const getTradeWay = () => axiosGet('/risk_analysis/dependency/analysis/list/trade_way')

export const getDomesticAddress = () =>
  axiosGet('/risk_analysis/dependency/analysis/list/domestic_address')

export const getAnalysisList = (data) =>
  axiosGet('/risk_analysis/dependency/analysis/query/record', data)

export const deleteRecord = (data) =>
  axiosGet('/risk_analysis/dependency/analysis/delete/record', data)

export const getTradeCountry = (data) =>
  axiosGet('/risk_analysis/dependency/analysis/list/trade_country', data)

export const getAnalysisSummary = (data) =>
  axiosGet('/risk_analysis/dependency/analysis/list/graph_data', data)

export const getDependenceList = (data) =>
  axiosGet('/risk_analysis/dependency/analysis/list/commodity_analysis', data)
