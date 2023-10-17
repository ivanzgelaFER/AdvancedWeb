<template>
  <div v-if="selectedRecipe" class="d-flex flex-column align-items-center">
    <h2>Recipe #{{ selectedRecipe.id }}</h2>
    <recipe-card
      :id="selectedRecipe.id"
      :zoom="1"
      can-edit="true"
      @recipe-updated="recipeUpdated"
      @recipe-deleted="recipeDeleted"
    ></recipe-card>
  </div>
  <div v-else>
    <h2>All recipes ({{ allRecipes.length }})</h2>
    <hr />
    <div class="container-fluid p-2 d-flex flex-wrap">
      <recipe-card
        v-for="recipe in allRecipes"
        :key="recipe.id"
        :id="recipe.id"
        @recipe-updated="recipeUpdated"
        @recipe-deleted="recipeDeleted"
      ></recipe-card>
    </div>
  </div>
</template>

<script setup>
import { useRecipeStore } from "../stores/recipes";
import { useRoute } from "vue-router";
import { ref, watch, onMounted } from "vue";
import { storeToRefs } from "pinia";

let recipeStore = useRecipeStore();
let { allRecipes } = storeToRefs(recipeStore);

let selectedRecipe = ref(null);
const route = useRoute();
watch(
  () => route.params.id,
  async (to, from) => {
    console.log(`Route changed: ${from} -> ${to} `);
    setSelectedRecipe();
  }
);
const setSelectedRecipe = () => {
  selectedRecipe.value = recipeStore.getRecipeById(route.params.id);
};

const recipeUpdated = (recipe) => {
  console.log("so now i know recipe is updated...", recipe);
};
const recipeDeleted = (args) => {
  if (selectedRecipe.value && selectedRecipe.value.id === args.id) {
    selectedRecipe.value = null;
  }
};
onMounted(async () => {
  await recipeStore.refreshRecipes();
  setSelectedRecipe();
});
</script>
