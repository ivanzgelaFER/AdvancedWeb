<script setup>
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div id="layout">
    <main class="main">
      <AppHeader />
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#layout {
    min-height: 100vh;
    display: flex;
    color: black;
    background-color: white;
}

#layout main {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    width: 100%;
    padding: 0 50px;
}
#layout main > div {
    width: 100%;
}
#layout main > div > div {
    padding: 2rem 0;
}
</style>
