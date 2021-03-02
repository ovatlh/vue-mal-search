<template>
  <div class="divSearchView">
    <div class="search_content">
      <h1 class="search_title">
        Search
        {{ cmpShowSearchValueTitle === true ? `(${search_value_title})` : "" }}
      </h1>

      <div class="search_controls">
        <input
          id="ctrl_value_ID"
          class="ctrl_value"
          type="search"
          placeholder="Anime/Manga/Character/People"
          title="Anime/Manga/Character/People"
          v-model="search_value"
          v-on:keyup="mthSaveSearchValue"
          v-on:keyup.enter="mthLoadSearchValue"
        />
        <button class="ctrl_button" title="Search" @click="mthLoadSearchValue">
          <span class="material-icons-sharp">
            search
          </span>
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
    document.getElementById("ctrl_value_ID").focus();
    document.title = `${this.viewTitle}: ${this.cmpSearchValue}`;
  },
  data() {
    return {
      viewTitle: "MAL - Search",
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
      document.title = `${this.viewTitle}: ${this.cmpSearchValue}`;
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
      // alert("Anime: Results...");
      this.$router.push({ name: "Animes" });
    },
    mthShowMangaResults() {
      // alert("Manga: Results...");
      this.$router.push({ name: "Mangas" });
    },
    mthShowCharacterResults() {
      // alert("Character: Results...");
      this.$router.push({ name: "Characters" });
    },
    mthShowPeopleResults() {
      // alert("People: Results...");
      this.$router.push({ name: "People" });
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
  padding: var(--searchview-pdd);
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
  color: var(--searchview-title-clr);
  justify-self: center;
  text-align: center;
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
  align-self: center;
}
.ctrl_button {
  grid-area: Button;
  padding: 3px 5px;
  border-radius: 5px;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  background-color: var(--searchview-ctrlbtn-bg);
  color: var(--searchview-ctrlbtn-clr);
  font-weight: 600;
  box-shadow: 0 0 var(--searchview-search-btn-shadow-size) 0
    var(--searchview-search-btn-shadow-color);
  align-self: center;
}

.ctrl_button:hover {
  border: 1px solid var(--searchview-ctrlbtn-brd-hover);
}

.ctrl_error {
  grid-area: Error;
  text-align: center;
  user-select: none;
  color: var(--searchview-error-clr);
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
  color: var(--searchview-resultsbtns-clr);
}

.results_anime {
  background-color: var(--searchview-anime-btn-bg);
}

.results_manga {
  background-color: var(--searchview-manga-btn-bg);
}

.results_character {
  background-color: var(--searchview-character-btn-bg);
}

.results_people {
  background-color: var(--searchview-people-btn-bg);
}

.results_content button:hover {
  border: 1px solid var(--searchview-resultsbtns-brd-hover);
}
</style>
