<template>
  <div class="divPeopleObjView">
    <transition name="peopleobjview" mode="out-in">
      <p class="pPeopleObjLoading" v-if="cmpShowLoading">Loading...</p>

      <div class="divPeopleInfo" v-if="cmpShowInfo">
        <div class="peopleobj_info_base">
          <img
            class="peopleobj_cover"
            :src="mthIsImageNull(cmpMapPeopleObjInfo.image_url)"
            :alt="cmpMapPeopleObjInfo.name"
            :title="cmpMapPeopleObjInfo.name"
          />

          <div class="peopleobj_info_general">
            <p class="peopleobj_name">{{ cmpMapPeopleObjInfo.name }}</p>
            <p
              class="peopleobj_alternames"
              v-if="
                cmpMapPeopleObjInfo.alternate_names &&
                  cmpMapPeopleObjInfo.alternate_names.length > 0
              "
            >
              Alternate names:
              <strong>{{
                cmpMapPeopleObjInfo.alternate_names.join(", ")
              }}</strong>
            </p>
            <p
              class="peopleobj_given_name"
              v-if="
                cmpMapPeopleObjInfo.given_name &&
                  cmpMapPeopleObjInfo.given_name.length > 0
              "
            >
              Given name: <strong>{{ cmpMapPeopleObjInfo.given_name }}</strong>
            </p>

            <p
              class="peopleobj_family_name"
              v-if="
                cmpMapPeopleObjInfo.family_name &&
                  cmpMapPeopleObjInfo.family_name.length > 0
              "
            >
              Family name:
              <strong>{{ cmpMapPeopleObjInfo.family_name }}</strong>
            </p>

            <a
              v-if="
                cmpMapPeopleObjInfo.website_url &&
                  cmpMapPeopleObjInfo.website_url.length > 0
              "
              :href="cmpMapPeopleObjInfo.website_url"
              target="_blank"
              class="peopleobj_website"
              >> Website:
              <strong>{{ cmpMapPeopleObjInfo.website_url }}</strong></a
            >

            <p>About:</p>
            <p
              v-html="AboutWithBrTags"
              v-if="
                cmpMapPeopleObjInfo.about &&
                  cmpMapPeopleObjInfo.about.length > 0
              "
            ></p>
          </div>
        </div>

        <PeopleMangaListComp
          :mangas_list="cmpMapPeopleObjListPublishedManga"
          v-if="cmpShowMangasArea"
        />

        <PeoplePositionsListComp
          :positions_list="cmpMapPeopleObjListAnimeStaffPositions"
          v-if="cmpShowPositionsArea"
        />

        <div class="peopleobj_roles_list_by" v-if="cmpShowRolesArea">
          <p class="roles_list_by">Roles by:</p>
          <div class="roles_by_options">
            <input type="radio" id="none" value="0" v-model="roles_type" />
            <label for="none">None</label>
            <input type="radio" id="character" value="1" v-model="roles_type" />
            <label for="character">Character</label>
            <input type="radio" id="anime" value="2" v-model="roles_type" />
            <label for="anime">Anime</label>
            <input type="radio" id="disable" value="3" v-model="roles_type" />
            <label for="disable">Disable</label>
          </div>
        </div>

        <div class="peopleobj_roles_lists" v-if="cmpShowRolesArea">
          <AllRolesListComp
            :list_items="cmpMapPeopleObjListRoles"
            v-if="cmpShowRolesNone"
          />

          <RolesByListComp
            :list_type="1"
            :list_items="cmpMapPeopleObjListRolesByCharacter"
            v-if="cmpShowRolesByCharacter"
          />

          <RolesByListComp
            :list_type="0"
            :list_items="cmpMapPeopleObjListRolesByAnime"
            v-if="cmpShowRolesByAnime"
          />
        </div>

        <div class="peopleobj_btn_top">
          <ScrollTopComp />
        </div>
      </div>

      <p class="pPeopleObjNoData" v-if="cmpShowNoData">No data...</p>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import PeopleMangaListComp from "@/components/People/PeopleMangaListComp.vue";
import PeoplePositionsListComp from "@/components/People/PeoplePositionsListComp.vue";
import AllRolesListComp from "@/components/People/AllRolesListComp.vue";
import RolesByListComp from "@/components/People/RolesByListComp.vue";
import ScrollTopComp from "@/components/ScrollTopComp.vue";
export default {
  components: {
    PeopleMangaListComp,
    PeoplePositionsListComp,
    AllRolesListComp,
    RolesByListComp,
    ScrollTopComp,
  },
  name: "people-obj-view",
  beforeRouteUpdate(to, from, next) {
    this.mal_id = to.params.mal_id;
    this.mthLoadPeopleObj();
    next();
  },
  props: [],
  mounted() {
    this.mthViewLoaded();
    this.mthLoadPeopleObj();
  },
  data() {
    return {
      mal_id: this.$route.params.mal_id,
      roles_type: "3", //0: none, 1: anime, 2: character
    };
  },
  methods: {
    ...mapActions({
      mthMapActSetStatusSplashScreenVisible: "actSetStatusSplashScreenVisible",
      mthMapLoadPeopleObj: "actLoadPeopleObj",
    }),
    mthViewLoaded() {
      this.mthMapActSetStatusSplashScreenVisible(false);
    },
    mthLoadPeopleObj() {
      this.mthMapLoadPeopleObj({ mal_id: this.mal_id });
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
      cmpMapPeopleObjListRoles: "gettPeopleObjListRoles",
      cmpMapPeopleObjListRolesByAnime: "gettPeopleObjListRolesByAnime",
      cmpMapPeopleObjListRolesByCharacter: "gettPeopleObjListRolesByCharacter",

      cmpMapPeopleObjInfo: "gettPeopleObjInfo",
      cmpMapPeopleObjListAnimeStaffPositions:
        "gettPeopleObjListAnimeStaffPositions",
      cmpMapPeopleObjListPublishedManga: "gettPeopleObjListPublishedManga",
      cmpMapPeopleObjLoading: "gettPeopleObjLoading",
    }),
    cmpPeopleObjAnyData() {
      //true: no data, false: data
      return Object.keys(this.cmpMapPeopleObjInfo).length === 0;
    },
    cmpLoadingStatus() {
      return this.cmpMapPeopleObjLoading;
    },
    cmpShowLoading() {
      return this.cmpLoadingStatus === true;
    },
    cmpShowInfo() {
      return (
        this.cmpLoadingStatus === false && this.cmpPeopleObjAnyData === false
      );
    },
    cmpShowNoData() {
      return (
        this.cmpPeopleObjAnyData === true && this.cmpLoadingStatus === false
      );
    },
    cmpShowAreaRolesByNone() {
      return this.cmpMapPeopleObjListRoles.length > 0;
    },
    cmpShowAreaRolesByAnime() {
      return this.cmpMapPeopleObjListRolesByAnime.length > 0;
    },
    cmpShowAreaRolesByCharacter() {
      return this.cmpMapPeopleObjListRolesByCharacter.length > 0;
    },
    AboutWithBrTags: function() {
      const doc = this.cmpMapPeopleObjInfo.about;
      return doc.replace(/(\\r)*\\n/g, "<br>");
    },

    cmpShowRolesNone() {
      return this.roles_type === "0";
    },
    cmpShowRolesByCharacter() {
      return this.roles_type === "1";
    },
    cmpShowRolesByAnime() {
      return this.roles_type === "2";
    },

    cmpShowRolesArea() {
      //cmpShowAreaRolesByNone: true: length > 0, false: length < 0
      return this.cmpShowAreaRolesByNone === true;
    },
    cmpShowPositionsArea() {
      return this.cmpMapPeopleObjListAnimeStaffPositions.length > 0;
    },
    cmpShowMangasArea() {
      return this.cmpMapPeopleObjListPublishedManga.length > 0;
    },
  },
};
</script>

<style scoped>
.divPeopleObjView {
  z-index: var(--view-index);
  display: grid;
  gap: 10px;
  padding: var(--peopleresultview-pdd);
  grid-template-areas: "AnimeView";
  grid-template-columns: 1fr;
  align-content: start;
}

.pPeopleObjLoading,
.pPeopleObjNoData {
  justify-self: center;
  padding: 100px;
}

.divPeopleInfo {
  display: grid;
  gap: 10px;
  grid-template-areas: "PeopleInfo";
  grid-template-columns: 1fr;
  align-content: start;
}

.peopleobj_info_base {
  z-index: 1;
  display: grid;
  gap: 10px;
  grid-template-areas: var(--peopleobj-grd-areas);
  grid-template-columns: var(--peopleobj-grd-columns);
}

.peopleobj_cover {
  z-index: 1;
  grid-area: Cover;
  min-width: 100%;
  max-width: 300px;
  min-height: 300px;
  /* max-height: 300px; */
  object-fit: contain;
  left: 0;
  top: 10px;
  position: var(--peopleobj-img-cover);
}

.peopleobj_info_general {
  z-index: 2;
  grid-area: InfoBase;
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  align-content: start;
}

.peopleobj_name {
  font-size: 42px;
  line-height: 42px;
  font-weight: bold;
  word-wrap: normal;
  word-break: break-all;
}

.peopleobj_website {
  text-decoration: none;
  padding: 5px;
  color: var(--peopleobj-related-links-clr);
}

.peopleobj_website:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.peopleobjview-enter-active {
  animation: fade-in 1s ease-out;
}

.peopleobjview-leave-active {
  animation: fade-out 0.1s ease-out;
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

.peopleobj_roles_list_by {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, auto));
  grid-template-rows: auto;
  align-items: start;
  background-color: rgba(0, 0, 0, 0.3);
}

.roles_list_by {
  font-weight: 600;
  padding: 10px;
}

.roles_by_options {
  display: grid;
  gap: 5px;
  padding: 10px;
  grid-template-columns: auto auto auto auto auto auto;
  grid-template-rows: 1fr;
  align-items: center;
  justify-self: start;
}

.roles_by_options label {
  padding: 0 10px;
  cursor: pointer;
}

.peopleobj_roles_lists {
  display: grid;
  grid-auto-flow: row;
  gap: 10px;
  align-items: start;
  grid-template-columns: 1fr;
}

.peopleobj_btn_top {
  z-index: 4;
  position: fixed;
  right: 0;
  bottom: 0;
  padding: 10px;
}
</style>
