<template>
  <div class="divAboutView">
    <div class="view_content">
      <div class="icons">
        <a
          class="mal-icon"
          href="https://myanimelist.net/"
          target="_blank"
          title="MyAnimeList"
        >
          <img
            class="mal-icon-small"
            :src="svgMALS"
            alt="mal-icon-small"
            onload="SVGInject(this)"
          />

          <img
            class="mal-icon-large"
            :src="svgMAL"
            alt="mal-icon-large"
            onload="SVGInject(this)"
          />
        </a>

        <a
          class="jikan-icon"
          href="https://jikan.moe/"
          target="_blank"
          title="Jikan API"
        >
          <img
            class="jikan-icon-small"
            :src="svgJikanS"
            alt="jikan-icon-small"
            onload="SVGInject(this)"
          />

          <img
            class="jikan-icon-large"
            :src="svgJikan"
            alt="jikan-icon-large"
            onload="SVGInject(this)"
          />
        </a>

        <a
          class="vue-icon"
          href="https://vuejs.org/"
          target="_blank"
          title="Vuejs"
        >
          <img
            class="vue-icon-large"
            :src="svgVue"
            alt="vue-logo"
            onload="SVGInject(this)"
          />
          <p class="vue-icon-version">v2.6.12</p>
        </a>
      </div>

      <div class="about">
        <div class="info">
          <p>
            This application was created with the Vue.js framework (v2.6.12).
          </p>
          <p>All the information is provided by Jikan API.</p>
        </div>
        <a
          class="source_code"
          href="https://github.com/ovatlh/vue-mal-search"
          target="_blank"
          title="GitHub: Source code"
        >
          <div class="img-icon">
            <img
              class="github-icon"
              :src="svgGitHub"
              alt="GitHub"
              onload="SVGInject(this)"
            />
          </div>
          <p class="version">GitHub: Source code (v1.0)</p>
        </a>

        <a class="about_me" href="https://ovatlh.github.io/" target="_blank">
          <img
            class="github_pp"
            src="https://github.com/ovatlh.png"
            alt="@ovatlh"
            title="@ovatlh: Tavo Lopez Hernandez"
          />
          <p class="me">About me: @ovatlh</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "about-view",
  props: [],
  mounted() {
    this.mthViewLoaded();
    document.title = "MAL - About";
  },
  data() {
    return {
      svgMAL: require("@/assets/imgs/icons/mal-icon-large.svg"),
      svgMALS: require("@/assets/imgs/icons/mal-icon-small.svg"),
      svgJikan: require("@/assets/imgs/icons/jikan-icon-large.svg"),
      svgJikanS: require("@/assets/imgs/icons/jikan-icon-small.svg"),
      svgVue: require("@/assets/imgs/icons/vue-logo.svg"),
      svgGitHub: require("@/assets/imgs/icons/github-single.svg"),
    };
  },
  methods: {
    ...mapActions({
      mthMapActSetStatusSplashScreenVisible: "actSetStatusSplashScreenVisible",
    }),
    mthViewLoaded() {
      this.mthMapActSetStatusSplashScreenVisible(false);
    },
  },
  computed: {},
};
</script>

<style scoped>
.divAboutView {
  z-index: var(--view-index);
  display: grid;
  padding: var(--aboutview-pdd);
  grid-auto-flow: row;
  grid-template-columns: 1fr;
}

.view_content {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: stretch;
  padding-top: 50px;
}

.icons {
  user-select: none;
  display: grid;
  gap: 10px;
  grid-auto-flow: var(--aboutview-icons-grd-flow);
  align-items: center;
  align-content: center;
}

.icons a {
  transition: 0.1s ease-out;
  text-decoration: none;
}

.icons a:hover {
  transform: translateY(-10px) scale(1.1);
}

.mal-icon,
.jikan-icon,
.vue-icon {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  justify-items: center;
  align-items: start;
}

.vue-icon {
  min-width: 300px;
}

.vue-icon-version {
  display: grid;
  align-items: center;
  padding: 10px;
  color: #ffffff;
  font-size: 60px;
  height: 120px;
  font-weight: bold;
}

.mal-icon-small,
.jikan-icon-small,
.vue-icon-large {
  min-width: 120px;
  min-height: 120px;
  max-width: 120px;
  max-height: 120px;

  padding: 15px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.mal-icon-large,
.jikan-icon-large {
  min-height: 120px;
  max-height: 120px;
  min-width: 300px;
  max-width: 300px;
}

.mal-icon-small,
.jikan-icon-small {
  fill: #2f52a2;
}

.mal-icon-large,
.jikan-icon-large {
  fill: #ffffff;
}

.about {
  display: grid;
  gap: 20px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: start;
  align-self: start;
}

.info {
  text-align: center;
}

.source_code {
  text-decoration: none;
  height: 50px;
  display: grid;
  grid-template-columns: auto 1fr;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);

  transition: 0.1s ease-out;
}

.source_code:hover {
  transform: scale(1.05);
}

.img-icon {
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: #24292e;
}

.github-icon {
  fill: #ffffff;
  width: 30px;
  height: 30px;
}

.img-icon,
.version {
  padding: 10px;
}

.version {
  display: grid;
  align-content: center;
  color: #24292e;
  font-weight: bold;
  background-color: #ffffff;
}

.about_me {
  margin: 150px 0;
  user-select: none;
  text-decoration: none;
  color: #1e1e1e;
  font-weight: bold;

  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  align-items: center;
  min-height: 60px;
  padding: 10px;
  border-radius: 360px 50px 50px 360px;

  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);

  transition: 0.1s ease-out;
}

.github_pp {
  width: 60px;
  height: 60px;

  object-fit: contain;

  border-radius: 100%;

  transition: 0.1s ease-out;
}

@keyframes rainbow {
  0% {
    background-position: 0% 82%;
  }
  100% {
    background-position: 100% 19%;
  }
}

.about_me:hover {
  color: #ffffff;
  transform: scale(1.05);
  background: linear-gradient(
    124deg,
    #ff2400,
    #e81d1d,
    #e8b71d,
    #e3e81d,
    #1de840,
    #1ddde8,
    #2b1de8,
    #dd00f3,
    #dd00f3
  );
  background-size: 1800% 1800%;
  animation: rainbow 1s linear infinite;
}

.about_me:hover .github_pp {
  transform: scale(1.25) rotate(15deg);
}
</style>
