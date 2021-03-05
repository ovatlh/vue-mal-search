<template>
  <div class="divAnimeObjView">
    <transition name="animeobjview" mode="out-in">
      <p class="pAnimeObjLoading" v-if="cmpShowLoading">Loading...</p>

        <div class="divAnimeObjInfo" v-if="cmpShowInfo">
          <div class="animeobj_info_base">
            <img
              class="animeobj_cover"
              :src="cmpMapAnimeObjInfo.image_url"
              :alt="cmpMapAnimeObjInfo.title"
              :title="cmpMapAnimeObjInfo.title"
            />

            <div class="animeobj_info_general">
              <p class="animeobj_title" v-if="cmpMapAnimeObjInfo.title">{{ cmpMapAnimeObjInfo.title }}</p>
              <p class="animeobj_title_synonyms" v-if="cmpMapAnimeObjInfo.title_synonyms && cmpMapAnimeObjInfo.title_synonyms.length > 0">Synonyms: <strong>{{cmpMapAnimeObjInfo.title_synonyms.join(" | ")}}</strong></p>
              <p class="animeobj_title_english" v-if="cmpMapAnimeObjInfo.title_english">
                English: {{ cmpMapAnimeObjInfo.title_english }}
              </p>
              <p class="animeobj_title_japanese" v-if="cmpMapAnimeObjInfo.title_japanese">
                Japanese: {{ cmpMapAnimeObjInfo.title_japanese }}
              </p>
              <p class="animeobj_type_source">Type: <strong>{{ cmpMapAnimeObjInfo.type ? cmpMapAnimeObjInfo.type : "Unknown" }}</strong> | Source: <strong>{{ cmpMapAnimeObjInfo.source ? cmpMapAnimeObjInfo.source : "Unknown" }}</strong></p>
              <p class="animeobj_episodes_duration">Episodes: <strong>{{cmpMapAnimeObjInfo.episodes ? cmpMapAnimeObjInfo.episodes : "Unknown" }}</strong> | Duration: <strong>{{ cmpMapAnimeObjInfo.duration ? cmpMapAnimeObjInfo.duration : "Unknown" }}</strong> | Broadcast: <strong>{{cmpMapAnimeObjInfo.broadcast ? cmpMapAnimeObjInfo.broadcast : "Unknown" }}</strong></p>
              <p>Status: {{ cmpMapAnimeObjInfo.status ? cmpMapAnimeObjInfo.status : "Unknown" }} - Aired: {{ cmpMapAnimeObjInfo.aired.string ? cmpMapAnimeObjInfo.aired.string : "Unknown" }}</p>
              <p v-if="cmpMapAnimeObjInfo.genres && cmpMapAnimeObjInfo.genres.length > 0">
                <span>Genres: </span>
                <span v-for="(genre, index) in cmpMapAnimeObjInfo.genres" :key="index">{{genre.name}}{{index >= cmpMapAnimeObjInfo.genres.length - 1 ? "": ", "}} </span>
              </p>
              <p v-if="cmpMapAnimeObjInfo.studios && cmpMapAnimeObjInfo.studios.length > 0">
                <span>Studios: </span>
                <span v-for="(studio, index) in cmpMapAnimeObjInfo.studios" :key="index">{{studio.name}}</span>
              </p>

              <p v-if="cmpMapAnimeObjInfo.synopsis && cmpMapAnimeObjInfo.synopsis.length > 0">
                <span><strong>Synopsis: </strong></span>
                <span>{{cmpMapAnimeObjInfo.synopsis}}</span>
              </p>

              <div class="animeobj_openings" v-if="cmpMapAnimeObjInfo.opening_themes.length > 0">
                <p><strong>Opening themes:</strong></p>
                <p v-for="(opening, index) in cmpMapAnimeObjInfo.opening_themes" :key="index">{{opening}}</p>
              </div>

              <div class="animeobj_endings" v-if="cmpMapAnimeObjInfo.ending_themes.length > 0">
                <p><strong>Ending themes:</strong></p>
                <p v-for="(ending, index) in cmpMapAnimeObjInfo.ending_themes" :key="index">{{ending}}</p>
              </div>

              <div class="animeobj_related" v-if="cmpMapAnimeObjInfo.related">
                <div class="related_adaptation" v-if="cmpMapAnimeObjInfo.related.Adaptation && cmpMapAnimeObjInfo.related.Adaptation.length > 0">
                  <p>Adaptation:</p>
                  <router-link v-for="(adaptation, index) in cmpMapAnimeObjInfo.related.Adaptation" :key="index" :to="{ name: 'Manga', params: { mal_id: adaptation.mal_id } }">> {{adaptation.name}}</router-link>
                </div>

                <div class="related_alternative" v-if="cmpMapAnimeObjInfo.related['Alternative version'] && cmpMapAnimeObjInfo.related['Alternative version'].length > 0">
                  <p>Alternative version:</p>
                  <router-link v-for="(alternative,index) in cmpMapAnimeObjInfo.related['Alternative version']" :key="index" :to="{ name: 'Manga', params: { mal_id: alternative.mal_id } }">> {{alternative.name}}</router-link>
                </div>

                <div class="related_summary" v-if="cmpMapAnimeObjInfo.related.Summary && cmpMapAnimeObjInfo.related.Summary.length > 0">
                  <p>Summary:</p>
                  <router-link v-for="(summary, index) in cmpMapAnimeObjInfo.related.Summary" :key="index" :to="{ name: 'Anime', params: { mal_id: summary.mal_id } }">> {{summary.name}}</router-link>
                </div>

                <div class="related_full_story" v-if="cmpMapAnimeObjInfo.related['Full story'] && cmpMapAnimeObjInfo.related['Full story'].length > 0">
                  <p>Full story:</p>
                  <router-link v-for="(fullstory, index) in cmpMapAnimeObjInfo.related['Full story']" :key="index" :to="{ name: 'Anime', params: { mal_id: fullstory.mal_id } }">> {{fullstory.name}}</router-link>
                </div>

                <div class="related_prequel" v-if="cmpMapAnimeObjInfo.related.Prequel && cmpMapAnimeObjInfo.related.Prequel.length > 0">
                  <p>Prequel:</p>
                  <router-link v-for="(prequel, index) in cmpMapAnimeObjInfo.related.Prequel" :key="index" :to="{ name: 'Anime', params: { mal_id: prequel.mal_id } }">> {{prequel.name}}</router-link>
                </div>

                <div class="related_sequel" v-if="cmpMapAnimeObjInfo.related.Sequel && cmpMapAnimeObjInfo.related.Sequel.length > 0">
                  <p>Sequel:</p>
                  <router-link v-for="(sequel, index) in cmpMapAnimeObjInfo.related.Sequel" :key="index" :to="{ name: 'Anime', params: { mal_id: sequel.mal_id } }">> {{sequel.name}}</router-link>
                </div>

                <div class="related_side_story" v-if="cmpMapAnimeObjInfo.related['Side story'] && cmpMapAnimeObjInfo.related['Side story'].length > 0">
                  <p>Side story:</p>
                  <router-link v-for="(side_story, index) in cmpMapAnimeObjInfo.related['Side story']" :key="index" :to="{ name: 'Anime', params: { mal_id: side_story.mal_id } }">> {{side_story.name}}</router-link>
                </div>

                <div class="related_parent_story" v-if="cmpMapAnimeObjInfo.related['Parent story'] && cmpMapAnimeObjInfo.related['Parent story'].length > 0">
                  <p>Parent story:</p>
                  <router-link v-for="(parent_story, index) in cmpMapAnimeObjInfo.related['Parent story']" :key="index" :to="{ name: 'Anime', params: { mal_id: parent_story.mal_id } }">> {{parent_story.name}}</router-link>
                </div>

                <div class="related_character" v-if="cmpMapAnimeObjInfo.related.Character && cmpMapAnimeObjInfo.related.Character.length > 0">
                  <p>Character:</p>
                  <router-link v-for="(character, index) in cmpMapAnimeObjInfo.related.Character" :key="index" :to="{ name: 'Anime', params: { mal_id: character.mal_id } }">> {{character.name}}</router-link>
                </div>

                <div class="related_other" v-if="cmpMapAnimeObjInfo.related.Other && cmpMapAnimeObjInfo.related.Other.length > 0">
                  <p>Other:</p>
                  <router-link v-for="(other, index) in cmpMapAnimeObjInfo.related.Other" :key="index" :to="{ name: 'Anime', params: { mal_id: other.mal_id } }">> {{other.name}}</router-link>
                </div>

                <div class="related_spin_off" v-if="cmpMapAnimeObjInfo.related['Spin-off'] && cmpMapAnimeObjInfo.related['Spin-off'].length > 0">
                  <p>Spin-off:</p>
                  <router-link v-for="(spinoff, index) in cmpMapAnimeObjInfo.related['Spin-off']" :key="index" :to="{ name: 'Anime', params: { mal_id: spinoff.mal_id } }">> {{spinoff.name}}</router-link>
                </div>
              </div>
            </div>
          </div>

          <div class="animeobj_character" v-if="cmpShowAreaCharacter">
            <h1 class="animeobj_character_title">Characters...</h1>
            <div class="animeobj_character_list">
              <!-- <CharacterListItemComp
                v-for="(item, index) in cmpMapAnimeCharacterList"
                :key="index"
                :mal_id="item.mal_id"
                :name="item.name"
                :image_url="item.image_url"
              /> -->
              <CharacterFullItemComp
                v-for="(item, index) in cmpMapAnimeCharacterList"
                :key="index"
                :mal_id="item.mal_id"
                :name="item.name"
                :role="item.role"
                :image_url="item.image_url"
              />
            </div>
          </div>

          <div class="animeobj_staff" v-if="cmpShowAreaStaff">
            <h1 class="animeobj_staff_title">Staff...</h1>
            <div class="animeobj_staff_list">
              <!-- <PeopleListItemComp
                v-for="(item, index) in cmpMapAnimeStaffList"
                :key="index"
                :mal_id="item.mal_id"
                :name="item.name"
                :image_url="item.image_url"
              /> -->
              <PeopleFullItemComp
                v-for="(item, index) in cmpMapAnimeStaffList"
                :key="index"
                :mal_id="item.mal_id"
                :name="item.name"
                :positions="item.positions"
                :image_url="item.image_url"
              />
            </div>
          </div>

          <div class="animeobj_btn_top">
            <ScrollTopComp />
          </div>
        </div>

      <p class="pAnimeObjNoData" v-if="cmpShowNoData">No data...</p>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// import CharacterListItemComp from "@/components/Character/CharacterListItemComp.vue";
import CharacterFullItemComp from "@/components/Character/CharacterFullItemComp.vue";
// import PeopleListItemComp from "@/components/People/PeopleListItemComp.vue";
import PeopleFullItemComp from "@/components/People/PeopleFullItemComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";
export default {
  components: {
    // CharacterListItemComp,
    CharacterFullItemComp,
    // PeopleListItemComp,
    PeopleFullItemComp,
    ScrollTopComp,
  },
  name: "anime-obj-view",
  beforeRouteUpdate(to, from, next) {
    this.mal_id = to.params.mal_id;
    this.mthLoadAnimeObj();
    next();
  },
  props: [],
  mounted() {
    this.mthLoadAnimeObj();
  },
  data() {
    return {
      mal_id: this.$route.params.mal_id,
    };
  },
  methods: {
    ...mapActions({
      mthMapLoadAnimeObj: "actLoadAnimeObj",
    }),
    mthLoadAnimeObj() {
      // alert(this.mal_id);
      this.mthMapLoadAnimeObj({ mal_id: this.mal_id });
      window.scrollTo(0, 0);
    },
  },
  computed: {
    ...mapGetters({
      cmpMapAnimeObjLoading: "gettAnimeObjLoading",
      cmpMapAnimeObjInfo: "gettAnimeObjInfo",
      cmpMapAnimeCharacterList: "gettAnimeListCharacter",
      cmpMapAnimeStaffList: "gettAnimeListStaff",
    }),
    cmpAnimeObjAnyData() {
      //true: no data, false: data
      return Object.keys(this.cmpMapAnimeObjInfo).length === 0;
    },
    cmpLoadingStatus() {
      return this.cmpMapAnimeObjLoading;
    },
    cmpShowLoading() {
      return this.cmpLoadingStatus === true;
    },
    cmpShowInfo() {
      return (
        this.cmpLoadingStatus === false && this.cmpAnimeObjAnyData === false
      );
    },
    cmpShowNoData() {
      return (
        this.cmpAnimeObjAnyData === true && this.cmpLoadingStatus === false
      );
    },
    cmpShowAreaCharacter() {
      return this.cmpMapAnimeCharacterList.length > 0;
    },
    cmpShowAreaStaff() {
      return this.cmpMapAnimeStaffList.length > 0;
    },
  },
};
</script>

<style scoped>
.divAnimeObjView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--animeresultview-pdd);
  grid-template-areas: "AnimeView";
  grid-template-columns: 1fr;
  align-content: start;
}

.pAnimeObjLoading, .pAnimeObjNoData {
  justify-self: center;
  padding: 100px;
}

.divAnimeObjInfo {
  display: grid;
  gap: 10px;
  grid-template-areas: "AnimeInfo";
  grid-template-columns: 1fr;
  align-content: start;
}

.animeobjview-enter-active {
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

.animeobjview-leave-active {
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

.animeobj_info_base {
  z-index: 1;
  /* background-color: purple; */

  display: grid;
  gap: 10px;
  grid-template-areas: var(--animeobj-grd-areas);
  grid-template-columns: var(--animeobj-grd-columns);
}

.animeobj_cover {
  z-index: 1;
  grid-area: Cover;
  min-width: 100%;
  max-width: 300px;
  min-height: 300px;
  /* max-height: 300px; */
  object-fit: contain;
  left: 0;
  top: 10px;
  position: var(--animeobj-img-cover);
}

.animeobj_info_general {
  z-index: 2;
  grid-area: InfoBase;
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  align-content: start;
}

.animeobj_title {
  font-size: 42px;
  line-height: 42px;
  font-weight: bold;
  word-wrap: normal;
  word-break: break-all;
}

.animeobj_openings, .animeobj_endings {
  border-top: 4px solid var(--animeobj-div-brd-top);
  padding-top: 5px;
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
}

.animeobj_related, .animeobj_related > div{
  display: grid;
  grid-auto-flow: row;
}

.animeobj_related > div{
  border-top: 4px solid var(--animeobj-div-brd-top);
  padding-top: 5px;
}

.animeobj_related a {
  text-decoration: none;
  font-weight: 600;
  padding: 5px;
  margin: 5px;
  color: var(--animeobj-related-links-clr);
}

.animeobj_related a:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.animeobj_character {
  z-index: 2;
}

.animeobj_staff {
  z-index: 3;
}

.animeobj_character,
.animeobj_staff {
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  /* background-color: rgba(0, 0, 0, 0.2); */
}

.animeobj_character_title,
.animeobj_staff_title {
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
  position: sticky;
  left: 0;
  top: 10px;
  user-select: none;
  padding: 0px 10px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}

.animeobj_character_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  grid-template-rows: auto;
}

.animeobj_staff_list {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(150px, auto));
  grid-template-rows: auto;
}

.animeobj_btn_top {
  z-index: 4;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 10px;
}
</style>
