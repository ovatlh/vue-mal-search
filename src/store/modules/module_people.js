import Vue from "vue";

export default {
  state: {
    people_search_obj: {},
    people_search_results: [],
    people_search_last_page: 1,
    people_search_actual_page: 1,
    people_search_loading: true,

    people_obj_info: {},
    people_list_roles: [],
    people_list_roles_by_character: [
      {
        mal_id: 1,
        name: "Character test - 01",
        image_url: null,
        animes: [
          {
            mal_id: 1,
            name: "Anime test - 01",
            image_url: null,
            role: "Role test - 01",
          },
          {
            mal_id: 2,
            name: "Anime test - 02",
            image_url: null,
            role: "Role test - 02",
          },
          {
            mal_id: 3,
            name: "Anime test - 03",
            image_url: null,
            role: "Role test - 03",
          },
        ],
      },
      {
        mal_id: 2,
        name: "Character test - 02",
        image_url: null,
        animes: [
          {
            mal_id: 1,
            name: "Anime test - 01",
            image_url: null,
            role: "Role test - 01",
          },
          {
            mal_id: 2,
            name: "Anime test - 02",
            image_url: null,
            role: "Role test - 02",
          },
          {
            mal_id: 3,
            name: "Anime test - 03",
            image_url: null,
            role: "Role test - 03",
          },
        ],
      },
      {
        mal_id: 3,
        name: "Character test - 03",
        image_url: null,
        animes: [
          {
            mal_id: 1,
            name: "Anime test - 01",
            image_url: null,
            role: "Role test - 01",
          },
          {
            mal_id: 2,
            name: "Anime test - 02",
            image_url: null,
            role: "Role test - 02",
          },
          {
            mal_id: 3,
            name: "Anime test - 03",
            image_url: null,
            role: "Role test - 03",
          },
        ],
      },
    ],
    people_list_roles_by_anime: [
      {
        mal_id: 1,
        name: "Anime test - 01",
        image_url: null,
        characters: [
          {
            mal_id: 1,
            name: "Character test - 01",
            image_url: null,
            role: "Role test - 01",
          },
          {
            mal_id: 2,
            name: "Character test - 02",
            image_url: null,
            role: "Role test - 02",
          },
          {
            mal_id: 3,
            name: "Character test - 03",
            image_url: null,
            role: "Role test - 03",
          },
        ],
      },
      {
        mal_id: 2,
        name: "Anime test - 02",
        image_url: null,
        characters: [
          {
            mal_id: 1,
            name: "Character test - 01",
            image_url: null,
            role: "Role test - 01",
          },
          {
            mal_id: 2,
            name: "Character test - 02",
            image_url: null,
            role: "Role test - 02",
          },
          {
            mal_id: 3,
            name: "Character test - 03",
            image_url: null,
            role: "Role test - 03",
          },
        ],
      },
      {
        mal_id: 3,
        name: "Anime test - 03",
        image_url: null,
        characters: [
          {
            mal_id: 1,
            name: "Character test - 01",
            image_url: null,
            role: "Role test - 01",
          },
          {
            mal_id: 2,
            name: "Character test - 02",
            image_url: null,
            role: "Role test - 02",
          },
          {
            mal_id: 3,
            name: "Character test - 03",
            image_url: null,
            role: "Role test - 03",
          },
        ],
      },
    ],
    //people_list_roles_by_selected: 0, //0: none, 1: character, 2: anime
    people_list_published_manga: [],
    people_list_anime_staff_positions: [],
    people_obj_loading: true,
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

    mutSavePeopleObjInfo(state, paramsObj) {
      state.people_obj_info = paramsObj;
    },
    mutSavePeopleListRoles(state, paramsList) {
      state.people_list_roles = paramsList;
    },
    //Roles by character
    //Roles by anime
    mutSavePeopleListPublishedManga(state, paramsList) {
      state.people_list_published_manga = paramsList;
    },
    mutSavePeopleListAnimeStaffPositions(state, paramsList) {
      state.people_list_anime_staff_positions = paramsList;
    },
    mutStatusPeopleObjInfoLoading(state, paramsStatus) {
      state.people_obj_loading = paramsStatus;
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

    actLoadPeopleObj(context, paramsSearch) {
      var mal_id = paramsSearch.mal_id;

      var api = `https://api.jikan.moe/v3/person/${mal_id}`;

      context.commit("mutSavePeopleObjInfo", {});
      context.commit("mutStatusPeopleObjInfoLoading", true);

      Vue.axios
        .get(api)
        .then((response) => {
          console.log(response);
          context.commit("mutSavePeopleObjInfo", response.data);
          context.commit("mutSavePeopleListRoles", context.state.people_obj_info.voice_acting_roles);
          context.commit("mutSavePeopleListPublishedManga", context.state.people_obj_info.published_manga);
          context.commit("mutSavePeopleListAnimeStaffPositions", context.state.people_obj_info.anime_staff_positions);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          context.commit("mutStatusPeopleObjInfoLoading", false);
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
    gettPeopleSearchLoading(state) {
      return state.people_search_loading;
    },

    gettPeopleObjInfo(state) {
      return state.people_obj_info;
    },
    gettPeopleObjListRoles(state) {
      return state.people_list_roles;
    },
    gettPeopleObjListRolesByCharacter(state) {
      return state.people_list_roles_by_character;
    },
    gettPeopleObjListRolesByAnime(state) {
      return state.people_list_roles_by_anime;
    },
    // gettPeopleObjListRolesBySelected(state) {
    //   return state.people_list_roles_by_selected;
    // },
    gettPeopleObjListPublishedManga(state) {
      return state.people_list_published_manga;
    },
    gettPeopleObjListAnimeStaffPositions(state) {
      return state.people_list_anime_staff_positions;
    },
    gettPeopleObjLoading(state) {
      return state.people_obj_loading;
    },
  },
};
