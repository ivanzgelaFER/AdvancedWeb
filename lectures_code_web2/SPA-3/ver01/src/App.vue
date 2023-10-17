<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav
      class="d-flex justify-content-center bg-light border border-bottom border-dark p-3 w-100"
    >
      <RouterLink to="/">Recipes</RouterLink>
      |
      <RouterLink to="/calculator">Calculator</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
nav a {
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
