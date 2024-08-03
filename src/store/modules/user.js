const state = {
  menus: [
    {
      name: '每日热点咨询',
      route: 'hotspot',
      children: [
        {
          name: '',
          route: 'info_list'
        }
      ]
    },
    {
      name: '依赖性分析',
      route: 'analysis',
      children: [
        {
          name: '',
          route: 'analysis_list'
        }
      ]
    },
    {
      name: '舆情形势',
      route: 'info-summary',
      children: [
        {
          name: '',
          route: 'data-show'
        }
      ]
    },
    {
      name: '法律查询',
      route: 'law-search',
      children: [
        {
          name: '',
          route: 'info'
        }
      ]
    },
    {
      name: '每日咨询上传',
      route: 'information',
      children: [
        {
          name: '',
          route: 'edit'
        }
      ]
    }
  ]
}

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
