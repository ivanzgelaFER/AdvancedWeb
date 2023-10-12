<template>
  <div>
    <h1>Count: {{ count }}</h1>
    <h1>Double count: {{ doubleCount }}</h1>
    <p>
      <button @click="increment">+</button>
      <button @click="decrement">-</button>
    </p>
  </div>
</template>

<script>
import { useCounterStore } from "./stores/counter";
import { mapState, mapActions } from "pinia";
export default {
  // data() {
  //   return {
  //     store: useCounterStore(),
  //   };
  // },
  computed: {
    ...mapState(useCounterStore, ["count", "doubleCount"]),    
  },
  methods: {
    ...mapActions(useCounterStore, ["increment", "decrement"]),
    // decrement() {
    //   this.store.decrement();
    // },
  },
};
</script>
