<template>
  <div class="divAnimeListItemComp" :title="title" @click="mthLoadAnimeObj">
    <img class="imgBG" :src="mthIsImageNull(image_url)" :alt="title" />
    <div class="anime_item_content">
      <img class="imgCover" :src="mthIsImageNull(image_url)" :alt="title" />
      <p class="item_title">
        {{ mthMaxCharacters(title) }}{{ mthTitleNext(title) }}
      </p>
      <p class="item_type" v-if="type && type.length > 0">Type: {{ type }}</p>
      <p class="item_role" v-if="role && role.length > 0">Role: {{ role }}</p>
      <p class="item_position" v-if="position && position.length > 0">
        Position: {{ position }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "anime-list-item-comp",
  props: {
    mal_id: {
      type: Number,
      default: 1,
    },
    title: {
      type: String,
      default: "Title",
    },
    type: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      default: null,
    },
    position: {
      type: String,
      default: null,
    },
    image_url: null,
  },
  mounted() {},
  data() {
    return {
      MaxCharacters: 30,
    };
  },
  methods: {
    mthMaxCharacters(string_value) {
      return string_value.substring(0, this.MaxCharacters);
    },
    mthMaxCharactersLimit(string_value) {
      return string_value.length >= this.MaxCharacters;
    },
    mthTitleNext(string_value) {
      if (this.mthMaxCharactersLimit(string_value)) {
        return "...";
      }

      return "";
    },
    mthLoadAnimeObj() {
      // alert(`${this.mal_id} - ${this.title}`);
      this.$router.push({
        name: "Anime",
        params: {
          mal_id: this.mal_id,
        },
      });
    },
    mthIsImageNull(image_url) {
      return image_url != null && image_url.length > 0
        ? image_url
        : require("@/assets/no-image.png");
    },
  },
  computed: {},
};
</script>

<style scoped>
.divAnimeListItemComp {
  background-color: #1e1e1e;
  user-select: none;
  cursor: pointer;

  display: grid;
  grid-template-areas: "AnimeItem";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  overflow: hidden;
  height: var(--animelistitem-height);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.imgBG {
  grid-area: AnimeItem;
  z-index: 1;

  object-fit: cover;
  position: relative;
  min-width: 110%;
  min-height: 110%;
  left: 0;
  top: 0;
  justify-self: center;
  align-self: center;

  filter: blur(5px) contrast(130%) brightness(30%);
}

.anime_item_content {
  grid-area: AnimeItem;
  z-index: 2;

  display: grid;
  gap: 10px;
  padding-right: 10px;
  grid-template-areas: "Cover Title" "Cover Type";
  grid-template-columns:
    calc(
      calc(var(--animelistitem-height) / 2) +
        calc(var(--animelistitem-height) / 4)
    )
    1fr;
  grid-template-rows: 1fr 1fr;
  height: var(--animelistitem-height);
}

.imgCover {
  grid-area: Cover;

  min-width: calc(
    calc(var(--animelistitem-height) / 2) +
      calc(var(--animelistitem-height) / 4)
  );
  max-width: calc(
    calc(var(--animelistitem-height) / 2) +
      calc(var(--animelistitem-height) / 4)
  );
  min-height: var(--animelistitem-height);
  max-height: var(--animelistitem-height);

  object-fit: contain;
  padding: 10px;
}

.item_title {
  align-self: end;
  font-weight: 600;
}

.item_type,
.item_role,
.item_position {
  align-self: start;
}
</style>
