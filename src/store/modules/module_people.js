import Vue from "vue";

export default {
  state: {
    people_search_obj: {},
    people_search_results: [],
    people_search_last_page: 1,
    people_search_actual_page: 1,
    people_search_loading: true,
  },
  mutations: {
    mutSavePeopleSearchResultObj(state, paramsObj) {
      state.people_search_obj = paramsObj;
    },
    mutSavePeopleSearchResults(state, paramsResults) {
      state.people_search_results = paramsResults;
    },
    mutResetPeopleSearchActualPage(state) {
      state.people_search_actual_page = 1;
    },
    mutSavePeopleSearchLastPage(state, paramsLastPage) {
      state.people_search_last_page = paramsLastPage;
    },
    mutStatusPeopleSearchLoading(state, paramsStatus) {
      state.people_search_loading = paramsStatus;
    },

    mutPeopleFirstPage(state) {
      state.people_search_actual_page = 1;
    },
    mutPeoplePrevPage(state) {
      state.people_search_actual_page -= 1;
    },
    mutPeopleNextPage(state) {
      state.people_search_actual_page += 1;
    },
    mutPeopleLastPage(state) {
      state.people_search_actual_page = state.people_search_last_page;
    },
  },
  actions: {
    actLoadPeopleSearch(context, paramsSearch) {
      var num_page = paramsSearch.num_page;
      var value_search = paramsSearch.value_search;

      var api = `https://api.jikan.moe/v3/search/person?q=${value_search}&page=${num_page}`;

      context.commit("mutStatusPeopleSearchLoading", true);
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
          context.commit("mutStatusPeopleSearchLoading", false);
          context.dispatch("actIncrementSearchTaskFinished");
        });
    },
    
    actPeopleResetActualPage(context) {
      context.commit("mutResetPeopleSearchActualPage");
    },
    actPeopleFirstPage(context) {
      context.commit("mutPeopleFirstPage");
    },
    actPeoplePrevPage(context) {
      context.commit("mutPeoplePrevPage");
    },
    actPeopleNextPage(context) {
      context.commit("mutPeopleNextPage");
    },
    actPeopleLastPage(context) {
      context.commit("mutPeopleLastPage");
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
    gettPeopleSearchLoading(state) {
      return state.people_search_loading;
    },
  },
};
