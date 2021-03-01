<template>
  <div class="divSearchView">
    <div class="search_content">
      <h1 class="search_title">Search {{ cmpShowSearchValueTitle === true ? `(${search_value_title})` : ""}}</h1>

      <div class="search_controls">
        <input
          class="ctrl_value"
          type="search"
          placeholder="Anime/Manga/Character/People"
          title="Anime/Manga/Character/People"
          v-model="search_value"
          v-on:keyup="mthSaveSearchValue"
          v-on:keyup.enter="mthLoadSearchValue"
        />
        <button class="ctrl_button" title="Search" @click="mthLoadSearchValue">
          Search
        </button>
        <p class="ctrl_error" v-if="cmpShowErrors">
          At least 3 characters are required
        </p>
      </div>

      <div class="search_results" v-if="cmpShowResults">
        <p class="results_loading" v-if="cmpResultsLoading">Loading...</p>
        <div class="results_content" v-if="cmpResultsLoaded">
          <button class="results_anime" @click="mthShowAnimeResults">
            Animes: {{ cmpAnimeSearchResults.length }}
          </button>
          <button class="results_manga" @click="mthShowMangaResults">
            Mangas: {{ cmpMangaSearchResults.length }}
          </button>
          <button class="results_character" @click="mthShowCharacterResults">
            Characters: {{ cmpCharacterSearchResults.length }}
          </button>
          <button class="results_people" @click="mthShowPeopleResults">
            People: {{ cmpPeopleSearchResults.length }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "search-view",
  props: [],
  mounted() {
    this.mthLoadSavedSearchValue();
  },
  data() {
    return {
      search_value: "",
      search_value_title: "",
    };
  },
  methods: {
    ...mapActions({
      mthMapSetSearchValue: "actSetSearchValueText",
      mthMapSaveSearchValue: "actSaveSearchValueText",
    }),
    mthSetSearchValueTitle(search_value) {
      if (this.search_value.length > 3) {
        this.search_value_title = search_value;
      }
    },
    mthLoadSearchValue() {
      this.mthMapSetSearchValue(this.search_value);
      this.mthSetSearchValueTitle(this.search_value);
    },
    mthSaveSearchValue() {
      this.mthMapSaveSearchValue(this.search_value);
    },
    mthLoadSavedSearchValue() {
      if (this.cmpSearchValue.length > 0) {
        this.search_value = this.cmpSearchValue;
        this.mthSetSearchValueTitle(this.search_value);
      }
    },
    mthShowAnimeResults() {
      alert("Anime: Results...");
    },
    mthShowMangaResults() {
      alert("Manga: Results...");
    },
    mthShowCharacterResults() {
      alert("Character: Results...");
    },
    mthShowPeopleResults() {
      alert("People: Results...");
    },
  },
  computed: {
    ...mapGetters({
      cmpSearchValue: "gettSearchValueText",
      cmpShowErrors: "gettSearchShowErrors",
      cmpShowResults: "gettSearchShowResults",
      cmpResultsLoading: "gettSearchLoading",
      cmpResultsLoaded: "gettSearchLoaded",
      cmpAnimeSearchResults: "gettAnimeSearchResults",
      cmpMangaSearchResults: "gettMangaSearchResults",
      cmpCharacterSearchResults: "gettCharacterSearchResults",
      cmpPeopleSearchResults: "gettPeopleSearchResults",
    }),
    cmpShowSearchValueTitle() {
      return this.search_value_title.length > 0;
    },
  },
};
</script>

<style scoped>
.divSearchView {
  z-index: var(--view-index);
  display: grid;
  grid-template-areas: "SearchView";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  justify-items: center;
  align-items: center;
}

.search_content {
  display: grid;
  grid-template-areas: "Title" "Controls" "Results";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  min-width: 300px;
}

.search_title {
  grid-area: Title;
  color: #f5f5f5;
  justify-self: center;
  user-select: none;
}

.search_controls {
  grid-area: Controls;
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  grid-template-areas: "Value Button" "Error Error";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
}

.ctrl_value {
  grid-area: Value;
  padding: 10px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 var(--searchview-search-input-shadow-size) 0
    var(--searchview-search-input-shadow-color);
}
.ctrl_button {
  grid-area: Button;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  background-color: #e6e6e6;
  color: #1e1e1e;
  font-weight: 600;
  box-shadow: 0 0 var(--searchview-search-btn-shadow-size) 0
    var(--searchview-search-btn-shadow-color);
}

.ctrl_button:hover {
  border: 1px solid #000000;
}

.ctrl_error {
  grid-area: Error;
  text-align: center;
  user-select: none;
  color: #ffffff;
}

.search_results {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
}

.results_loading {
  text-align: center;
  user-select: none;
}

.results_content {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  justify-content: center;
}

.results_content button {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  min-width: 100px;
  user-select: none;
  cursor: pointer;
  box-shadow: 0 0 var(--searchview-search-btn-shadow-size) 0
    var(--searchview-search-btn-shadow-color);
  font-weight: 600;
  color: #f5f5f5;
}

.results_anime {
  background-color: hsl(120, 40%, 50%);
}

.results_manga {
  background-color: hsl(0, 40%, 50%);
}

.results_character {
  background-color: hsl(179, 40%, 50%);
}

.results_people {
  background-color: hsl(39, 40%, 50%);
}

.results_content button:hover {
  border: 1px solid #ffffff;
}
</style>
