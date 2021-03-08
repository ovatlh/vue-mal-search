<template>
  <div class="divCharacterResultsView">
    <NavbarSearchTypesComp />
    <CharacterListComp v-if="cmpShowView"/>
    <div class="CharacterNoResults" v-if="cmpShowNoResults">
      <p>0 results...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import NavbarSearchTypesComp from "@/components/NavbarSearchTypesComp.vue";
import CharacterListComp from "@/components/Character/CharacterListComp.vue";
export default {
  components: {
    NavbarSearchTypesComp,
    CharacterListComp,
  },
  name: "character-results-view",
  props: [],
  created() {
    this.mthNotSearchValue();
  },
  mounted() {
    this.mthViewLoaded();
    document.title = `${this.viewTitle}: ${this.cmpMapSearchValueText}`;
  },
  data() {
    return {
      viewTitle: "MAL - Characters",
    };
  },
  methods: {
    ...mapActions({
      mthMapActSetStatusSplashScreenVisible: "actSetStatusSplashScreenVisible",
    }),
    mthViewLoaded() {
      this.mthMapActSetStatusSplashScreenVisible(false);
    },
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
.divCharacterResultsView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--characterresultview-pdd);
  grid-template-areas: "Character";
  grid-template-columns: 1fr;
  align-content: start;
}

.CharacterNoResults {
  display: grid;
  justify-content: center;
  align-content: start;
  padding: 50px;
  user-select: none;
}
</style>
