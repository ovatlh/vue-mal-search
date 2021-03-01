<template>
  <div class="divAnimeResultsView">
    <NavbarSearchTypesComp />
    <AnimeListComp />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavbarSearchTypesComp from "@/components/NavbarSearchTypesComp.vue";
import AnimeListComp from "@/components/AnimeListComp.vue";

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
    }),
    cmpNotSearchValue() {
      return this.cmpMapSearchValueText.length <= 0;
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
</style>
