import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/editmovie/:id",
    name: "EditMovie",
    component: () => import("../views/EditMovie.vue"),
  },
  {
    path: "/viewmovie/:id",
    name: "ViewMovie",
    component: () => import("../views/ViewMovie.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
