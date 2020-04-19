import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../components/home/homepage.vue";
import Principal from "../components/principal/principalpage.vue";
import Teachers from "../components/teachers/teacherspage.vue";
import AboutUs from "../components/aboutus/aboutuspage.vue";
import ContactUs from "../components/contactus/contactuspage";
import Careers from "../components/careers/careerspage.vue";
import Classes from "../components/classes/class.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "Login",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },

  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/principal",
    name: "Principal",
    component: Principal,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/teachers",
    name: "Teachers",
    component: Teachers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/aboutus",
    name: "AboutUs",
    component: AboutUs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/contactus",
    name: "ContactUs",
    component: ContactUs,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/careers",
    name: "Careers",
    component: Careers,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/:id",
    name: "Classes",
    component: Classes,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//check all router for auth
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.userLoginInfo) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (localStorage.userLoginInfo) {
      next("/home");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
