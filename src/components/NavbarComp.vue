<template>
  <div id="nav" class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: "navbar-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
#nav {
  z-index: var(--navbar-index);
  background-color: var(--navbar-bg);
  box-shadow: 0 0 var(--navbar-box-shadow-size) 0 var(--navbar-box-shadow-color);
  height: var(--navbar-height);
  width: 100%;

  /* position: sticky;
  left: 0;
  top: 0; */
}
</style>
