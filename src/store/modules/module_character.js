import Vue from "vue";

export default {
  state: {
    character_search_obj: {},
    character_search_results: [],
    character_search_last_page: 1,
    character_search_actual_page: 1,
  },
  mutations: {
    mutSaveCharacterSearchResultObj(state, paramsObj) {
      state.character_search_obj = paramsObj;
    },
    mutSaveCharacterSearchResults(state, paramsResults) {
      state.character_search_results = paramsResults;
    },
    mutSaveCharacterSearchLastPage(state, paramsLastPage) {
      state.character_search_last_page = paramsLastPage;
    },
  },
  actions: {
    actLoadCharacterSearch(context, paramsSearch) {
      var num_page = paramsSearch.num_page;
      var value_search = paramsSearch.value_search;

      var api = `https://api.jikan.moe/v3/search/character?q=${value_search}&page=${num_page}`;

      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveCharacterSearchResultObj", response.data);

          context.commit(
            "mutSaveCharacterSearchResults",
            context.state.character_search_obj.results
          );

          context.commit(
            "mutSaveCharacterSearchLastPage",
            context.state.character_search_obj.last_page
          );
        })
        .catch((error) => {
          console.error("Data-Character: error", error);
        })
        .finally(() => {
          context.dispatch("actIncrementSearchTaskFinished");
        });
    },
  },
  getters: {
    gettCharacterSearchResults(state) {
      return state.character_search_results;
    },
    gettCharacterSearchLastPage(state) {
      return state.character_search_last_page;
    },
    gettCharacterSearchActualPage(state) {
      return state.character_search_actual_page;
    },
  },
};
