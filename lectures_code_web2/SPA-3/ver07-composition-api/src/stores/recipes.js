import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useRecipeStore = defineStore("recipes", () => {
  let _allRecipes = ref([]);
  // getters:
  const allRecipes = computed(() => _allRecipes.value);
  const getRecipeById = (id) => {
    return _allRecipes.value.find((rcp) => rcp.id == id);
  };
  // methods:
  const refreshRecipes = async () => {
    // dodati boolean arg da se može forsirati refresh
    if (_allRecipes.value.length === 0) {
      console.log("fetching recipes...");
      try {
        let response = await fetch("http://127.0.0.1:8888/recipes");
        if (response.ok) {
          let recipes = await response.json();
          _allRecipes.value = recipes.slice(0, 50);
        } else {
          throw new Error("HTTP-Error: " + response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };
  const deleteRecipe = (id) => {
    console.log("deleting recipe ", id);
    _allRecipes.value = _allRecipes.value.filter((x) => x.id !== id);
  };
  const updateRecipe = (recipe) => {
    console.log("updating recipe", recipe);
    // pitanje je kako ovo napraviti, ucinkovitije bi bilo in-place ažurirati samo jedan element polja
    _allRecipes.value = _allRecipes.value.map((x) =>
      x.id == recipe.id ? recipe : x
    );
  };

  return {
    allRecipes,
    getRecipeById,
    refreshRecipes,
    deleteRecipe,
    updateRecipe,
  };
});
