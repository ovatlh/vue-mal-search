<template>
  <div class="divMangaListItemComp" :title="title" @click="mthLoadMangaObj">
    <img class="imgBG" :src="image_url" :alt="title" />
    <div class="manga_item_content">
      <img class="imgCover" :src="image_url" :alt="title" />
      <p class="item_title">
        {{ mthMaxCharacters(title) }}{{ mthTitleNext(title) }}
      </p>
      <p class="item_type">Type: {{ type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "manga-list-item-comp",
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
      default: "Type",
    },
    image_url: null,
  },
  mounted() {},
  data() {
    return {
      MaxCharacters: 50,
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
    mthLoadMangaObj() {
      alert(`${this.mal_id} - ${this.title}`);
    },
  },
  computed: {},
};
</script>

<style scoped>
.divMangaListItemComp {
  background-color: #1e1e1e;
  user-select: none;
  cursor: pointer;

  display: grid;
  grid-template-areas: "MangaItem";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  overflow: hidden;
  height: var(--mangalistitem-height);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.imgBG {
  grid-area: MangaItem;
  z-index: 1;

  object-fit: cover;
  position: relative;
  min-width: 110%;
  min-height: 110%;
  left: 0;
  top: 0;
  justify-self: center;
  align-self: center;

  filter: blur(5px) contrast(110%) brightness(50%);
}

.manga_item_content {
  grid-area: MangaItem;
  z-index: 2;

  display: grid;
  gap: 10px;
  padding-right: 10px;
  grid-template-areas: "Cover Title" "Cover Type";
  grid-template-columns:
    calc(
      calc(var(--mangalistitem-height) / 2) +
        calc(var(--mangalistitem-height) / 4)
    )
    1fr;
  grid-template-rows: 1fr 1fr;
  height: var(--mangalistitem-height);
}

.imgCover {
  grid-area: Cover;

  min-width: calc(
    calc(var(--mangalistitem-height) / 2) +
      calc(var(--mangalistitem-height) / 4)
  );
  max-width: calc(
    calc(var(--mangalistitem-height) / 2) +
      calc(var(--mangalistitem-height) / 4)
  );
  min-height: var(--mangalistitem-height);
  max-height: var(--mangalistitem-height);

  object-fit: contain;
  padding: 10px;
}

.item_title {
  align-self: end;
  font-weight: 600;
}

.item_type {
  align-self: start;
}
</style>
