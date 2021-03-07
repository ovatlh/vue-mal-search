<template>
  <div class="divRolesByListComp">
    <h1 class="rolesby_title">{{cmpListTypeTitle}}</h1>
    <div class="rolesby_list">
      <RolesByItemComp v-for="(item, index) in list_items" :key="index" :item="item" :item_type="list_type" />
    </div>
  </div>
</template>

<script>
import RolesByItemComp from "@/components/People/RolesByItemComp.vue";
export default {
  components: {
    RolesByItemComp,
  },
  name: "roles-by-list-comp",
  props: {
    list_type: {
      type: Number,
      default: null, //0: anime, 1: character
    },
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
  computed: {
    cmpListTypeTitle() {
      return this.list_type === 0 ? "Roles By Anime" : "Roles By Character";
    },
  },
};
</script>

<style scoped>
.divRolesByListComp {
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr;
  grid-auto-flow: row;
  align-items: start;
  grid-template-areas: "Title" "Items";
}

.rolesby_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  align-items: start;
}

.rolesby_title {
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  padding: 0px 10px;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}
</style>
