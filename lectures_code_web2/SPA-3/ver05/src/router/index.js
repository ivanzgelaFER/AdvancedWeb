import { createRouter, createWebHistory } from "vue-router";
import RecipesView from "../views/RecipesView.vue";
import CalculatorView from "../views/calculatorView.vue";
import NotFoundPage from "../views/NotFoundPage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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

export default router;
