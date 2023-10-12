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

<script>
import { mapState, mapActions } from "pinia";
import { useRecipeStore } from "../stores/recipes";
export default {
  computed: {
    ...mapState(useRecipeStore, ["allRecipes"]),
  },
  data() {
    return {
      selectedRecipe: null,
    };
  },
  watch: {
    $route(to, from) {
      console.log(`Route changed: ${from.path} -> ${to.path} `);
      this.setSelectedRecipe();
    },
  },
  methods: {
    ...mapActions(useRecipeStore, ["refreshRecipes"]),
    setSelectedRecipe() {
      this.selectedRecipe = this.allRecipes.find(
        (x) => x.id == this.$route.params.id
      );
    },
    recipeUpdated(recipe) {
      console.log("so now i know recipe is updated...", recipe);
    },
    recipeDeleted(args) {
      if (this.selectedRecipe && this.selectedRecipe.id === args.id) {
        this.selectedRecipe = null;
      }
    },
  },
  async mounted() {
    await this.refreshRecipes();
    this.setSelectedRecipe();
  },
};
</script>
