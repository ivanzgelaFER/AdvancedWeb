<template>
  <small-card
    v-if="!editMode"
    :style="{ width: 230 * (zoom ? 3 : 1) + 'px' }"
    class="d-flex flex-column justify-content-between"
  >
    <router-link :to="'/recipes/' + modelValue.id" class="mr-3">
      <img class="card-img-top w-100" :src="modelValue.image" />
    </router-link>

    <div class="card-body">
      <h5 class="card-title">{{ modelValue.name }}</h5>
      <p class="card-text">{{ modelValue.description }}</p>
      <ul class="list-group">
        <li class="list-group-item">
          Cook/prep time: {{ modelValue.cookTime }}/{{ modelValue.prepTime }}
        </li>
        <li class="list-group-item">Yield: {{ modelValue.recipeYield }}</li>
        <li class="list-group-item">
          Published: {{ modelValue.datePublished }}
        </li>
        <li class="list-group-item">
          <a :href="modelValue.url" target="_blank" class="card-link">
            {{ modelValue.url.substring(0, 20) }}...
          </a>
        </li>
      </ul>
    </div>
    <details v-if="modelValue.ingredients">
      <summary><h3>Ingredients</h3></summary>
      <ol class="list-group">
        <li
          v-for="ingredient in modelValue.ingredients"
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
    <button class="btn btn-danger w-50 align-self-center" @click="deleteRecipe">
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
          v-model="name"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          id="description"
          rows="3"
          v-model="description"
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
export default {
  emits: ["deleteRecipe", "update:modelValue"],
  props: ["modelValue", "canEdit", "zoom"],
  data() {
    return {
      editMode: false,
      name: this.modelValue.name,
      description: this.modelValue.description,
    };
  },
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
    exitSingleRecipe() {
      this.$router.push({ path: "/recipes" });
    },
    submitChanges() {
      let newValue = {
        ...JSON.parse(JSON.stringify(this.modelValue)), // trik: https://stackoverflow.com/questions/51096547/how-to-get-the-target-of-a-javascript-proxy
        name: this.name,
        description: this.description,
      };
      // ili:
      // let newValue = this.$emit("update:modelValue", {
      //   id: this.modelValue.id,
      //   image: this.modelValue.image,
      //   name: this.name,
      //   description: this.description,
      //   cookTime: this.modelValue.cookTime,
      //   prepTime: this.modelValue.prepTime,
      //   recipeYield: this.modelValue.recipeYield,
      //   datePublished: this.modelValue.datePublished,
      //   url: this.modelValue.url,
      //   ingredients: this.modelValue.ingredients,
      // });
      this.$emit("update:modelValue", newValue);
      this.exitSingleRecipe();
    },
  },
};
</script>
<style scoped>
div.card-body .badge {
  white-space: pre-wrap;
}
</style>
