<template>
  <div id="nav" class="nav">
    <router-link class="link_home" :to="{ name: 'Home' }" title="Home">
      <span class="material-icons-sharp">
        home
      </span>
      <p class="link_home_text">Home</p>
    </router-link>
    <router-link class="link_search" :to="{ name: 'Search' }" title="Search">
      <span class="material-icons-sharp">
        search
      </span>
      <p class="link_search_text">Search</p>
    </router-link>
    <router-link class="link_about" :to="{ name: 'About' }" title="About">
      <span class="material-icons-sharp">
        info
      </span>
      <p class="link_about_text">About</p>
    </router-link>
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

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: auto auto 1fr;
  grid-template-rows: 1fr;
  justify-items: start;
}

#nav a {
  display: grid;
  gap: var(--navbarlink-grd-gap);
  padding: 10px;
  grid-template-columns: auto 1fr;
  justify-items: center;
  align-items: center;

  text-decoration: none;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: var(--navbarlink-clr);
  opacity: 0.7;
}

#nav a.router-link-exact-active {
  background-color: var(--navbarlink-bg-active);
  opacity: 1;
}

.link_about {
  justify-self: end;
}

.link_home_text, .link_search_text, .link_about_text {
  display: var(--navbarlink-text-display);
}
</style>
