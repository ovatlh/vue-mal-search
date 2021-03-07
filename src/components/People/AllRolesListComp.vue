<template>
  <div class="divAllRolesListComp">
    <h1 class="roles_title">Roles</h1>
    <div class="roles_list">
      <RoleItemComp
        v-for="(item, index) in list_items"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<script>
import RoleItemComp from "@/components/People/RoleItemComp.vue";
export default {
  components: {
    RoleItemComp,
  },
  name: "all-roles-list-comp",
  props: {
    list_items: {
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
.divAllRolesListComp {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-template-areas: "Title" "List";
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  align-items: start;
}

.roles_title {
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  user-select: none;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.roles_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(320px, auto));
  grid-template-rows: auto;
}
</style>
