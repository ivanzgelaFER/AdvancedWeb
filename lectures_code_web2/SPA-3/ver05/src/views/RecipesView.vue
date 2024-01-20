<template>
  <div v-if="selectedRecipe" class="d-flex flex-column align-items-center">
    <h2>Recipe #{{ selectedRecipe.id }}</h2>
    <recipe-card
      :key="selectedRecipe.id"
      v-model="allRecipes[selectedRecipeIndex]"
      :zoom="1"
      can-edit="true"
      @delete-recipe="deleteRecipe"
    ></recipe-card>
  </div>
  <div v-else>
    <h2>All recipes ({{ allRecipes.length }})</h2>
    <hr />
    <div class="container-fluid p-2 d-flex flex-wrap">
      <recipe-card
        v-for="(recipe, index) in allRecipes"
        :key="recipe.id"
        v-model="allRecipes[index]"
        @delete-recipe="deleteRecipe"
      ></recipe-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allRecipes: [],
      selectedRecipe: null,
      selectedRecipeIndex: -1,
    };
  },
  watch: {
    $route(to, from) {
      console.log(`Route changed: ${from.path} -> ${to.path} `);
      this.setSelectedRecipe();
    },
  },
  methods: {
    async refreshRecipes() {
      try {
        let response = await fetch("http://localhost:8888/recipes");
        if (response.ok) {
          this.allRecipes = await response.json();
        } else {
          throw new Error("HTTP-Error: " + response.status);
        }
      } catch (error) {
        console.error(error);
      }
    },
    setSelectedRecipe() {
      this.selectedRecipe = this.allRecipes.find(
        (x) => x.id == this.$route.params.id
      );
      this.selectedRecipeIndex = this.allRecipes.findIndex(
        (x) => x.id == this.$route.params.id
      );
    },
    deleteRecipe(args) {
      console.log("deleting recipe", args, this.allRecipes.length);
      this.allRecipes = this.allRecipes.filter((x) => x.id !== args.id);
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
