<template>
  <div class="divAnimeListComp">
    <h1 class="animelist_title">Anime results... {{cmpSearchValue}}</h1>

    <div class="animelist_items" v-if="cmpShowAnimeList">
      <AnimeListItemComp
        v-for="(item, index) in cmpAnimeList"
        :key="index"
        :mal_id="item.mal_id"
        :title="item.title"
        :type="item.type"
        :image_url="item.image_url"
      />
    </div>

    <div class="animelist_loading" v-if="cmpShowAnimeLoading">
      <p>Loading...</p>
    </div>

    <div class="animelist_controls" v-if="cmpShowAnimeList">
      <AnimeListPagesComp />
      <ScrollTopComp />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AnimeListItemComp from "@/components/AnimeListItemComp.vue";
import AnimeListPagesComp from "@/components/AnimeListPagesComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";

export default {
  components: {
    AnimeListItemComp,
    AnimeListPagesComp,
    ScrollTopComp,
  },
  name: "anime-list-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      cmpSearchValue: "gettSearchValueText",
      cmpAnimeList: "gettAnimeSearchResults",
      cmpAnimeSearchLoading: "gettAnimeSearchLoading",
    }),
    cmpShowAnimeList(){
      return !this.cmpAnimeSearchLoading;
    },
    cmpShowAnimeLoading(){
      return this.cmpAnimeSearchLoading;
    },
  },
};
</script>

<style scoped>
.divAnimeListComp {
  display: grid;
  gap: var(--animeresultview-pdd);
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-content: start;
}

.animelist_title {
  z-index: 2;
  user-select: none;
}

.animelist_items {
  z-index: 1;
  display: grid;
  gap: 20px;
  grid-template-columns: var(--animelistitems-grd-columns);
  padding-bottom: var(--animelistpages-height);
}

.animelist_loading {
  user-select: none;
  display: grid;
  justify-content: center;
  padding: 50px;
}

.animelist_controls {
  z-index: 3;
  display: grid;
  grid-template-areas: "AnimeControls";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  position: fixed;
  width: calc(100% - calc(var(--animeresultview-pdd) * 2));
  bottom: var(--animeresultview-pdd);
}
</style>
