import Vue from "vue";

export default {
  state: {
    character_search_obj: {},
    character_search_results: [],
    character_search_last_page: 1,
    character_search_actual_page: 1,
    character_search_loading: true,

    character_obj_info: {},
    character_list_animeography: [],
    character_list_mangaography: [],
    character_list_voice_actors: [],
    character_obj_loading: true,
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

    mutSaveCharacterObjInfo(state, paramsObj){
      state.character_obj_info = paramsObj;
    },
    mutSaveCharacterObjAnimeography(state, paramsList){
      state.character_list_animeography = paramsList;
    },
    mutSaveCharacterObjMangaography(state, paramsList){
      state.character_list_mangaography = paramsList;
    },
    mutSaveCharacterObjVoiceActors(state, paramsList){
      state.character_list_voice_actors = paramsList;
    },
    mutStatusCharacterObjLoading(state, paramsStatus){
      state.character_obj_loading = paramsStatus;
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

    actLoadCharacterObj(context, paramsSearch){
      var mal_id = paramsSearch.mal_id;

      var api = `https://api.jikan.moe/v3/character/${mal_id}`;

      context.commit("mutSaveCharacterObjInfo", {});
      context.commit("mutStatusCharacterObjLoading", true);

      Vue.axios
        .get(api)
        .then((response) => {
          context.commit("mutSaveCharacterObjInfo", response.data);
          context.commit("mutSaveCharacterObjAnimeography", context.state.character_obj_info.animeography);
          context.commit("mutSaveCharacterObjMangaography", context.state.character_obj_info.mangaography);
          context.commit("mutSaveCharacterObjVoiceActors", context.state.character_obj_info.voice_actors);

          document.title = `MAL - Character: ${context.state.character_obj_info.name}`;
        })
        .catch((error) => {
          console.error("Data-Character_obj: error", error);
        })
        .finally(() => {
          context.commit("mutStatusCharacterObjLoading", false);
        })
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

    gettCharacterObjInfo(state){
      return state.character_obj_info;
    },
    gettCharacterListAnimeography(state){
      return state.character_list_animeography;
    },
    gettCharacterListMangaography(state){
      return state.character_list_mangaography;
    },
    gettCharacterListVoiceActors(state){
      return state.character_list_voice_actors;
    },
    gettCharacterObjLoading(state){
      return state.character_obj_loading;
    },
  },
};
