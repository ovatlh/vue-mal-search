<template>
  <div class="divRoleItemComp">
    <router-link
      class="link_anime"
      :to="{ name: 'Anime', params: { mal_id: item.anime.mal_id } }"
      :title="`Anime: ${item.anime.name}`"
    >
      <img
        class="imgAnime"
        :src="item.anime.image_url"
        :alt="item.anime.name"
      />
      <p class="anime_name">
        Anime:
        {{ mthMaxCharacters(item.anime.name)
        }}{{ mthTitleNext(item.anime.name) }}
      </p>
    </router-link>

    <router-link
      class="link_character"
      :to="{ name: 'Character', params: { mal_id: item.character.mal_id } }"
      :title="`Character: ${item.character.name}`"
    >
      <img
        class="imgCharacter"
        :src="item.character.image_url"
        :alt="item.character.name"
      />
      <p class="character_name">
        Role: {{ item.role }} - {{ mthMaxCharacters(item.character.name)
        }}{{ mthTitleNext(item.character.name) }}
      </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "role-item-comp",
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  mounted() {},
  data() {
    return {
      MaxCharacters: 40,
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
  },
  computed: {},
};
</script>

<style scoped>
.divRoleItemComp {
  display: grid;
  gap: 5px;
  padding: 5px;
  grid-template-areas: "Anime" "Character";
  grid-auto-flow: row;
  grid-template-columns: 1fr;
  align-items: start;
  background-color: rgba(255, 255, 255, 0.05);
}

.link_anime {
  grid-area: Anime;
}

.link_character {
  grid-area: Character;
}

.link_anime,
.link_character {
  text-decoration: none;
  color: #ffffff;
  display: grid;
  gap: 5px;
  padding: 5px;
  grid-template-areas: "Img Name";
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr;
  border: 1px solid transparent;
}

.link_anime:hover,
.link_character:hover{
  border: 1px solid #ffffff;
  background-color: rgba(0, 0, 0, 0.3);
}

.imgAnime,
.imgCharacter {
  min-width: 100%;
  max-width: 50px;
  min-height: 50px;
  max-height: 50px;

  object-fit: contain;
  z-index: 1;
  align-self: center;
}

.anime_name,
.character_name {
  z-index: 2;
  font-weight: 600;
  word-break: break-all;
  align-self: center;
}
</style>
