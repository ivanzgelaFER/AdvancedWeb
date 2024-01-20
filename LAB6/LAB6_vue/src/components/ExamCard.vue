<template>
    <div>exam card</div>
</template>

<script>
export default {
  props: [
    "ispit",
    "predmet",
    "dvorana",
    "ostvareniBodovi",
    "ukupnoBodova",
  ],
  computed: {
    idUrl() {
      return "/recipes" + this.id;
    },
  },
  mounted() {
    console.log("mounted, zoom = " + this.zoom);
  }
};
</script>
<style scoped>
div.card-body .badge {
  white-space: pre-wrap;
}
</style>