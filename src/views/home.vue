<script setup>
import { ref } from "vue";

const stats = ref([
  { title: "Total Kendaraan", value: 25 },
  { title: "Sedang Disewa", value: 7 },
  { title: "Pelanggan Terdaftar", value: 13 },
  { title: "Pendapatan Hari Ini", value: "Rp 1.500.000" },
]);
</script>

<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="cards">
      <div class="card" v-for="item in stats" :key="item.title">
        <h2>{{ item.title }}</h2>
        <p>{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* @import "tailwindcss"; */
.dashboard {
  padding: 2rem;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  background-color: #f3f4f6;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  flex: 1 1 200px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.card h2 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
}
</style>
