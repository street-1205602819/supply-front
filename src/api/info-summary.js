import { axiosGet } from '@/api/request'

export const getList = (data) => axiosGet('/risk_analysis/tweet/list_keyword', data)

export const getCategoryList = () => axiosGet('/risk_analysis/tweet/list_category')

export const deleteCategory = (data) => axiosGet('/risk_analysis/tweet/delete/category', data)

export const deleteKeyword = (data) => axiosGet('/risk_analysis/tweet/delete/keyword', data)

export const addCategory = (data) => axiosGet('/risk_analysis/tweet/add/category', data)

export const updateCategory = (data) => axiosGet('/risk_analysis/tweet/update/category', data)

export const addKeyword = (data) => axiosGet('/risk_analysis/tweet/add/keyword', data)

export const updateKeyword = (data) => axiosGet('/risk_analysis/tweet/update/keyword', data)

export const keywordCrawling = () => axiosGet('/risk_analysis/tweet/start/keyword_crawling')

export const checkCrawling = () => axiosGet('/risk_analysis/tweet/check/status')

export const userCrawling = () => axiosGet('/risk_analysis/tweet/start/user_crawling')

export const stopCrawling = () => axiosGet('/risk_analysis/tweet/stop/crawling')

export const getAnalysisList = (data) => axiosGet('/risk_analysis/tweet/list/keyword_tweet', data)

export const updateAnalysisRemark = (data) =>
  axiosGet('/risk_analysis/tweet/update/keyword_tweet', data)

export const analysisUserList = (data) => axiosGet('/risk_analysis/tweet/list/retweet_user', data)

export const analysisDelete = (data) => axiosGet('/risk_analysis/tweet/delete/keyword_tweet', data)
