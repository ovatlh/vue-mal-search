<template>
  <div class="divNotFoundView">
    <h1>404 - Not Found</h1>
  </div>
</template>

<script>
export default {
  name: "not-found-view",
  props: [],
  mounted() {
    document.title = "MAL - 404 - Not Found";
  },
  data() {
    return {};
  },
  methods: {},
  computed: {},
};
</script>

<style scoped>
.divNotFoundView {
  display: grid;
  padding: 10px;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
}
</style>
