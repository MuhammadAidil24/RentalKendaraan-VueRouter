import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoggedIn: false,
  }),
  actions: {
    async login(username, password) {
      try {
        const res = await fetch(
          `http://localhost:3000/users?username=${username}&password=${password}`
        );
        const data = await res.json();

        if (data.length > 0) {
          this.user = data[0];
          this.isLoggedIn = true;
          return true;
        } else {
          return false;
        }
      } catch (err) {
        console.error("Login error:", err);
        return false;
      }
    },
    logout() {
      this.user = null;
      this.isLoggedIn = false;
    },
  },
  persist: true,
});
