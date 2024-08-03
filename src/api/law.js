import { axiosGet, axiosPost, axiosPostForm } from '@/api/request'

export const addRecord = (data) => axiosGet('/risk_analysis/legal/check/add/record', data)

export const updateRecord = (data) =>
  axiosPostForm('/risk_analysis/legal/check/update/record', data)

export const getRecordList = (data) => axiosGet('/risk_analysis/legal/check/query/record', data)

export const deleteRecord = (data) => axiosGet('/risk_analysis/legal/check/delete/record', data)
