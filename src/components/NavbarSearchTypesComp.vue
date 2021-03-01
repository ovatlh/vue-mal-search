<template>
  <div class="divNavbarSearchTypesComp">
    <router-link class="link_animes" :to="{ name: 'Animes' }"
      >Animes</router-link
    >
    <router-link class="link_mangas" :to="{ name: 'Mangas' }">Mangas</router-link>
    <router-link class="link_characters" to="/characters"
      >Characters</router-link
    >
    <router-link class="link_people" to="/people">People</router-link>
  </div>
</template>

<script>
export default {
  name: "navbar-search-types-comp",
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
.divNavbarSearchTypesComp {
  display: grid;
  gap: 2px;
  grid-auto-flow: column;
  grid-template-rows: 1fr;
  justify-content: start;
  justify-self: center;
}

.divNavbarSearchTypesComp a {
  text-decoration: none;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid transparent;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  color: var(--searchview-resultsbtns-clr);
  opacity: 0.7;
}

.divNavbarSearchTypesComp a:hover {
  border: 1px solid var(--searchview-resultsbtns-brd-hover);
}

.link_animes {
  background-color: var(--searchview-anime-btn-bg);
}

.link_mangas {
  background-color: var(--searchview-manga-btn-bg);
}

.link_characters {
  background-color: var(--searchview-character-btn-bg);
}

.link_people {
  background-color: var(--searchview-people-btn-bg);
}

a.router-link-exact-active {
  text-decoration: underline;
  opacity: 1;
}
</style>
