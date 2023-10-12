<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header
    class="d-flex justify-content-between bg-light border border-bottom border-dark p-3 align-items-baseline"
  >
    <h1>My cookbook (ver04)</h1>
    <nav>
      <RouterLink to="/">Recipes</RouterLink>
      |
      <RouterLink to="/calculator">Calculator</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
nav a {
  font-size: 1.2rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
nav a.router-link-exact-active {
  background-color: gold;
}
</style>
