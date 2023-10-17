import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // ovo bi zapravo bio neki objekt, ali ovdje radi jednostavnosti je user=username
    user: null,
    _landingUrl: "/",
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    username: (state) => state.user,
    landingUrl: (state) => state._landingUrl,
  },
  actions: {
    setUsername(username) {
      this.user = username;
    },
    setLandingUrl(url) {
      this._landingUrl = url;
    },
  },
});
