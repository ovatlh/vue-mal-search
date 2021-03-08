<template>
  <div id="app" class="app">
    <NavbarComp />

    <transition name="view" mode="out-in">
      <router-view />
    </transition>

    <transition name="ss" mode="in-out">
      <SplashScreenView v-if="cmpShowSplashScreen" />
    </transition>
  </div>
</template>

<script>
import SplashScreenView from "@/views/Others/SplashScreenView.vue";
import NavbarComp from "@/components/NavbarComp.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    SplashScreenView,
    NavbarComp,
  },
  name: "app-mal-search",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {},
  computed: {
    ...mapGetters({
      cmpMapStatusSplashScreenVisible: "gettStatusSplashScreenVisible",
    }),
    cmpShowSplashScreen() {
      return this.cmpMapStatusSplashScreenVisible;
    },
  },
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
  animation: fade-in 0.1s cubic-bezier(0.5, 0, 1, 0);
}

.view-leave-active {
  animation: fade-out 0.1s cubic-bezier(0.5, 0, 1, 0);
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

/* .ss-enter-active {
  animation: ss-fade-in 0.1s cubic-bezier(0.5, 0, 1, 0);
} */

.ss-leave-active {
  animation: ss-fade-out var(--ss-animation-duration) var(--ss-animation-function);
  animation-delay: var(--ss-animation-delay);
}

/* @keyframes ss-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
} */

@keyframes ss-fade-out {
  0% {
    opacity: 1;
  }
  90%, 100% {
    opacity: 0;
  }
}
</style>
