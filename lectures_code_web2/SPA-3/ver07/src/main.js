import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import RecipeCard from "./components/RecipeCard.vue";
import TempConverter from "./components/TempConverter.vue";
import SmallCard from "./components/SmallCard.vue";
import "./assets/main.css";
import { defineAsyncComponent } from "vue";

const DiscoComponent = defineAsyncComponent(() =>
  import("./components/DiscoComponent.vue")
);

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component("recipe-card", RecipeCard);
app.component("temp-converter", TempConverter);
app.component("small-card", SmallCard);
app.component("disco-component", DiscoComponent);
app.mount("#app");
