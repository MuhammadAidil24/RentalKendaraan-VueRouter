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
          `https://701168b2-1ff2-42a6-a846-877d8350bcd8-00-212yd22juhy5j.sisko.replit.dev/users?username=${username}&password=${password}`
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
