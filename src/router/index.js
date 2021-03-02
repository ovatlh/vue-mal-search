import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    alias: "/",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "chunckHomeView" */ "../views/Others/HomeView.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () =>
      import(
        /* webpackChunkName: "chunckSearchView" */ "../views/Others/SearchView.vue"
      ),
  },
  {
    path: "/animes",
    name: "Animes",
    component: () =>
      import(
        /* webpackChunkName: "chunckAnimeResultsView" */ "../views/Anime/AnimeResultsView.vue"
      ),
  },
  {
    path: "/mangas",
    name: "Mangas",
    component: () =>
      import(
        /* webpackChunkName: "chunckMangaResultsView" */ "../views/Manga/MangaResultsView.vue"
      ),
  },
  {
    path: "/characters",
    name: "Characters",
    component: () =>
      import(
        /* webpackChunkName: "chunckCharacterResultsView" */ "../views/Character/CharacterResultsView.vue"
      ),
  },
  {
    path: "/people",
    name: "People",
    component: () =>
      import(
        /* webpackChunkName: "chunckPeopleResultsView" */ "../views/People/PeopleResultsView.vue"
      ),
  },
  {
    path: "*",
    name: "NotFound",
    component: () =>
      import(
        /* webpackChunkName: "chunkNotFoundView" */ "../views/Others/NotFoundView.vue"
      ),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
