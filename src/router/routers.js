import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'
import i18n from '../i18n/index'

Vue.use(Router)

// 将路由表暴露出去,方便Vuex
export const constantRouterMap = [
  {
    path: '/login',
    meta: {
      title: String(i18n.t('global.login')),
      noCache: true
    },
    component: (resolve) => require(['@/views/Login'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/Home'], resolve),
        name: 'Dashboard',
        meta: {
          title: String(i18n.t('dashboard.title')),
          icon: 'index',
          affix: true,
          noCache: true
        }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: (resolve) => require(['@/views/userCenter'], resolve),
        name: String(i18n.t('center.title')),
        meta: {
          title: String(i18n.t('center.title'))
        }
      }
    ]
  }
]

export default new Router({
  // 使用history模式 (浏览器输入框没有#)
  mode: 'history',
  // 记住网页滚动条行为,y从0开始
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
