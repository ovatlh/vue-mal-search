import Vue from "vue";

export default {
  state: {
    anime_search_obj: {},
    anime_search_results: [],
    anime_search_last_page: 1,
    anime_search_actual_page: 1,
    anime_search_loading: true,
  },
  mutations: {
    mutSaveAnimeSearchResultObj(state, paramsObj) {
      state.anime_search_obj = paramsObj;
    },
    mutSaveAnimeSearchResults(state, paramsResults) {
      state.anime_search_results = paramsResults;
    },
    mutResetAnimeSearchActualPage(state) {
      state.anime_search_actual_page = 1;
    },
    mutSaveAnimeSearchLastPage(state, paramsLastPage) {
      state.anime_search_last_page = paramsLastPage;
    },
    mutStatusAnimeSearchLoading(state, paramsStatus) {
      state.anime_search_loading = paramsStatus;
    },

    mutAnimeFirstPage(state) {
      state.anime_search_actual_page = 1;
    },
    mutAnimePrevPage(state) {
      state.anime_search_actual_page -= 1;
    },
    mutAnimeNextPage(state) {
      state.anime_search_actual_page += 1;
    },
    mutAnimeLastPage(state) {
      state.anime_search_actual_page = state.anime_search_last_page;
    },
  },
  actions: {
    actLoadAnimeSearch(context, paramsSearch) {
      var num_page = paramsSearch.num_page;
      var value_search = paramsSearch.value_search;

      var api = `https://api.jikan.moe/v3/search/anime?q=${value_search}&page=${num_page}`;

      context.commit("mutStatusAnimeSearchLoading", true);
      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveAnimeSearchResultObj", response.data);

          context.commit(
            "mutSaveAnimeSearchResults",
            context.state.anime_search_obj.results
          );

          context.commit(
            "mutSaveAnimeSearchLastPage",
            context.state.anime_search_obj.last_page
          );
        })
        .catch((error) => {
          console.error("Data-Anime: error", error);
        })
        .finally(() => {
          context.commit("mutStatusAnimeSearchLoading", false);
          context.dispatch("actIncrementSearchTaskFinished");
        });
    },
    
    actAnimeResetActualPage(context) {
      context.commit("mutResetAnimeSearchActualPage");
    },
    actAnimeFirstPage(context) {
      context.commit("mutAnimeFirstPage");
    },
    actAnimePrevPage(context) {
      context.commit("mutAnimePrevPage");
    },
    actAnimeNextPage(context) {
      context.commit("mutAnimeNextPage");
    },
    actAnimeLastPage(context) {
      context.commit("mutAnimeLastPage");
    },
  },
  getters: {
    gettAnimeSearchResults(state) {
      return state.anime_search_results;
    },
    gettAnimeSearchLastPage(state) {
      return state.anime_search_last_page;
    },
    gettAnimeSearchActualPage(state) {
      return state.anime_search_actual_page;
    },
    gettAnimeSearchLoading(state) {
      return state.anime_search_loading;
    },
  },
};
