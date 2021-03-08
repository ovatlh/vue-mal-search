<template>
  <div class="divCharacterObjView">
    <transition name="characterobjview" mode="out-in">
      <p class="pCharacterObjLoading" v-if="cmpShowLoading">Loading...</p>

      <div class="divCharacterInfo" v-if="cmpShowInfo">
        <div class="characterobj_info_base">
          <img
            class="characterobj_cover"
            :src="mthIsImageNull(cmpMapCharacterObjInfo.image_url)"
            :alt="cmpMapCharacterObjInfo.name"
            :title="cmpMapCharacterObjInfo.name"
          />

          <div class="characterobj_info_general">
            <p class="characterobj_name">{{ cmpMapCharacterObjInfo.name }}</p>
            <p
              class="characterobj_nicknames"
              v-if="
                cmpMapCharacterObjInfo.nicknames &&
                  cmpMapCharacterObjInfo.nicknames.length > 0
              "
            >
              <span>Nicknames: </span>
              <span
                ><strong>{{
                  cmpMapCharacterObjInfo.nicknames.join(", ")
                }}</strong></span
              >
            </p>
            <p
              v-if="
                cmpMapCharacterObjInfo.about &&
                  cmpMapCharacterObjInfo.about.length > 0
              "
            >
              About:
            </p>
            <p
              v-html="AboutWithBrTags"
              v-if="
                cmpMapCharacterObjInfo.about &&
                  cmpMapCharacterObjInfo.about.length > 0
              "
            ></p>
          </div>
        </div>

        <div class="characterobj_voice_actors" v-if="cmpShowAreaVoiceActors">
          <h1 class="characterobj_voice_actors_title">Voice Actors...</h1>
          <div class="characterobj_voice_actors_list">
            <PeopleListItemComp
              v-for="(item, index) in cmpMapCharacterListVoiceActors"
              :key="index"
              :mal_id="item.mal_id"
              :name="item.name"
              :language="item.language"
              :image_url="item.image_url"
            />
          </div>
        </div>

        <div class="characterobj_animeography" v-if="cmpShowAreaAnimeography">
          <h1 class="characterobj_animeography_title">Animeography...</h1>
          <div class="characterobj_animeography_list">
            <AnimeListItemComp
              v-for="(item, index) in cmpMapCharacterListAnimeography"
              :key="index"
              :mal_id="item.mal_id"
              :title="item.name"
              :role="item.role"
              :image_url="item.image_url"
            />
          </div>
        </div>

        <div class="characterobj_mangaography" v-if="cmpShowAreaMangaography">
          <h1 class="characterobj_mangaography_title">Mangaography...</h1>
          <div class="characterobj_mangaography_list">
            <MangaListItemComp
              v-for="(item, index) in cmpMapCharacterListMangaography"
              :key="index"
              :mal_id="item.mal_id"
              :title="item.name"
              :role="item.role"
              :image_url="item.image_url"
            />
          </div>
        </div>

        <div class="characterobj_btn_top">
          <ScrollTopComp />
        </div>
      </div>

      <p class="pCharacterObjNoData" v-if="cmpShowNoData">No data...</p>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import PeopleListItemComp from "@/components/People/PeopleListItemComp.vue";
import AnimeListItemComp from "@/components/Anime/AnimeListItemComp.vue";
import MangaListItemComp from "@/components/Manga/MangaListItemComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";
export default {
  components: {
    PeopleListItemComp,
    AnimeListItemComp,
    MangaListItemComp,
    ScrollTopComp,
  },
  name: "character-obj-view",
  beforeRouteUpdate(to, from, next) {
    this.mal_id = to.params.mal_id;
    this.mthLoadCharacterObj();
    next();
  },
  props: [],
  mounted() {
    this.mthViewLoaded();
    this.mthLoadCharacterObj();
  },
  data() {
    return {
      mal_id: this.$route.params.mal_id,
    };
  },
  methods: {
    ...mapActions({
      mthMapActSetStatusSplashScreenVisible: "actSetStatusSplashScreenVisible",
      mthMapLoadCharacterObj: "actLoadCharacterObj",
    }),
    mthViewLoaded() {
      this.mthMapActSetStatusSplashScreenVisible(false);
    },
    mthLoadCharacterObj() {
      this.mthMapLoadCharacterObj({ mal_id: this.mal_id });
      window.scrollTo(0, 0);
    },
    mthIsImageNull(image_url) {
      return image_url != null && image_url.length > 0
        ? image_url
        : require("@/assets/no-image.png");
    },
  },
  computed: {
    ...mapGetters({
      cmpMapCharacterObjLoading: "gettCharacterObjLoading",
      cmpMapCharacterObjInfo: "gettCharacterObjInfo",
      cmpMapCharacterListAnimeography: "gettCharacterListAnimeography",
      cmpMapCharacterListMangaography: "gettCharacterListMangaography",
      cmpMapCharacterListVoiceActors: "gettCharacterListVoiceActors",
    }),
    cmpCharacterAnyData() {
      ///true: no data, false: data
      return Object.keys(this.cmpMapCharacterObjInfo).length === 0;
    },
    cmpLoadingStatus() {
      return this.cmpMapCharacterObjLoading;
    },
    cmpShowLoading() {
      return this.cmpLoadingStatus === true;
    },
    cmpShowInfo() {
      return (
        this.cmpLoadingStatus === false && this.cmpCharacterAnyData === false
      );
    },
    cmpShowNoData() {
      return (
        this.cmpCharacterAnyData === true && this.cmpLoadingStatus === false
      );
    },
    cmpShowAreaAnimeography() {
      return this.cmpMapCharacterListAnimeography.length > 0;
    },
    cmpShowAreaMangaography() {
      return this.cmpMapCharacterListMangaography.length > 0;
    },
    cmpShowAreaVoiceActors() {
      return this.cmpMapCharacterListVoiceActors.length > 0;
    },
    AboutWithBrTags: function() {
      const doc = this.cmpMapCharacterObjInfo.about;
      return doc.replace(/(\\r)*\\n/g, "<br>");
    },
  },
};
</script>

<style scoped>
.divCharacterObjView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--characterresultview-pdd);
  grid-template-areas: "CharacterView";
  grid-template-columns: 1fr;
  align-content: start;
}

.pCharacterObjLoading,
.pCharacterObjNoData {
  justify-self: center;
  padding: 100px;
}

.divCharacterInfo {
  display: grid;
  gap: 10px;
  grid-template-areas: "CharacterInfo";
  grid-template-columns: 1fr;
  align-content: start;
}

.characterobjview-enter-active {
  animation: fade-in 1s ease-out;
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

.characterobjview-leave-active {
  animation: fade-out 0.1s ease-out;
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

.characterobj_info_base {
  z-index: 1;
  /* background-color: purple; */

  display: grid;
  gap: 10px;
  grid-template-areas: var(--characterobj-grd-areas);
  grid-template-columns: var(--characterobj-grd-columns);
}

.characterobj_cover {
  z-index: 1;
  grid-area: Cover;
  min-width: 100%;
  max-width: 300px;
  min-height: 300px;
  /* max-height: 300px; */
  object-fit: contain;
  left: 0;
  top: 10px;
  position: var(--characterobj-img-cover);
}

.characterobj_info_general {
  z-index: 2;
  grid-area: InfoBase;
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  align-content: start;
}

.characterobj_name {
  font-size: 42px;
  line-height: 42px;
  font-weight: bold;
  word-wrap: normal;
  word-break: break-all;
}

.characterobj_voice_actors {
  z-index: 1;
}

.characterobj_animeography {
  z-index: 2;
}

.characterobj_mangaography {
  z-index: 3;
}

.characterobj_voice_actors,
.characterobj_animeography,
.characterobj_mangaography {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  /* background-color: rgba(0, 0, 0, 0.2); */
}

.characterobj_voice_actors_title,
.characterobj_animeography_title,
.characterobj_mangaography_title {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  user-select: none;
  padding: 0px 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.characterobj_voice_actors_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  grid-template-rows: auto;
}

.characterobj_animeography_list,
.characterobj_mangaography_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(320px, auto));
  grid-template-rows: auto;
}

.characterobj_btn_top {
  z-index: 4;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 10px;
}
</style>
