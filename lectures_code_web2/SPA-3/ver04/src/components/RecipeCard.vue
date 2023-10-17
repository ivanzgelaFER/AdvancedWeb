<template>
  <small-card
    :style="{ width: 230 * (zoom ? 3 : 1) + 'px' }"
    class="d-flex flex-column justify-content-between"
  >
    <router-link :to="'/recipes/' + id" class="mr-3">
      <img class="card-img-top w-100" :src="image" />
    </router-link>

    <div class="card-body">
      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ description }}</p>
      <ul class="list-group">
        <li class="list-group-item">
          Cook/prep time: {{ cookTime }}/{{ prepTime }}
        </li>
        <li class="list-group-item">Yield: {{ recipeYield }}</li>
        <li class="list-group-item">Published: {{ datePublished }}</li>
        <li class="list-group-item">
          <a :href="url" target="_blank" class="card-link">
            {{ url.substring(0, 20) }}...
          </a>
        </li>
      </ul>
    </div>
    <details v-if="ingredients">
      <summary><h3>Ingredients</h3></summary>
      <ol class="list-group">
        <li
          v-for="ingredient in ingredients"
          :key="ingredient"
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
      </ol>
    </details>
    <button class="btn btn-danger w-50 align-self-center" @click="deleteRecipe">
      Delete
    </button>
  </small-card>
</template>

<script>
export default {
  emits: ["deleteRecipe"],
  props: [
    "id",
    "image",
    "name",
    "description",
    "cookTime",
    "prepTime",
    "recipeYield",
    "datePublished",
    "url",
    "ingredients",
    "zoom",
  ],
  computed: {
    idUrl() {
      return "/recipes" + this.id;
    },
  },
  methods: {
    deleteRecipe() {
      console.log("emitting delete recipe for ", this.id);
      this.$emit("deleteRecipe", { id: this.id });
    },
  },
};
</script>
<style scoped>
div.card-body .badge {
  white-space: pre-wrap;
}
</style>
