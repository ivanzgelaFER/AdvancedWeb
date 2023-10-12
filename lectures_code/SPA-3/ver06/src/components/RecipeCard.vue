<template>
  <small-card
    v-if="!editMode"
    :style="{ width: 230 * (zoom ? 3 : 1) + 'px' }"
    class="d-flex flex-column justify-content-between"
  >
    <router-link :to="'/recipes/' + recipe.id" class="mr-3">
      <img class="card-img-top w-100" :src="recipe.image" />
    </router-link>
    <div class="card-body">
      <h5 class="card-title">{{ recipe.name }}</h5>
      <p class="card-text">{{ recipe.description }}</p>
      <ul class="list-group">
        <li class="list-group-item">
          Cook/prep time: {{ recipe.cookTime }}/{{ recipe.prepTime }}
        </li>
        <li class="list-group-item">Yield: {{ recipe.recipeYield }}</li>
        <li class="list-group-item">Published: {{ recipe.datePublished }}</li>
        <li class="list-group-item">
          <a :href="recipe.url" target="_blank" class="card-link">
            {{ recipe.url.substring(0, 20) }}...
          </a>
        </li>
      </ul>
    </div>
    <details v-if="recipe.ingredients">
      <summary><h3>Ingredients</h3></summary>
      <ol class="list-group">
        <li
          v-for="ingredient in recipe.ingredients"
          :key="ingredient"
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
      </ol>
    </details>
    <button
      v-if="canEdit"
      class="btn btn-primary w-50 align-self-center mb-2"
      @click="editMode = true"
    >
      Edit
    </button>
    <button
      class="btn btn-danger w-50 align-self-center"
      @click="deleteRecipeLocal"
    >
      Delete
    </button>
  </small-card>
  <small-card v-if="editMode" class="editForm w-50">
    <form @submit.prevent="submitChanges">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="name"
          v-model="recipe.name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model="recipe.description"
        ></textarea>
      </div>
      <button class="btn btn-success" type="submit">Save</button>
      <button class="btn btn-warning" @click.stop="exitSingleRecipe()">
        Cancel
      </button>
    </form>
  </small-card>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useRecipeStore } from "../stores/recipes";
export default {
  emits: ["recipeDeleted", "recipeUpdated"],
  props: ["id", "canEdit", "zoom"],
  data() {
    return {
      editMode: false,
      recipe: { url: "" },
    };
  },
  computed: {
    ...mapState(useRecipeStore, ["getRecipeById"]),
    idUrl() {
      return "/recipes" + this.id;
    },
  },
  methods: {
    ...mapActions(useRecipeStore, ["deleteRecipe", "updateRecipe"]),
    deleteRecipeLocal() {
      this.deleteRecipe(this.id);
      this.$emit("recipeDeleted", { id: this.id });
      this.exitSingleRecipe();
    },
    exitSingleRecipe() {
      this.$router.push({ path: "/recipes" });
    },
    submitChanges() {
      this.updateRecipe(this.recipe);
      this.$emit("recipeUpdated", this.recipe);
      this.exitSingleRecipe();
    },
  },
  async created() {
    this.recipe = { ...this.getRecipeById(this.id) };
  },
};
</script>
<style scoped>
div.card-body .badge {
  white-space: pre-wrap;
}
</style>
