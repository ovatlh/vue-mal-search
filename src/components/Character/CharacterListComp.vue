<template>
  <div class="divCharacterListComp">
    <h1 class="characterlist_title">
      Characters results... {{ cmpSearchValue }}
    </h1>

    <div class="characterlist_items" v-if="cmpShowCharacterList">
      <CharacterListItemComp
        v-for="(item, index) in cmpCharacterList"
        :key="index"
        :mal_id="item.mal_id"
        :name="item.name"
        :image_url="item.image_url"
      />
    </div>

    <div class="characterlist_loading" v-if="cmpShowCharacterLoading">
      <p>Loading...</p>
    </div>

    <div class="characterlist_controls" v-if="cmpShowCharacterList">
      <CharacterListPagesComp />
      <ScrollTopComp />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CharacterListItemComp from "@/components/Character/CharacterListItemComp.vue";
import CharacterListPagesComp from "@/components/Character/CharacterListPagesComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";

export default {
  components: {
    CharacterListItemComp,
    CharacterListPagesComp,
    ScrollTopComp,
  },
  name: "character-list-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      cmpSearchValue: "gettSearchValueText",
      cmpCharacterList: "gettCharacterSearchResults",
      cmpCharacterSearchLoading: "gettCharacterSearchLoading",
    }),
    cmpShowCharacterList() {
      return !this.cmpCharacterSearchLoading;
    },
    cmpShowCharacterLoading() {
      return this.cmpCharacterSearchLoading;
    },
  },
};
</script>

<style scoped>
.divCharacterListComp {
  display: grid;
  gap: var(--characterresultview-pdd);
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-content: start;
}

.characterlist_title {
  z-index: 2;
  user-select: none;
}

.characterlist_items {
  z-index: 1;
  display: grid;
  gap: 20px;
  grid-template-columns: var(--characterlistitems-grd-columns);
  padding-bottom: var(--characterlistpages-height);
  max-width: 1024px;
  justify-self: center;
}

.characterlist_loading {
  user-select: none;
  display: grid;
  justify-content: center;
  padding: 50px;
}

.characterlist_controls {
  z-index: 3;
  display: grid;
  grid-template-areas: "CharacterControls";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  position: fixed;
  width: calc(100% - calc(var(--characterresultview-pdd) * 2));
  bottom: var(--characterresultview-pdd);
}
</style>
