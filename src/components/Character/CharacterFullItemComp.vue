<template>
  <router-link
    class="divCharacterListItemComp"
    :title="`Name: ${name} - Role: ${role}`"
    :to="{
      name: 'Character',
      params: { mal_id: this.mal_id },
    }"
  >
    <img class="imgBG" :src="mthIsImageNull(image_url)" :alt="name" />
    <div class="character_item_content">
      <img class="imgCover" :src="mthIsImageNull(image_url)" :alt="name" />
      <p class="item_name">
        {{ mthMaxCharacters(name) }}{{ mthTitleNext(name) }}
      </p>
      <p class="item_role">
        Role: {{ mthMaxCharacters(role) }}{{ mthTitleNext(role) }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "character-full-item-comp",
  props: {
    mal_id: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: "Name",
    },
    role: {
      type: String,
      default: "Role",
    },
    image_url: null,
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
    mthTitleNext(string_value) {
      if (this.mthMaxCharactersLimit(string_value)) {
        return "...";
      }

      return "";
    },
    mthLoadCharacterObj() {
      // alert(`${this.mal_id} - ${this.name}`);
      this.$router.push({
        name: "Character",
        params: { mal_id: this.mal_id },
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
.divCharacterListItemComp {
  text-decoration: none;
  color: var(--characterfullitem-clr);
  background-color: #1e1e1e;
  user-select: none;
  cursor: pointer;

  display: grid;
  grid-template-areas: "CharacterItem";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  overflow: hidden;
  height: var(--characterlistitem-height);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.imgBG {
  grid-area: CharacterItem;
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

.character_item_content {
  grid-area: CharacterItem;
  z-index: 2;

  display: grid;
  grid-template-areas: "Cover" "Name" "Role";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto 1fr;
  height: var(--characterlistitem-height);
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
  justify-self: center;
}

.item_name,
.item_role {
  font-weight: 600;
  text-align: center;
  align-self: center;
  font-size: 12px;
}
</style>
