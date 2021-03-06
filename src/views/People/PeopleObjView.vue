<template>
  <div class="divPeopleObjView">
    <h1>people-obj-view Component</h1>
    <RolesByListComp :list_type="0" :list_items="mthMapPeopleObjListRolesByAnime" />
    <RolesByListComp :list_type="1" :list_items="mthMapPeopleObjListRolesByCharacter" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import RolesByListComp from "@/components/People/RolesByListComp.vue";
export default {
  components: {
    RolesByListComp,
  },
  name: "people-obj-view",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      mthMapPeopleObjListRolesByCharacter: "gettPeopleObjListRolesByCharacter",
      mthMapPeopleObjListRolesByAnime: "gettPeopleObjListRolesByAnime",
    }),
  },
};
</script>

<style scoped>
.divPeopleObjView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--peopleresultview-pdd);
  grid-template-areas: "AnimeView";
  grid-template-columns: 1fr;
  align-content: start;
}
</style>
