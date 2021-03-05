import Vue from "vue";

export default {
  state: {
    manga_search_obj: {},
    manga_search_results: [],
    manga_search_last_page: 1,
    manga_search_actual_page: 1,
    manga_search_loading: true,

    manga_obj_info: {},
    manga_obj_character: {},
    manga_list_character: [],
    manga_list_authors: [],
    manga_obj_loading: true,
    manga_obj_total_finished: 0,
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

    mutSaveMangaObjInfo(state, paramsObj) {
      state.manga_obj_info = paramsObj;
    },
    mutSaveMangaObjCharacterObj(state, paramsObj) {
      state.manga_obj_character = paramsObj;
    },
    mutSaveMangaObjCharacterList(state, paramsList) {
      state.manga_list_character = paramsList;
    },
    mutSaveMangaObjAuthorsList(state, paramsList) {
      state.manga_list_authors = paramsList;
    },
    mutStatusMangaObjLoading(state, paramsStatus) {
      state.manga_obj_loading = paramsStatus;
    },
    mutIncrementMangaObjSearchTaskFinished(state) {
      state.manga_obj_total_finished += 1;
    },
    mutResetMangaObjSearchTaskFinished(state) {
      state.manga_obj_total_finished = 0;
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

    actLoadMangaObj(context, paramsSearch) {
      var mal_id = paramsSearch.mal_id;

      var api = `https://api.jikan.moe/v3/manga/${mal_id}`;

      context.commit("mutSaveMangaObjInfo", {});
      context.commit("mutStatusMangaObjLoading", true);
      context.commit("mutResetMangaObjSearchTaskFinished");

      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveMangaObjInfo", response.data);
          context.commit(
            "mutSaveMangaObjAuthorsList",
            context.state.manga_obj_info.authors
          );
          
          document.title = `MAL - Manga: ${context.state.manga_obj_info.title}`;
        })
        .catch((error) => {
          console.error("Data-Manga_Obj: error", error);
        })
        .finally(() => {
          context.commit("mutIncrementMangaObjSearchTaskFinished");
          context.dispatch("actLoadMangaCharacterList", paramsSearch);
        });
    },
    actLoadMangaCharacterList(context, paramsSearch) {
      var mal_id = paramsSearch.mal_id;

      var api = `https://api.jikan.moe/v3/manga/${mal_id}/characters`;

      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveMangaObjCharacterObj", response.data);
          context.commit(
            "mutSaveMangaObjCharacterList",
            context.state.manga_obj_character.characters
          );
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          context.commit("mutIncrementMangaObjSearchTaskFinished");
          context.commit("mutStatusMangaObjLoading", false);
        });
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

    gettMangaObjInfo(state) {
      return state.manga_obj_info;
    },
    gettMangaCharacterList(state) {
      return state.manga_list_character;
    },
    gettMangaAuthorsList(state) {
      return state.manga_list_authors;
    },
    gettMangaObjLoading(state) {
      return state.manga_obj_loading;
    },
    gettMangaObjTaskFinished(state) {
      return state.manga_obj_total_finished;
    },
  },
};
