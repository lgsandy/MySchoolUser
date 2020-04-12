import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

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
      requiresAuth: true
    },
    children: [
      {
        path: "/principal",
        name: "Principal",
        component: () => import("../components/principal/principalpage.vue")
      },
      {
        path: "/teachers",
        name: "Teachers",
        component: () => import("../components/teachers/teacherspage.vue")
      },
      {
        path: "/aboutus",
        name: "AboutUs",
        component: () => import("../components/aboutus/aboutuspage.vue")
      },
      {
        path: "/contactus",
        name: "ContactUs",
        component: () => import("../components/contactus/contactuspage.vue")
      },
      {
        path: "/careers",
        name: "Careers",
        component: () => import("../components/careers/careerspage.vue")
      },
      {
        path: "/:id",
        name: "Careers",
        component: () => import("../components/classes/class.vue")
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
    if (!localStorage.userLoginInfo) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (localStorage.userLoginInfo) {
      next("/main");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
