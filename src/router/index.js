import { createRouter, createWebHistory } from 'vue-router'
import BaseParentComponent from '../views/BaseParentComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/base',
      name: 'base',
      component: BaseParentComponent
    }
  ]
})

export default router
