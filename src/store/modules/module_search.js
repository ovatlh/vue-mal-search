export default {
  state: {
    search_value_text: "",
    search_errors: false,
    search_show_results: false,
    search_total_finished: 0,
  },
  mutations: {
    mutSetSearchValueText(state, paramsValueText) {
      state.search_value_text = paramsValueText;
    },
    mutSetSearchShowErrors(state, paramsStatus) {
      state.search_errors = paramsStatus;
    },
    mutSetSearchShowResults(state, paramsStatus) {
      state.search_show_results = paramsStatus;
    },
    mutIncrementSearchTaskFinished(state) {
      state.search_total_finished += 1;
    },
    mutResetSearchTaskFinished(state) {
      state.search_total_finished = 0;
    },
  },
  actions: {
    actSaveSearchValueText(context, paramsValueText) {
      context.commit("mutSetSearchValueText", paramsValueText);
    },
    actSetSearchValueText(context, paramsValueText) {
      if (paramsValueText.length <= 2) {
        context.commit("mutSetSearchShowErrors", true);
      } else {
        context.commit("mutSetSearchValueText", paramsValueText);
        context.commit("mutSetSearchShowErrors", false);
        context.commit("mutSetSearchShowResults", true);
        context.commit("mutResetSearchTaskFinished");

        // Search Anime/Manga/Character/People
        context.dispatch("actLoadAnimeSearch", {
          num_page: 1,
          value_search: context.state.search_value_text,
        });

        context.dispatch("actLoadMangaSearch", {
          num_page: 1,
          value_search: context.state.search_value_text,
        });

        context.dispatch("actLoadCharacterSearch", {
          num_page: 1,
          value_search: context.state.search_value_text,
        });

        context.dispatch("actLoadPeopleSearch", {
          num_page: 1,
          value_search: context.state.search_value_text,
        });
      }
    },
    actIncrementSearchTaskFinished(context) {
      context.commit("mutIncrementSearchTaskFinished");
    },
  },
  getters: {
    gettSearchValueText(state) {
      return state.search_value_text;
    },
    gettSearchShowErrors(state) {
      return state.search_errors;
    },
    gettSearchShowResults(state) {
      return state.search_show_results;
    },
    gettSearchLoading(state) {
      return state.search_total_finished <= 3 ? true : false;
    },
    gettSearchLoaded(state) {
      return state.search_total_finished >= 4 ? true : false;
    },
    gettSearchTotalFinished(state) {
      return state.search_total_finished;
    },
  },
};
