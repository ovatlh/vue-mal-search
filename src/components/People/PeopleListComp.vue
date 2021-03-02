<template>
  <div class="divPeopleListComp">
    <h1 class="peoplelist_title">People results... {{ cmpSearchValue }}</h1>

    <div class="peoplelist_items" v-if="cmpShowPeopleList">
      <PeopleListItemComp
        v-for="(item, index) in cmpPeopleList"
        :key="index"
        :mal_id="item.mal_id"
        :name="item.name"
        :image_url="item.image_url"
      />
    </div>

    <div class="peoplelist_loading" v-if="cmpShowPeopleLoading">
      <p>Loading...</p>
    </div>

    <div class="peoplelist_controls" v-if="cmpShowPeopleList">
      <PeopleListPagesComp />
      <ScrollTopComp />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PeopleListItemComp from "@/components/People/PeopleListItemComp.vue";
import PeopleListPagesComp from "@/components/People/PeopleListPagesComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";

export default {
  components: {
    PeopleListItemComp,
    PeopleListPagesComp,
    ScrollTopComp,
  },
  name: "people-list-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      cmpSearchValue: "gettSearchValueText",
      cmpPeopleList: "gettPeopleSearchResults",
      cmpPeopleSearchLoading: "gettPeopleSearchLoading",
    }),
    cmpShowPeopleList() {
      return !this.cmpPeopleSearchLoading;
    },
    cmpShowPeopleLoading() {
      return this.cmpPeopleSearchLoading;
    },
  },
};
</script>

<style scoped>
.divPeopleListComp {
  display: grid;
  gap: var(--peopleresultview-pdd);
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-content: start;
}

.peoplelist_title {
  z-index: 2;
  user-select: none;
}

.peoplelist_items {
  z-index: 1;
  display: grid;
  gap: 20px;
  grid-template-columns: var(--peoplelistitems-grd-columns);
  padding-bottom: var(--peoplelistpages-height);
  max-width: 1024px;
  justify-self: center;
}

.peoplelist_loading {
  user-select: none;
  display: grid;
  justify-content: center;
  padding: 50px;
}

.peoplelist_controls {
  z-index: 3;
  display: grid;
  grid-template-areas: "PeopleControls";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  position: fixed;
  width: calc(100% - calc(var(--peopleresultview-pdd) * 2));
  bottom: var(--peopleresultview-pdd);
}
</style>
