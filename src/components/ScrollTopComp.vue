<template>
  <div @click="mthScrollToTop" class="button_scrolltop">
    <span class="material-icons-sharp">publish</span>
  </div>
</template>

<script>
export default {
  name: "scroll-top-comp",
  props: [],
  mounted() {},
  data() {
    return {};
  },
  methods: {
    mthScrollToTop() {
      window.scrollTo(0, 0);
    },
  },
  computed: {},
};
</script>

<style scoped>
.button_scrolltop {
  grid-area: AnimeControls;
  display: grid;
  padding: 5px;
  margin: 5px;
  justify-content: center;
  align-content: center;
  justify-self: end;
  align-self: center;
  user-select: none;

  background-color: #ffffff;
  color: #000000;
  border: 1px solid transparent;
  border-radius: 360%;
  cursor: pointer;

  transition: 0.1s ease-out;
}

.button_scrolltop:hover {
  transform: scale(1.1);
}

.button_scrolltop:active {
  transform: scale(1);
}
</style>
