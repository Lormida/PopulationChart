import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { RouteConstants } from '~/shared/constants'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: RouteConstants.HOME.path,
      name: RouteConstants.HOME.name,
      component: HomeView,
    },
  ],
})

export default router
