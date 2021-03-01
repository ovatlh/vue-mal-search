import Vue from "vue";

export default {
  state: {
    people_search_obj: {},
    people_search_results: [],
    people_search_last_page: 1,
    people_search_actual_page: 1,
  },
  mutations: {
    mutSavePeopleSearchResultObj(state, paramsObj) {
      state.people_search_obj = paramsObj;
    },
    mutSavePeopleSearchResults(state, paramsResults) {
      state.people_search_results = paramsResults;
    },
    mutSavePeopleSearchLastPage(state, paramsLastPage) {
      state.people_search_last_page = paramsLastPage;
    },
  },
  actions: {
    actLoadPeopleSearch(context, paramsSearch) {
      var num_page = paramsSearch.num_page;
      var value_search = paramsSearch.value_search;

      var api = `https://api.jikan.moe/v3/search/person?q=${value_search}&page=${num_page}`;

      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSavePeopleSearchResultObj", response.data);

          context.commit(
            "mutSavePeopleSearchResults",
            context.state.people_search_obj.results
          );

          context.commit(
            "mutSavePeopleSearchLastPage",
            context.state.people_search_obj.last_page
          );
        })
        .catch((error) => {
          console.error("Data-People: error", error);
        })
        .finally(() => {
          context.dispatch("actIncrementSearchTaskFinished");
        });
    },
  },
  getters: {
    gettPeopleSearchResults(state) {
      return state.people_search_results;
    },
    gettPeopleSearchLastPage(state) {
      return state.people_search_last_page;
    },
    gettPeopleSearchActualPage(state) {
      return state.people_search_actual_page;
    },
  },
};
