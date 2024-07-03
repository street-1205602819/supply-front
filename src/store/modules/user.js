const state = {
  menus: [
    {
      name: '每日热点咨询',
      route: 'hotspot',
      children: [
        {
          name: '',
          route: 'info_list',
        }
      ]
    },
    {
      name: '信息汇总',
      route: 'info-summary',
      children: [
        {
          name: '',
          route: 'data-show',
        }
      ]
    },
  ],
}

const mutations = {

}

const actions = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}