<template>
  <div class="divCharacterListPagesComp">
    <div class="navigation_button" title="First Page" @click="mthFirstPage">
      <span class="material-icons-sharp">first_page</span>
    </div>

    <div class="navigation_button" title="Previous Page" @click="mthPrevPage">
      <span class="material-icons-sharp">navigate_before</span>
    </div>

    <p
      :title="`Actual Page: ${cmpActualPage} / Total Pages: ${cmpLastPage}`"
      class="navigation_pages"
    >
      {{ cmpActualPage }} / {{ cmpLastPage }}
    </p>

    <div class="navigation_button" title="Next Page" @click="mthNextPage">
      <span class="material-icons-sharp">navigate_next</span>
    </div>

    <div class="navigation_button" title="Last Page" @click="mthLastPage">
      <span class="material-icons-sharp">last_page</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "character-list-pages-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      mthCharacterFirstPage: "actCharacterFirstPage",
      mthCharacterPrevPage: "actCharacterPrevPage",
      mthCharacterNextPage: "actCharacterNextPage",
      mthCharacterLastPage: "actCharacterLastPage",
      mthLoadCharacterPage: "actLoadCharacterSearch",
    }),
    mthFirstPage() {
      this.mthCharacterFirstPage();
      this.mthLoadCharacterPage({
        num_page: this.cmpActualPage,
        value_search: this.cmpSearchValue,
      });
    },
    mthPrevPage() {
      if (this.cmpActualPage > 1) {
        this.mthCharacterPrevPage();
        this.mthLoadCharacterPage({
          num_page: this.cmpActualPage,
          value_search: this.cmpSearchValue,
        });
      }
    },
    mthNextPage() {
      this.mthCharacterNextPage();
      this.mthLoadCharacterPage({
        num_page: this.cmpActualPage,
        value_search: this.cmpSearchValue,
      });
    },
    mthLastPage() {
      this.mthCharacterLastPage();
      this.mthLoadCharacterPage({
        num_page: this.cmpActualPage,
        value_search: this.cmpSearchValue,
      });
    },
  },
  computed: {
    ...mapGetters({
      cmpActualPage: "gettCharacterSearchActualPage",
      cmpLastPage: "gettCharacterSearchLastPage",
      cmpSearchValue: "gettSearchValueText",
    }),
  },
};
</script>

<style scoped>
.divCharacterListPagesComp {
  /* grid-area: CharacterControls; */
  display: grid;
  gap: 5px;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  justify-self: center;
  align-self: center;
  /* height: var(--characterlistpages-height); */
  user-select: none;
}

.navigation_button,
.navigation_pages {
  background-color: #ffffff;
  color: #000000;
  padding: 5px;
  border-radius: 5px;
  display: grid;
  justify-content: center;
  align-content: center;
}

.navigation_button {
  cursor: pointer;
  transition: 0.1s ease-out;
}

.navigation_button:hover {
  transform: scale(1.1);
}
.navigation_button:active {
  transform: scale(1);
  filter: brightness(80%);
}

.navigation_pages {
  font-weight: 600;
  padding: 0px 10px;
}
</style>
