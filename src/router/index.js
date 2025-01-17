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
    path: "/about",
    name: "About",
    component: () =>
      import(
        /* webpackChunkName: "chunckAboutView" */ "../views/Others/AboutView.vue"
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
    path: "/anime/:mal_id",
    name: "Anime",
    component: () =>
      import(
        /* webpackChunkName: "chunckAnimeObjView" */ "../views/Anime/AnimeObjView.vue"
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
    path: "/manga/:mal_id",
    name: "Manga",
    component: () =>
      import(
        /* webpackChunkName: "chunckMangaObjView" */ "../views/Manga/MangaObjView.vue"
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
    path: "/character/:mal_id",
    name: "Character",
    component: () =>
      import(
        /* webpackChunkName: "chunckCharacterObjView" */ "../views/Character/CharacterObjView.vue"
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
    path: "/person/:mal_id",
    name: "Person",
    component: () =>
      import(
        /* webpackChunkName: "chunckPeopleObjView" */ "../views/People/PeopleObjView.vue"
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
