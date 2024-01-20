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
      path: '/myPreviousExams',
      name: 'myPreviousExams',
      component: () => import('../views/PreviousExams.vue')
    },
    {
      path: '/tickets',
      name: 'tickets',
      component: () => import('../views/Tickets.vue')
    },
    {
      path: '/exam',
      name: 'exam',
      component: () => import('../views/Exam.vue')
    },
  ]
})

export default router
