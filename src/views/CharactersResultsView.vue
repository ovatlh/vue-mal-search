<template>
  <div class="divCharactersResultsView">
    <NavbarSearchTypesComp />
    <CharactersListComp v-if="cmpShowView"/>
    <div class="CharactersNoResults" v-if="cmpShowNoResults">
      <p>0 results...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavbarSearchTypesComp from "@/components/NavbarSearchTypesComp.vue";
import CharactersListComp from "@/components/CharactersListComp.vue";
export default {
  components: {
    NavbarSearchTypesComp,
    CharactersListComp,
  },
  name: "characters-results-view",
  props: [],
  created() {
    this.mthNotSearchValue();
  },
  mounted() {
    document.title = `${this.viewTitle}: ${this.cmpMapSearchValueText}`;
  },
  data() {
    return {
      viewTitle: "MAL - Characters",
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
      cmpMapCharacterSearchResults: "gettCharacterSearchResults",
    }),
    cmpNotSearchValue() {
      return this.cmpMapSearchValueText.length <= 0;
    },
    cmpHaveCharacterResults() {
      return this.cmpMapCharacterSearchResults.length > 0;
    },
    cmpShowView() {
      return this.cmpHaveCharacterResults === true;
    },
    cmpShowNoResults() {
      return this.cmpHaveCharacterResults === false;
    },
  },
};
</script>

<style scoped>
.divCharactersResultsView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--characterresultview-pdd);
  grid-template-areas: "Characters";
  grid-template-columns: 1fr;
  align-content: start;
}

.CharactersNoResults {
  display: grid;
  justify-content: center;
  align-content: start;
  padding: 50px;
  user-select: none;
}
</style>
