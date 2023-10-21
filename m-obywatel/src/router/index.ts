import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/clinics'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/clinics'
      },
      {
        path: 'clinics',
        component: () => import('@/views/Clinics.vue')
      },
      {
        path: 'sors',
        component: () => import('@/views/SORs.vue')
      },
      {
        path: 'aeds',
        component: () => import('@/views/AEDs.vue')
      },
      {
        path: 'blood-points',
        component: () => import('@/views/BloodPoints.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
