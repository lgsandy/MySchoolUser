import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/signup",
    name: "Signup",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
    meta: {
      requiresGuest: true
    }
  },
  {
    path: "/main",
    name: "Main",
    component: () => import("../components/Main.vue"),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("../components/Dashboard.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//check all router for auth
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogedIn) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (store.getters.isLogedIn) {
      next("/main");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;