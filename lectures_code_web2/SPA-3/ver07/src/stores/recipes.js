import { defineStore } from "pinia";

export const useRecipeStore = defineStore("recipes", {
  state: () => ({
    _allRecipes: [],
  }),
  getters: {
    allRecipes: (state) => state._allRecipes || [],
    // Getters are just computed properties behind the scenes, so it 's not possible to pass any parameters to them. 
    // However, you can return a function from the getter to accept any arguments:
    getRecipeById: (state) => {
      return (id) => state._allRecipes.find((rcp) => rcp.id === id);
    },
  },
  actions: {
    async refreshRecipes() {
      // dodati boolean arg da se može forsirati refresh
      if (this.allRecipes.length === 0) {
        console.log("fetching recipes...");
        try {
          let response = await fetch("http://127.0.0.1:8888/recipes");
          if (response.ok) {
            let recipes = await response.json();
            this._allRecipes = recipes.slice(0, 50);
          } else {
            throw new Error("HTTP-Error: " + response.status);
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
    deleteRecipe(id) {
      console.log("deleting recipe ", id);
      this._allRecipes = this._allRecipes.filter((x) => x.id !== id);
    },
    updateRecipe(recipe) {
      console.log("updating recipe", recipe);
      // pitanje je kako ovo napraviti, ucinkovitije bi bilo in-place ažurirati samo jedan element polja
      this._allRecipes = this._allRecipes.map((x) =>
        x.id == recipe.id ? recipe : x
      );
    },
  },
});
