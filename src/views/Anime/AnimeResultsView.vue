<template>
  <div class="divAnimeResultsView">
    <NavbarSearchTypesComp />
    <AnimeListComp v-if="cmpShowView"/>
    <div class="AnimeNoResults" v-if="cmpShowNoResults">
      <p>0 results...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavbarSearchTypesComp from "@/components/NavbarSearchTypesComp.vue";
import AnimeListComp from "@/components/Anime/AnimeListComp.vue";

export default {
  components: {
    NavbarSearchTypesComp,
    AnimeListComp,
  },
  name: "anime-results-view",
  props: [],
  created() {
    this.mthNotSearchValue();
  },
  mounted() {
    document.title = `${this.viewTitle}: ${this.cmpMapSearchValueText}`;
  },
  data() {
    return {
      viewTitle: "MAL - Animes",
    };
  },
  methods: {
    mthNotSearchValue() {
      if (this.cmpNotSearchValue === true) {
        this.$router.push({ name: "Search" });
      }
    },
  },
  computed: {
    ...mapGetters({
      cmpMapSearchValueText: "gettSearchValueText",
      cmpMapAnimeSearchResults: "gettAnimeSearchResults",
    }),
    cmpNotSearchValue() {
      return this.cmpMapSearchValueText.length <= 0;
    },
    cmpHaveAnimeResults(){
      return this.cmpMapAnimeSearchResults.length > 0;
    },
    cmpShowView(){
      return this.cmpHaveAnimeResults === true;
    },
    cmpShowNoResults(){
      return this.cmpHaveAnimeResults === false;
    },
  },
};
</script>

<style scoped>
.divAnimeResultsView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--animeresultview-pdd);
  grid-template-areas: "Animes";
  grid-template-columns: 1fr;
  align-content: start;
}

.AnimeNoResults {
  display: grid;
  justify-content: center;
  align-content: start;
  padding: 50px;
  user-select: none;
}
</style>
