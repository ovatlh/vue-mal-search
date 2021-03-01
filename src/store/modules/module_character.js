import Vue from "vue";

export default {
  state: {
    character_search_obj: {},
    character_search_results: [],
    character_search_last_page: 1,
    character_search_actual_page: 1,
    character_search_loading: true,
  },
  mutations: {
    mutSaveCharacterSearchResultObj(state, paramsObj) {
      state.character_search_obj = paramsObj;
    },
    mutSaveCharacterSearchResults(state, paramsResults) {
      state.character_search_results = paramsResults;
    },
    mutResetCharacterSearchActualPage(state) {
      state.character_search_actual_page = 1;
    },
    mutSaveCharacterSearchLastPage(state, paramsLastPage) {
      state.character_search_last_page = paramsLastPage;
    },
    mutStatusCharacterSearchLoading(state, paramsStatus) {
      state.character_search_loading = paramsStatus;
    },

    mutCharacterFirstPage(state) {
      state.character_search_actual_page = 1;
    },
    mutCharacterPrevPage(state) {
      state.character_search_actual_page -= 1;
    },
    mutCharacterNextPage(state) {
      state.character_search_actual_page += 1;
    },
    mutCharacterLastPage(state) {
      state.character_search_actual_page = state.character_search_last_page;
    },
  },
  actions: {
    actLoadCharacterSearch(context, paramsSearch) {
      var num_page = paramsSearch.num_page;
      var value_search = paramsSearch.value_search;

      var api = `https://api.jikan.moe/v3/search/character?q=${value_search}&page=${num_page}`;

      context.commit("mutStatusCharacterSearchLoading", true);
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
          context.commit("mutStatusCharacterSearchLoading", false);
          context.dispatch("actIncrementSearchTaskFinished");
        });
    },
    
    actCharacterResetActualPage(context) {
      context.commit("mutResetCharacterSearchActualPage");
    },
    actCharacterFirstPage(context) {
      context.commit("mutCharacterFirstPage");
    },
    actCharacterPrevPage(context) {
      context.commit("mutCharacterPrevPage");
    },
    actCharacterNextPage(context) {
      context.commit("mutCharacterNextPage");
    },
    actCharacterLastPage(context) {
      context.commit("mutCharacterLastPage");
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
    gettCharacterSearchLoading(state) {
      return state.character_search_loading;
    },
  },
};
