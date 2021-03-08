<template>
  <div class="divAboutView">
    <h1>about-view Component</h1>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "about-view",
  props: [],
  mounted() {
    this.mthViewLoaded();
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      mthMapActSetStatusSplashScreenVisible: "actSetStatusSplashScreenVisible",
    }),
    mthViewLoaded() {
      this.mthMapActSetStatusSplashScreenVisible(false);
    },
  },
  computed: {},
};
</script>

<style scoped></style>
