<template>
  <div class="divPeopleMangaListComp">
    <h1 class="mangas_title">Published Manga</h1>
    <div class="mangas_list">
      <MangaListItemComp
        v-for="(manga, index) in mangas_list"
        :key="index"
        :mal_id="manga.manga.mal_id"
        :title="manga.manga.name"
        :position="manga.position"
        :image_url="manga.manga.image_url"
      />
    </div>
  </div>
</template>

<script>
import MangaListItemComp from "@/components/Manga/MangaListItemComp.vue";
export default {
  components: {
    MangaListItemComp,
  },
  name: "people-manga-list-comp",
  props: {
    mangas_list: {
      type: Array,
      default: null,
    },
  },
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.divPeopleMangaListComp {
  display: grid;
  gap: 10px;
  grid-template-areas: "Title" "List";
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-items: start;
}

.mangas_title {
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.mangas_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  grid-template-rows: auto;
}
</style>
