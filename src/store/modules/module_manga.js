import Vue from "vue";

export default {
  state: {
    manga_search_obj: {},
    manga_search_results: [],
    manga_search_last_page: 1,
    manga_search_actual_page: 1,
    manga_search_loading: true,
  },
  mutations: {
    mutSaveMangaSearchResultObj(state, paramsObj) {
      state.manga_search_obj = paramsObj;
    },
    mutSaveMangaSearchResults(state, paramsResults) {
      state.manga_search_results = paramsResults;
    },
    mutResetMangaSearchActualPage(state) {
      state.manga_search_actual_page = 1;
    },
    mutSaveMangaSearchLastPage(state, paramsLastPage) {
      state.manga_search_last_page = paramsLastPage;
    },
    mutStatusMangaSearchLoading(state, paramsStatus) {
      state.manga_search_loading = paramsStatus;
    },

    mutMangaFirstPage(state) {
      state.manga_search_actual_page = 1;
    },
    mutMangaPrevPage(state) {
      state.manga_search_actual_page -= 1;
    },
    mutMangaNextPage(state) {
      state.manga_search_actual_page += 1;
    },
    mutMangaLastPage(state) {
      state.manga_search_actual_page = state.manga_search_last_page;
    },
  },
  actions: {
    actLoadMangaSearch(context, paramsSearch) {
      var num_page = paramsSearch.num_page;
      var value_search = paramsSearch.value_search;

      var api = `https://api.jikan.moe/v3/search/manga?q=${value_search}&page=${num_page}`;

      context.commit("mutStatusMangaSearchLoading", true);
      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveMangaSearchResultObj", response.data);

          context.commit(
            "mutSaveMangaSearchResults",
            context.state.manga_search_obj.results
          );

          context.commit(
            "mutSaveMangaSearchLastPage",
            context.state.manga_search_obj.last_page
          );
        })
        .catch((error) => {
          console.error("Data-Manga: error", error);
        })
        .finally(() => {
          context.commit("mutStatusMangaSearchLoading", false);
          context.dispatch("actIncrementSearchTaskFinished");
        });
    },
    
    actMangaResetActualPage(context) {
      context.commit("mutResetMangaSearchActualPage");
    },
    actMangaFirstPage(context) {
      context.commit("mutMangaFirstPage");
    },
    actMangaPrevPage(context) {
      context.commit("mutMangaPrevPage");
    },
    actMangaNextPage(context) {
      context.commit("mutMangaNextPage");
    },
    actMangaLastPage(context) {
      context.commit("mutMangaLastPage");
    },
  },
  getters: {
    gettMangaSearchResults(state) {
      return state.manga_search_results;
    },
    gettMangaSearchLastPage(state) {
      return state.manga_search_last_page;
    },
    gettMangaSearchActualPage(state) {
      return state.manga_search_actual_page;
    },
    gettMangaSearchLoading(state) {
      return state.manga_search_loading;
    },
  },
};
