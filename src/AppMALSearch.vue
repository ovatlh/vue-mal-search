<template>
  <div id="app" class="app">
    <NavbarComp />
    <router-view />
  </div>
</template>

<script>
import NavbarComp from "@/components/NavbarComp.vue";
export default {
  components: {
    NavbarComp,
  },
  name: "app-mal-search",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style src="@/assets/css/main-css.css"></style>

<style scoped></style>
