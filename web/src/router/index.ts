import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import { authUser } from "@/services/auth";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { isPublic: true },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { isPublic: true },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
  ],
});

router.beforeEach(async (to, _from, next) => {
  try {
    if (to.meta.isPublic) {
      return next();
    }

    if (await authUser()) {
      return next();
    }

    return next("/login");
  } catch (err) {
    localStorage.setItem("user", "");
    localStorage.setItem("token", "");

    return next("/login");
  }
});

export default router;
