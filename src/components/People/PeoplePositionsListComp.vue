<template>
  <div class="divPeoplePositionsListComp">
    <h1 class="positions_title">Anime Staff Positions</h1>
    <div class="positions_list">
      <AnimeListItemComp
        v-for="(position, index) in positions_list"
        :key="index"
        :mal_id="position.anime.mal_id"
        :title="position.anime.name"
        :position="position.position"
        :image_url="position.anime.image_url"
      />
    </div>
  </div>
</template>

<script>
import AnimeListItemComp from "@/components/Anime/AnimeListItemComp.vue";
export default {
  components: {
    AnimeListItemComp,
  },
  name: "people-positions-list-comp",
  props: {
    positions_list: {
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
.divPeoplePositionsListComp {
  display: grid;
  gap: 10px;
  grid-template-areas: "Title" "List";
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-items: start;
}

.positions_title{
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.positions_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));
  grid-template-rows: auto;
}
</style>
