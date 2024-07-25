import { axiosGet, axiosPostForm } from '@/api/request'

export const getRecord = (data) => axiosGet('/risk_analysis/hot/consult/query/record', data)

export const deleteRecord = (data) => axiosGet('/risk_analysis/hot/consult/delete/record', data)

export const updateRecord = (data) =>
  axiosPostForm('/risk_analysis/hot/consult/update/record', data)
