<template>
  <div class="divPeopleResultsView">
    <NavbarSearchTypesComp />
    <PeopleListComp v-if="cmpShowView" />
    <div class="PeopleNoResults" v-if="cmpShowNoResults">
      <p>0 results...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import NavbarSearchTypesComp from "@/components/NavbarSearchTypesComp.vue";
import PeopleListComp from "@/components/PeopleListComp.vue";

export default {
  components: {
    NavbarSearchTypesComp,
    PeopleListComp,
  },
  name: "people-results-view",
  props: [],
  created() {
    this.mthNotSearchValue();
  },
  mounted() {
    document.title = `${this.viewTitle}: ${this.cmpMapSearchValueText}`;
  },
  data() {
    return {
      viewTitle: "MAL - People",
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
      cmpMapPeopleSearchResults: "gettPeopleSearchResults",
    }),
    cmpNotSearchValue() {
      return this.cmpMapSearchValueText.length <= 0;
    },
    cmpHavePeopleResults() {
      return this.cmpMapPeopleSearchResults.length > 0;
    },
    cmpShowView() {
      return this.cmpHavePeopleResults === true;
    },
    cmpShowNoResults() {
      return this.cmpHavePeopleResults === false;
    },
  },
};
</script>

<style scoped>
.divPeopleResultsView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--peopleresultview-pdd);
  grid-template-areas: "People";
  grid-template-columns: 1fr;
  align-content: start;
}

.PeopleNoResults {
  display: grid;
  justify-content: center;
  align-content: start;
  padding: 50px;
  user-select: none;
}
</style>
