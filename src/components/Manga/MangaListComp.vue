<template>
  <div class="divMangaListComp">
    <h1 class="mangalist_title">Manga results... {{ cmpSearchValue }}</h1>

    <div class="mangalist_items" v-if="cmpShowMangaList">
      <MangaListItemComp
        v-for="(item, index) in cmpMangaList"
        :key="index"
        :mal_id="item.mal_id"
        :title="item.title"
        :type="item.type"
        :image_url="item.image_url"
      />
    </div>

    <div class="mangalist_loading" v-if="cmpShowMangaLoading">
      <p>Loading...</p>
    </div>

    <div class="mangalist_controls" v-if="cmpShowMangaList">
      <MangaListPagesComp />
      <ScrollTopComp />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MangaListItemComp from "@/components/Manga/MangaListItemComp.vue";
import MangaListPagesComp from "@/components/Manga/MangaListPagesComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";
export default {
  components: {
    MangaListItemComp,
    MangaListPagesComp,
    ScrollTopComp,
  },
  name: "manga-list-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      cmpSearchValue: "gettSearchValueText",
      cmpMangaList: "gettMangaSearchResults",
      cmpMangaSearchLoading: "gettMangaSearchLoading",
    }),
    cmpShowMangaList() {
      return !this.cmpMangaSearchLoading;
    },
    cmpShowMangaLoading() {
      return this.cmpMangaSearchLoading;
    },
  },
};
</script>

<style scoped>
.divMangaListComp {
  display: grid;
  gap: var(--mangaresultview-pdd);
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-content: start;
}

.mangalist_title {
  z-index: 2;
  user-select: none;
}

.mangalist_items {
  z-index: 1;
  display: grid;
  gap: 20px;
  grid-template-columns: var(--mangalistitems-grd-columns);
  padding-bottom: var(--mangalistpages-height);
}

.mangalist_loading {
  user-select: none;
  display: grid;
  justify-content: center;
  padding: 50px;
}

.mangalist_controls {
  z-index: 3;
  display: grid;
  grid-template-areas: "MangaControls";
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
  position: fixed;
  width: calc(100% - calc(var(--mangaresultview-pdd) * 2));
  bottom: var(--mangaresultview-pdd);
}
</style>
