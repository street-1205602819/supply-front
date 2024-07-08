import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/hotspot',
      name: 'hotspot',
      component: HomeView,
      children: [
        {
          path: 'info_list',
          name: 'info_list',
          component: () => import('@/views/hotspot/info_list.vue'),
          meta: { title: '每日热点咨询' }
        }
      ]
    },
    {
      path: '/info-summary',
      name: 'info-summary',
      component: HomeView,
      children: [
        {
          path: 'data-show',
          name: 'data-show',
          component: () => import('@/views/info-summary/data-show.vue'),
          meta: { title: '信息汇总' }
        }
      ]
    },
    {
      path: '/law-search',
      name: 'law-search',
      component: HomeView,
      children: [
        {
          path: 'info',
          name: 'info',
          component: () => import('@/views/law-search/info.vue'),
          meta: { title: '法律查询' }
        }
      ]
    },
    {
      path: '/information',
      name: 'information',
      component: HomeView,
      children: [
        {
          path: 'edit',
          name: 'edit',
          component: () => import('@/views/information/edit.vue'),
          meta: { title: '每日咨询上传' }
        }
      ]
    }
  ]
})

export default router
