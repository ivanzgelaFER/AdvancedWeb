import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  let user = ref(null);
  let _landingUrl = ref("/");
  // getters:
  const isAuthenticated = computed(() => !!user.value);
  const username = computed(() => user.value);
  const landingUrl = computed(() => _landingUrl.value);
  // methods:
  const setUsername = (username) => {
    user.value = username;
  };
  const setLandingUrl = (url) => {
    _landingUrl.value = url;
  };
  return {
    isAuthenticated,
    username,
    landingUrl,
    setUsername,
    setLandingUrl,
  };
});
