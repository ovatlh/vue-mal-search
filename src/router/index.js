import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    alias: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "chunckHomeView" */ "../views/HomeView.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(
        /* webpackChunkName: "chunckSearchView" */ "../views/SearchView.vue"
      ),
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "chunkNotFoundView" */ "../views/NotFoundView.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
