import { createRouter, createWebHistory } from "vue-router";
import RecipesView from "../views/RecipesView.vue";
import CalculatorView from "../views/calculatorView.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import LoginView from "../views/LoginView.vue";
import { useAuthStore } from "../stores/auth";
const Disco = () => import("../views/DiscoView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/",
      name: "recipes",
      component: RecipesView,
    },
    {
      path: "/recipes/:id?",
      name: "recipes-id",
      component: RecipesView,
    },
    {
      path: "/disco",
      component: Disco,
    },
    {
      path: "/calculator",
      name: "calculator",
      component: CalculatorView,
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //component: () => import("../views/CalculatorView.vue"),  ostavimo ovo za kasnije...
    },
    {
      path: "/:catchAll(.*)*",
      name: "NotFound",
      component: NotFoundPage,
    },
  ],
});
// Taken from: https: //jasonwatmore.com/post/2022/06/07/vue-3-redirect-to-login-page-if-unauthenticated
router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();
  if (authRequired && !auth.isAuthenticated) {
    auth.setLandingUrl(to.fullPath);
    return "/login";
  }
});

export default router;
