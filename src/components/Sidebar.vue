<script setup>
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <aside class="sidebar">
    <h2 class="logo">Rental Kendaraan</h2>
    <nav>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/kendaraan">Kendaraan</router-link></li>
        <li><router-link to="/rental">Penyewaan</router-link></li>
        <li><router-link to="/pengembalian">Pengembalian</router-link></li>
        <li><router-link to="/pelanggan">Pelanggan</router-link></li>
        <li><router-link to="/laporan">Laporan</router-link></li>
      </ul>
      <button @click="logout" class="logout-button">Logout</button>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 220px;
  background-color: #395dc2;
  color: white;
  height: 100vh;
  padding: 1rem;
  position: fixed;
}

.logo {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

nav ul {
  list-style: none;
  padding: 0;
  text-decoration: none;
}

nav li {
  margin-bottom: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
}

nav a:active {
  text-decoration: none;
}

.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}

.logout-button {
  background-color: #ffffff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 100%;
  margin-top: 2rem;
}
</style>
