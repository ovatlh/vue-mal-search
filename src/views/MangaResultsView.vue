<template>
  <div class="divMangaResultsView">
    <NavbarSearchTypesComp />
    <MangaListComp v-if="cmpShowView"/>
    <div class="MangaNoResults" v-if="cmpShowNoResults">
      <p>0 results...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavbarSearchTypesComp from "@/components/NavbarSearchTypesComp.vue";
import MangaListComp from "@/components/MangaListComp.vue";
export default {
  components: {
    NavbarSearchTypesComp,
    MangaListComp,
  },
  name: "manga-results-view",
  props: [],
  created() {
    this.mthNotSearchValue();
  },
  mounted() {
    document.title = `${this.viewTitle}: ${this.cmpMapSearchValueText}`;
  },
  data() {
    return {
      viewTitle: "MAL - Mangas",
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
      cmpMapMangaSearchResults: "gettMangaSearchResults",
    }),
    cmpNotSearchValue() {
      return this.cmpMapSearchValueText.length <= 0;
    },
    cmpHaveMangaResults(){
      return this.cmpMapMangaSearchResults.length > 0;
    },
    cmpShowView(){
      return this.cmpHaveMangaResults === true;
    },
    cmpShowNoResults(){
      return this.cmpHaveMangaResults === false;
    },},
};
</script>

<style scoped>
.divMangaResultsView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--mangaresultview-pdd);
  grid-template-areas: "Mangas";
  grid-template-columns: 1fr;
  align-content: start;
}

.MangaNoResults {
  display: grid;
  justify-content: center;
  align-content: start;
  padding: 50px;
  user-select: none;
}
</style>
