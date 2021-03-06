<template>
  <div class="divRolesByItemComp">
    <router-link class="link_item" :to="cmpLinkTo" :title="item.name">
      <img
        class="imgCover"
        :src="mthIsImageNull(item.image_url)"
        :alt="item.name"
      />
      <p class="rolesby_title">{{ mthMaxCharacters(item.name) }}{{ mthCharactersNext(item.name) }}</p>
    </router-link>

    <div class="content_list">
      <router-link
        class="link_list_item"
        v-for="(item, index) in cmpListItems"
        :key="index"
        :title="item.name"
        :to="mthLinkListTo(item)"
      >
        <img
          class="imgItemCover"
          :src="mthIsImageNull(item.image_url)"
          :alt="item.name"
        />
        <p>{{ item.role }}: {{ item.name }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "roles-by-item-comp",
  props: {
    item_type: {
      type: Number,
      default: null,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  mounted() {},
  data() {
    return {
      MaxCharacters: 20,
    };
  },
  methods: {
    mthMaxCharacters(string_value) {
      return string_value.substring(0, this.MaxCharacters);
    },
    mthMaxCharactersLimit(string_value) {
      return string_value.length >= this.MaxCharacters;
    },
    mthCharactersNext(string_value) {
      if (this.mthMaxCharactersLimit(string_value)) {
        return "...";
      }

      return "";
    },
    mthIsImageNull(image_url) {
      return image_url != null && image_url.length > 0
        ? image_url
        : require("@/assets/no-image.png");
    },
    mthLinkListTo(list_item) {
      return this.item_type === 1
        ? { name: "Anime", params: { mal_id: list_item.mal_id } }
        : { name: "Character", params: { mal_id: list_item.mal_id } };
    },
  },
  computed: {
    cmpLinkTo() {
      // return this.item_type === 0 ? this.item.animes : this.item.characters ;
      return this.item_type === 0
        ? { name: "Anime", params: { mal_id: this.item.mal_id } }
        : { name: "Character", params: { mal_id: this.item.mal_id } };
    },
    cmpListItems() {
      return this.item_type === 1 ? this.item.animes : this.item.characters;
    },
  },
};
</script>

<style scoped>
.divRolesByItemComp {
  display: grid;
  gap: 10px;
  grid-template-areas: var(--rolesbyitem-grd-areas);
  grid-template-columns: var(--rolesbyitem-grd-columns);
  align-items: start;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 5px;
}

.divRolesByItemComp a {
  text-decoration: none;
  color: #ffffff;
  border: 1px solid transparent;
  padding: 5px;
}

.divRolesByItemComp a:hover {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid #ffffff;
}

.link_item {
  z-index: 2;
  grid-area: Item;

  display: grid;
  grid-auto-flow: row;
  grid-template-areas: "Img" "Name";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
}

.imgCover {
  min-width: 100%;
  max-width: 100%;
  min-height: 250px;
  max-height: 250px;

  object-fit: contain;
}

.content_list {
  z-index: 1;

  grid-area: List;
  display: grid;
  gap: 10px;
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-items: start;
}

.link_list_item {
  display: grid;
  gap: 10px;
  grid-template-areas: "Img Text";
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  align-items: start;
}

.link_list_item > p {
  word-break: break-all;
  align-self: center;
}

.imgItemCover {
  max-width: 100%;
  min-height: 50px;
  max-height: 50px;
  object-fit: contain;
}
</style>
