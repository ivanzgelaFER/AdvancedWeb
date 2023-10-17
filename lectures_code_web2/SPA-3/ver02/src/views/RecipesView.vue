<template>
  <div v-if="$route.params.id">
    You are looking for recipe id {{ $route.params.id }} <br />Try something
    <router-link :to="'/recipes/' + somethingElse">
      else e.g. {{ somethingElse }} ...
    </router-link>
  </div>
  <div v-else>All recipes</div>
  <ul>
    <li v-for="msg in routeChanges" :key="msg">{{ msg }}</li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      routeChanges: [],
      somethingElse: Math.floor(Math.random() * 1000),
    };
  },
  watch: {
    $route(to, from) {
      this.routeChanges.push(`Route changed: ${from.path} -> ${to.path} `);
      this.somethingElse = Math.floor(Math.random() * 1000);
    },
  },
};
</script>
<style scoped>
* {
  font-size: 32px;
  color: navy;
}
</style>
