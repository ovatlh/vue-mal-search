<template>
  <div class="divMangaObjView">
    <transition name="mangaobjview" mode="out-in">
      <p class="pMangaObjLoading" v-if="cmpShowLoading">Loading...</p>

      <div class="divMangaObjInfo" v-if="cmpShowInfo">
        <div class="mangaobj_info_base">
          <img
            class="mangaobj_cover"
            :src="mthIsImageNull(cmpMapMangaObjInfo.image_url)"
            :alt="cmpMapMangaObjInfo.title"
            :title="cmpMapMangaObjInfo.title"
          />

          <div class="mangaobj_info_general">
            <p class="mangaobj_title" v-if="cmpMapMangaObjInfo.title">{{cmpMapMangaObjInfo.title}}</p>
            <p class="mangaobj_title_synonyms" v-if="cmpMapMangaObjInfo.title_synonyms && cmpMapMangaObjInfo.title_synonyms.length > 0">Synonyms: <strong>{{cmpMapMangaObjInfo.title_synonyms.join(" | ")}}</strong></p>
            <p class="mangaobj_title_english" v-if="cmpMapMangaObjInfo.title_english">
              English: {{cmpMapMangaObjInfo.title_english}}
            </p>
            <p class="mangaobj_title_japanese" v-if="cmpMapMangaObjInfo.title_japanese">
              Japanese: {{cmpMapMangaObjInfo.title_japanese}}
            </p>
            <p class="mangaobj_type">Type: <strong>{{ cmpMapMangaObjInfo.type ? cmpMapMangaObjInfo.type : "Unknown" }}</strong></p>
            <p>Status: {{cmpMapMangaObjInfo.status ? cmpMapMangaObjInfo.status : "Unknown"}} - Published: {{cmpMapMangaObjInfo.published.string ? cmpMapMangaObjInfo.published.string : "Unknown"}}</p>
            <p v-if="cmpMapMangaObjInfo.genres && cmpMapMangaObjInfo.genres.length > 0">
              <span>Genres: </span>
              <span v-for="(genre, index) in cmpMapMangaObjInfo.genres" :key="index">{{genre.name}}{{index >= cmpMapMangaObjInfo.genres.length - 1 ? "": ", "}} </span>
            </p>

            <p v-if="cmpMapMangaObjInfo.synopsis && cmpMapMangaObjInfo.synopsis.length > 0">
              <span><strong>Synopsis: </strong></span>
              <span>{{cmpMapMangaObjInfo.synopsis}}</span>
            </p>

            <p v-if="cmpMapMangaObjInfo.background && cmpMapMangaObjInfo.background.length > 0">
              <span><strong>Background: </strong></span>
              <span>{{cmpMapMangaObjInfo.background}}</span>
            </p>

            <div class="mangaobj_related" v-if="cmpMapMangaObjInfo.related">
              <div class="related_adaptation" v-if="cmpMapMangaObjInfo.related.Adaptation && cmpMapMangaObjInfo.related.Adaptation.length > 0">
                <p>Adaptation:</p>
                <router-link v-for="(adaptation,index) in cmpMapMangaObjInfo.related.Adaptation" :key="index" :to="{ name: 'Anime', params: { mal_id: adaptation.mal_id } }">> {{adaptation.name}}</router-link>
              </div>

              <div class="related_alternative" v-if="cmpMapMangaObjInfo.related['Alternative version'] && cmpMapMangaObjInfo.related['Alternative version'].length > 0">
                <p>Alternative version:</p>
                <router-link v-for="(alternative,index) in cmpMapMangaObjInfo.related['Alternative version']" :key="index" :to="{ name: 'Manga', params: { mal_id: alternative.mal_id } }">> {{alternative.name}}</router-link>
              </div>

              <div class="related_summary" v-if="cmpMapMangaObjInfo.related.Summary && cmpMapMangaObjInfo.related.Summary.length > 0">
                <p>Summary:</p>
                <router-link v-for="(summary, index) in cmpMapMangaObjInfo.related.Summary" :key="index" :to="{ name: 'Manga', params: { mal_id: summary.mal_id } }">> {{summary.name}}</router-link>
              </div>

              <div class="related_full_story" v-if="cmpMapMangaObjInfo.related['Full story'] && cmpMapMangaObjInfo.related['Full story'].length > 0">
                <p>Full story:</p>
                <router-link v-for="(fullstory, index) in cmpMapMangaObjInfo.related['Full story']" :key="index" :to="{ name: 'Manga', params: { mal_id: fullstory.mal_id } }">> {{fullstory.name}}</router-link>
              </div>
              
              <div class="related_prequel" v-if="cmpMapMangaObjInfo.related.Prequel && cmpMapMangaObjInfo.related.Prequel.length > 0">
                <p>Prequel:</p>
                <router-link v-for="(prequel,index) in cmpMapMangaObjInfo.related.Prequel" :key="index" :to="{ name: 'Manga', params: { mal_id: prequel.mal_id } }">> {{prequel.name}}</router-link>
              </div>
              
              <div class="related_sequel" v-if="cmpMapMangaObjInfo.related.Sequel && cmpMapMangaObjInfo.related.Sequel.length > 0">
                <p>Sequel:</p>
                <router-link v-for="(sequel,index) in cmpMapMangaObjInfo.related.Sequel" :key="index" :to="{ name: 'Manga', params: { mal_id: sequel.mal_id } }">> {{sequel.name}}</router-link>
              </div>

              <div class="related_side_story" v-if="cmpMapMangaObjInfo.related['Side story'] && cmpMapMangaObjInfo.related['Side story'].length > 0">
                <p>Side story:</p>
                <router-link v-for="(side_story, index) in cmpMapMangaObjInfo.related['Side story']" :key="index" :to="{ name: 'Manga', params: { mal_id: side_story.mal_id } }">> {{side_story.name}}</router-link>
              </div>

              <div class="related_parent_story" v-if="cmpMapMangaObjInfo.related['Parent story'] && cmpMapMangaObjInfo.related['Parent story'].length > 0">
                <p>Parent story:</p>
                <router-link v-for="(parent_story, index) in cmpMapMangaObjInfo.related['Parent story']" :key="index" :to="{ name: 'Manga', params: { mal_id: parent_story.mal_id } }">> {{parent_story.name}}</router-link>
              </div>
              
              <div class="related_character" v-if="cmpMapMangaObjInfo.related.Character && cmpMapMangaObjInfo.related.Character.length > 0">
                <p>Character:</p>
                <router-link v-for="(character, index) in cmpMapMangaObjInfo.related.Character" :key="index" :to="{ name: 'Manga', params: { mal_id: character.mal_id } }">> {{character.name}}</router-link>
              </div>
              
              <div class="related_other" v-if="cmpMapMangaObjInfo.related.Other && cmpMapMangaObjInfo.related.Other.length > 0">
                <p>Other:</p>
                <router-link v-for="(other, index) in cmpMapMangaObjInfo.related.Other" :key="index" :to="{ name: 'Manga', params: { mal_id: other.mal_id } }">> {{other.name}}</router-link>
              </div>

              <div class="related_spin_off" v-if="cmpMapMangaObjInfo.related['Spin-off'] && cmpMapMangaObjInfo.related['Spin-off'].length > 0">
                <p>Spin-off:</p>
                <router-link v-for="(spinoff, index) in cmpMapMangaObjInfo.related['Spin-off']" :key="index" :to="{ name: 'Manga', params: { mal_id: spinoff.mal_id } }">> {{spinoff.name}}</router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="mangaobj_character" v-if="cmpShowAreaCharacter">
          <h1 class="mangaobj_character_title">Characters...</h1>
          <div class="mangaobj_character_list">
            <CharacterFullItemComp
                v-for="(item, index) in cmpMapMangaCharacterList"
                :key="index"
                :mal_id="item.mal_id"
                :name="item.name"
                :role="item.role"
                :image_url="item.image_url"
              />
          </div>
        </div>

        <div class="mangaobj_authors" v-if="cmpShowAreaAuthors">
          <h1 class="mangaobj_authors_title">Authors...</h1>
          <div class="mangaobj_authors_list">
            <PeopleListItemComp
                v-for="(item, index) in cmpMapMangaAuthorsList"
                :key="index"
                :mal_id="item.mal_id"
                :name="item.name"
                :image_url="item.image_url"
              />
          </div>
        </div>

        <div class="mangaobj_btn_top">
          <ScrollTopComp />
        </div>
      </div>

      <p class="pMangaObjNoData" v-if="cmpShowNoData">No data...</p>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import CharacterFullItemComp from "@/components/Character/CharacterFullItemComp.vue";
import PeopleListItemComp from "@/components/People/PeopleListItemComp.vue";

import ScrollTopComp from "@/components/ScrollTopComp.vue";
export default {
  components: {
    CharacterFullItemComp,
    PeopleListItemComp,
    ScrollTopComp,
  },
  name: "manga-obj-view",
  beforeRouteUpdate(to, from, next) {
    this.mal_id = to.params.mal_id;
    this.mthLoadMangaObj();
    next();
  },
  props: [],
  mounted() {
    this.mthLoadMangaObj();
  },
  data() {
    return {
      mal_id: this.$route.params.mal_id,
    };
  },
  methods: {
    ...mapActions({
      mthMapLoadMangaObj: "actLoadMangaObj",
    }),
    mthLoadMangaObj() {
      this.mthMapLoadMangaObj({ mal_id: this.mal_id });
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
      cmpMapMangaObjLoading: "gettMangaObjLoading",
      cmpMapMangaObjInfo: "gettMangaObjInfo",
      cmpMapMangaCharacterList: "gettMangaCharacterList",
      cmpMapMangaAuthorsList: "gettMangaAuthorsList",
    }),
    cmpMangaObjAnyData() {
      //true: no data, false: data
      return Object.keys(this.cmpMapMangaObjInfo).length === 0;
    },
    cmpLoadingStatus() {
      return this.cmpMapMangaObjLoading;
    },
    cmpShowLoading() {
      return this.cmpLoadingStatus === true;
    },
    cmpShowInfo() {
      return (
        this.cmpLoadingStatus === false && this.cmpMangaObjAnyData === false
      );
    },
    cmpShowNoData() {
      return (
        this.cmpMangaObjAnyData === true && this.cmpLoadingStatus === false
      );
    },
    cmpShowAreaCharacter() {
      return this.cmpMapMangaCharacterList.length > 0;
    },
    cmpShowAreaAuthors() {
      return this.cmpMapMangaAuthorsList.length > 0;
    },
  },
};
</script>

<style scoped>
.divMangaObjView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--mangaresultview-pdd);
  grid-template-areas: "MangaView";
  grid-template-columns: 1fr;
  align-content: start;
}

.pMangaObjLoading, .pMangaObjNoData {
  justify-self: center;
  padding: 100px;
}

.divMangaObjInfo {
  display: grid;
  gap: 10px;
  grid-template-areas: "MangaInfo";
  grid-template-columns: 1fr;
  align-content: start;
}

.mangaobjview-enter-active {
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

.mangaobjview-leave-active {
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

.mangaobj_info_base {
  z-index: 1;
  /* background-color: purple; */

  display: grid;
  gap: 10px;
  grid-template-areas: var(--mangaobj-grd-areas);
  grid-template-columns: var(--mangaobj-grd-columns);
}

.mangaobj_cover {
  z-index: 1;
  grid-area: Cover;
  min-width: 100%;
  max-width: 300px;
  min-height: 300px;
  /* max-height: 300px; */
  object-fit: contain;
  left: 0;
  top: 10px;
  position: var(--mangaobj-img-cover);
}

.mangaobj_info_general {
  z-index: 2;
  grid-area: InfoBase;
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  align-content: start;
}

.mangaobj_title {
  font-size: 42px;
  line-height: 42px;
  font-weight: bold;
  word-wrap: normal;
  word-break: break-all;
}

.mangaobj_related, .mangaobj_related > div{
  display: grid;
  grid-auto-flow: row;
}

.mangaobj_related > div {
  border-top: 4px solid var(--mangaobj-div-brd-top);
  padding-top: 5px;
}

.mangaobj_related a {
  text-decoration: none;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
  color: var(--mangaobj-related-links-clr);
}

.mangaobj_related a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.mangaobj_character {
  z-index: 2;
}

.mangaobj_authors {
  z-index: 3;
}

.mangaobj_character,
.mangaobj_authors {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  /* background-color: rgba(0, 0, 0, 0.2); */
}

.mangaobj_character_title,
.mangaobj_authors_title {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  user-select: none;
  padding: 0px 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.mangaobj_character_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  grid-template-rows: auto;
}

.mangaobj_authors_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  grid-template-rows: auto;
}

.mangaobj_btn_top {
  z-index: 4;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 10px;
}
</style>
