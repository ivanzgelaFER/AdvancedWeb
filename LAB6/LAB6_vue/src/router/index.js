import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from "../stores/auth";

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
    {
      path: "/login",
      name: "login",
      component: () => import('../views/Login.vue'),
    },
    { 
      path: "/:catchAll(.*)*",
      name: "NotFound",
      component: () => import('../views/NotFound.vue'),
    },

  ]
});

router.beforeEach(async (to) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.isAuthenticated) {
    auth.setLandingUrl(to.fullPath);
    return "/login";
  }
});

export default router
