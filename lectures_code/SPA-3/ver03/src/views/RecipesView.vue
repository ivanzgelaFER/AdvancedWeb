<template>
  <div v-if="selectedRecipe" class="d-flex flex-column align-items-center">
    <h2>Recipe #{{ selectedRecipe.id }}</h2>
    <recipe-card
      :key="selectedRecipe.id"
      v-bind="selectedRecipe"
      :zoom="1"
    ></recipe-card>
  </div>
  <div v-else>
    <h2>All recipes ({{ allRecipes.length }})</h2>
    <hr />
    <div class="container-fluid p-2 d-flex flex-wrap">
      <recipe-card
        v-for="recipe in allRecipes"
        :key="recipe.id"
        v-bind="recipe"
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
        let response = await fetch("http://127.0.0.1:8888/recipes");
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
    },
  },
  async mounted() {
    await this.refreshRecipes();
    this.setSelectedRecipe();
  },
};
</script>
