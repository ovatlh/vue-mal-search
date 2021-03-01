import Vue from "vue";
import Vuex from "vuex";

// Import modules
import module_search from "./modules/module_search.js";
import module_anime from "./modules/module_anime.js";
import module_manga from "./modules/module_manga.js";
import module_character from "./modules/module_character.js";
import module_people from "./modules/module_people.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    module_search,
    module_anime,
    module_manga,
    module_character,
    module_people,
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {},
});
