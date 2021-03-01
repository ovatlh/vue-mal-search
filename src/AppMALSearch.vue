<template>
  <div id="app" class="app">
    <NavbarComp />
    <transition name="view" mode="out-in">
      <router-view />
    </transition>
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

<style scoped>
#app {
  display: grid;
  grid-template-areas: "Navbar" "View";
  grid-template-columns: 1fr;
  grid-template-rows: var(--navbar-height) minmax(
      var(--app-row-view-minheight),
      auto
    );
  align-content: start;
}

.view-enter-active {
  animation: fade-in 0.1s cubic-bezier(.5,0,1,0);
}
@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.view-leave-active {
  animation: fade-out 0.1s cubic-bezier(.5,0,1,0);
}
@keyframes fade-out {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
