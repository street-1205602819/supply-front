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
          meta: { title: '每日热点咨询'}
        },
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
          meta: { title: '信息汇总'}
        },
      ]
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
