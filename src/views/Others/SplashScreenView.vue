<template>
  <div class="divSplashScreenView">
    <div class="ss_content">
      <img class="ss_logo" :src="imgLogo" alt="logo" title="MAL Search" />
      <h1 class="ss_title">MyAnimeList: Searcher</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "splash-screen-view",
  props: [],
  mounted() {},
  data() {
    return {
      imgLogo: require("@/assets/logo.png"),
    };
  },
  methods: {},
  computed: {
    ...mapGetters({
      cmpMapStatusSplashScreenVisible: "gettStatusSplashScreenVisible",
    }),
    cmpIsViewLoaded() {
      return this.cmpMapStatusSplashScreenVisible === false;
    },
    cmpSetAnimation() {
      return this.cmpIsViewLoaded === true;
    },
  },
};
</script>

<style scoped>
.divSplashScreenView {
  user-select: none;
  z-index: var(--ss-index);
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--ss-bg);
  width: 100%;
  height: 100vh;

  display: grid;
  justify-items: center;
  align-items: center;
}

.ss_content {
  display: grid;
  grid-auto-flow: row;
  grid-template-areas: "Logo" "Title";
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;

  justify-items: center;
}

.ss_logo {
  z-index: 2;
  min-width: 200px;
  max-width: 200px;

  min-height: 200px;
  max-height: 200px;

  object-fit: contain;
  /* transition: 20s ease-out; */
}

.ss_title {
  z-index: 1;
  word-wrap: break-word;
  text-align: center;
  color: var(--ss-clr);
  padding: 0 10px;
}

.ss-leave-active .ss_content {
  animation: ss-logo-content-out var(--ss-animation-duration) var(--ss-animation-function);
  animation-delay: var(--ss-animation-delay);
}

/* .ss-leave-active .ss_logo {
  animation: ss-logo-content-out var(--ss-animation-duration) cubic-bezier(.32,-0.2,.97,.43);
  animation-delay: var(--ss-animation-delay);
}

.ss-leave-active .ss_title {
  animation: ss-title-content-out var(--ss-animation-duration) cubic-bezier(.32,-0.2,.97,.43);
  animation-delay: var(--ss-animation-delay);
} */

@keyframes ss-logo-content-out {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(10);
  }
}

@keyframes ss-title-content-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
