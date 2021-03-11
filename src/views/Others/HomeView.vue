<template>
  <div class="divHomeView">
    <img
      class="mal-icon-large"
      :src="svgMALSearcher"
      alt="mal-icon-large"
      onload="SVGInject(this)"
    />

    <div class="home_description">
      <p class="description_title">
        Application to search for your favorite Anime, Manga, Characters and People in the anime industry.
      </p>

      <div class="showcase">
        <transition appear name="showcaseitems" mode="out-in">
          <img
            v-if="showcase_num === 1"
            key="img_01"
            :src="require('@/assets/imgs/showcase/jpg/01_showcase_anime.jpg')"
            alt="Showcase: Anime"
          />
          <img
            v-if="showcase_num === 2"
            key="img_02"
            :src="require('@/assets/imgs/showcase/jpg/02_showcase_manga.jpg')"
            alt="Showcase: Manga"
          />
          <img
            v-if="showcase_num === 3"
            key="img_3"
            :src="
              require('@/assets/imgs/showcase/jpg/03_showcase_character.jpg')
            "
            alt="Showcase: Character"
          />
          <img
            v-if="showcase_num === 4"
            key="img_04"
            :src="require('@/assets/imgs/showcase/jpg/04_showcase_person.jpg')"
            alt="Showcase: Person"
          />
          <img
            v-if="showcase_num === 5"
            key="img_05"
            :src="
              require('@/assets/imgs/showcase/jpg/05_showcase_person_2.jpg')
            "
            alt="Showcase: Person 2"
          />

          <img
            v-if="showcase_num === 6"
            key="img_06"
            :src="
              require('@/assets/imgs/showcase/jpg/06_showcase_anime_results.jpg')
            "
            alt="Showcase: Anime results"
          />
          <img
            v-if="showcase_num === 7"
            key="img_07"
            :src="
              require('@/assets/imgs/showcase/jpg/07_showcase_manga_results.jpg')
            "
            alt="Showcase: Manga results"
          />
          <img
            v-if="showcase_num === 8"
            key="img_08"
            :src="
              require('@/assets/imgs/showcase/jpg/08_showcase_character_results.jpg')
            "
            alt="Showcase: Character results"
          />
          <img
            v-if="showcase_num === 9"
            key="img_09"
            :src="
              require('@/assets/imgs/showcase/jpg/09_showcase_people_results.jpg')
            "
            alt="Showcase: People results"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "home-view",
  props: [],
  created() {
    this.mthShowcase_next();
    this.timer = setInterval(this.mthShowcase_next, 5000);
  },
  mounted() {
    this.mthViewLoaded();
    document.title = "MAL - Home";
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  data() {
    return {
      svgMALSearcher: require("@/assets/imgs/icons/malsearcher-icon-large.svg"),
      timer: '',
      showcase_num: 0,
    };
  },
  methods: {
    ...mapActions({
      mthMapActSetStatusSplashScreenVisible: "actSetStatusSplashScreenVisible",
    }),
    mthViewLoaded() {
      this.mthMapActSetStatusSplashScreenVisible(false);
    },
    mthShowcase_next() {
      this.showcase_num += 1;
      if(this.showcase_num > 9) {
        this.showcase_num = 1;
      }
    },
  },
  computed: {},
};
</script>

<style scoped>
.divHomeView {
  z-index: var(--view-index);
  padding: var(--homeview-pdd);

  display: grid;
  gap: 10px;
  grid-auto-flow: var(--homeview-grd-flow);
  grid-template-columns: 1fr;
  align-content: start;
}

.mal-icon-large {
  fill: #ffffff;
  height: 200px;
  justify-self: center;
  width: 100%;
}

.home_description {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-content: start;
}

.description_title {
  text-align: center;
}

.showcase {
  width: 100%;
  justify-self: center;

  display: grid;
  justify-items: center;
  padding: 10px;
  gap: 10px;
  grid-template-rows: auto;
}

.showcase img {
  max-width: 100%;
  max-height: calc(100vh * 2);
  object-fit: contain;
  object-position: 0 0;
  align-self: start;
  justify-self: center;

  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
}

.showcaseitems-enter-active {
  animation: showcase-fade-in 0.5s ease;
}

.showcaseitems-leave-active {
  animation: showcase-fade-out 0.5s ease;
}

@keyframes showcase-fade-in {
  0% {
    opacity: 0;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes showcase-fade-out {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}
</style>
