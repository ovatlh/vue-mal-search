<template>
  <router-link
    class="divPeopleListItemComp"
    :title="`Name: ${name} - Positions: ${positionsFull}`"
    :to="{
      name: 'Person',
      params: { mal_id: this.mal_id },
    }"
  >
    <img class="imgBG" :src="mthIsImageNull(image_url)" :alt="name" />
    <div class="people_item_content">
      <img class="imgCover" :src="mthIsImageNull(image_url)" :alt="name" />
      <p class="item_name">
        {{ mthMaxCharacters(name) }}{{ mthTitleNext(name) }}
      </p>
      <p class="item_positions">
        Positions: {{ mthMaxCharacters(positions[0])
        }}{{ mthTitleNext(positions[0]) }}{{ mthPositionsFull(positions) }}
      </p>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "people-full-item-comp",
  props: {
    mal_id: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: "Name",
    },
    positions: {},
    image_url: null,
  },
  mounted() {},
  data() {
    return {
      MaxCharacters: 15,
      positionsFull: "",
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
    mthLoadPeopleObj() {
      // alert(`${this.mal_id} - ${this.name}`);
      this.$router.push({
        name: "Person",
        params: { mal_id: this.mal_id },
      });
    },
    mthPositionsFull(value_positions) {
      // value_positions.forEach(function(elemento) {
      //   this.positionsFull + elemento;
      // });
      this.positionsFull = value_positions.join(", ");
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
.divPeopleListItemComp {
  text-decoration: none;
  color: var(--peoplefullitem-clr);
  background-color: #1e1e1e;
  user-select: none;
  cursor: pointer;

  display: grid;
  grid-template-areas: "PeopleItem";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  overflow: hidden;
  height: var(--peoplefullitem-height);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
}

.imgBG {
  grid-area: PeopleItem;
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

.people_item_content {
  grid-area: PeopleItem;
  z-index: 2;

  display: grid;
  grid-template-areas: "Cover" "Name" "Positions";
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto 1fr;
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
  justify-self: center;
}

.item_name,
.item_positions {
  font-weight: 600;
  text-align: center;
  align-self: center;
  padding: 0 10px;
  font-size: 12px;
}
</style>
