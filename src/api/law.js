import { axiosGet, axiosPost, axiosPostForm } from '@/api/request'

export const addRecord = (data) => axiosGet('/risk_analysis/legal/check/add/record', data)

export const updateRecord = (data) =>
  axiosPostForm('/risk_analysis/legal/check/update/record', data)

export const getRecordList = (data) => axiosGet('/risk_analysis/hot/consult/query/record', data)
