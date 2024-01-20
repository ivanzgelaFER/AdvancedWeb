import { defineStore } from 'pinia'

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    _landingUrl: "/",
    counter: 10
  }),
  getters: {
    count: (state) => state.counter,
    isAuthenticated: (state) => !!state.user,
    username: (state) => state.user,
    landingUrl: (state) => state._landingUrl
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