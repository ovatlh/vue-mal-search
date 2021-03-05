import Vue from "vue";

export default {
  state: {
    anime_search_obj: {},
    anime_search_results: [],
    anime_search_last_page: 1,
    anime_search_actual_page: 1,
    anime_search_loading: true,

    anime_obj_info: {},
    anime_obj_character_staff: {},
    anime_list_character: [],
    anime_list_staff: [],
    anime_obj_loading: true,
    anime_obj_total_finished: 0,
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

    mutSaveAnimeObjInfo(state, paramsObj) {
      state.anime_obj_info = paramsObj;
    },
    mutSaveAnimeObjCharacterStaffObj(state, paramsObj) {
      state.anime_obj_character_staff = paramsObj;
    },
    mutSaveAnimeObjCharacterList(state, paramsList) {
      state.anime_list_character = paramsList;
    },
    mutSaveAnimeObjStaffList(state, paramsList) {
      state.anime_list_staff = paramsList;
    },
    mutStatusAnimeObjLoading(state, paramsStatus) {
      state.anime_obj_loading = paramsStatus;
    },
    mutIncrementAnimeObjSearchTaskFinished(state) {
      state.anime_obj_total_finished += 1;
    },
    mutResetAnimeObjSearchTaskFinished(state) {
      state.anime_obj_total_finished = 0;
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

    actLoadAnimeObj(context, paramsSearch) {
      var mal_id = paramsSearch.mal_id;

      var api = `https://api.jikan.moe/v3/anime/${mal_id}`;

      context.commit("mutSaveAnimeObjInfo", {});
      context.commit("mutStatusAnimeObjLoading", true);
      context.commit("mutResetAnimeObjSearchTaskFinished");
      
      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveAnimeObjInfo", response.data);
          
          document.title = `MAL - Anime: ${context.state.anime_obj_info.title}`;
        })
        .catch((error) => {
          console.error("Data-Anime_Obj: error", error);
        })
        .finally(() => {
          // context.commit("mutStatusAnimeObjLoading", false);
          context.commit("mutIncrementAnimeObjSearchTaskFinished");
          context.dispatch("actLoadAnimeCharacterStaffList", paramsSearch);
        });
    },
    actLoadAnimeCharacterStaffList(context, paramsSearch) {
      var mal_id = paramsSearch.mal_id;

      var api = `https://api.jikan.moe/v3/anime/${mal_id}/characters_staff`;

      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveAnimeObjCharacterStaffObj", response.data);
          context.commit("mutSaveAnimeObjCharacterList", context.state.anime_obj_character_staff.characters);
          context.commit("mutSaveAnimeObjStaffList", context.state.anime_obj_character_staff.staff);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          context.commit("mutIncrementAnimeObjSearchTaskFinished");
          context.commit("mutStatusAnimeObjLoading", false);
        });
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

    gettAnimeObjInfo(state) {
      return state.anime_obj_info;
    },
    gettAnimeListCharacter(state) {
      return state.anime_list_character;
    },
    gettAnimeListStaff(state) {
      return state.anime_list_staff;
    },
    gettAnimeObjLoading(state) {
      return state.anime_obj_loading;
    },
    gettAnimeObjTaskFinished(state) {
      return state.anime_obj_total_finished;
    },
  },
};
