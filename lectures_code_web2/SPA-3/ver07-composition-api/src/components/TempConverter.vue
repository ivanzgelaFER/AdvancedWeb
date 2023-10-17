<template>
  <small-card>
    <h3>Temperature converter</h3>
    <form>
      <div class="form-group row">
        <label for="celsius" class="col-sm-4 col-form-label">Celsius</label>
        <div class="col-4">
          <input
            type="number"
            class="form-control"
            placeholder="C"
            v-model.number="tempCelsius"
            @keyup="c2f"
          />
        </div>
      </div>
      <div class="form-group row">
        <label for="fahrenheit" class="col-4 col-form-label">Fahrenheit</label>
        <div class="col-4">
          <input
            type="number"
            class="form-control"
            placeholder="F"
            v-model.number="tempFahrenheit"
            @keyup="f2c"
          />
        </div>
      </div>
    </form>
  </small-card>
</template>

<script setup>
import { ref } from "vue";
const tempCelsius = ref(0);
const tempFahrenheit = ref(32);
const c2f = () => {
  tempFahrenheit.value = Math.round((tempCelsius.value * 9) / 5 + 32);
};
const f2c = () => {
  tempCelsius.value = Math.round(((tempFahrenheit.value - 32) * 5) / 9);
};
</script>
