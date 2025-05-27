<script setup>
import { ref } from "vue";

const returns = ref([
  {
    id: 1,
    customer: "Andi",
    vehicle: "Toyota Avanza",
    tanggal_sewa: "2025-05-01",
    tanggal_dikembalikan: "2025-05-03",
    denda: 0,
    kondisi_kendaraan: "Baik",
  },
  {
    id: 2,
    customer: "Budi",
    vehicle: "Honda Jazz",
    tanggal_sewa: "2025-05-05",
    tanggal_dikembalikan: "2025-05-08",
    denda: 150000,
    kondisi_kendaraan: "Lecet ringan",
  },
]);
</script>

<template>
  <div>
    <h1>Daftar Pengembalian</h1>
    <table class="returns-table">
      <thead>
        <tr>
          <th>Pelanggan</th>
          <th>Kendaraan</th>
          <th>Tanggal Sewa</th>
          <th>Tanggal Dikembalikan</th>
          <th>Denda</th>
          <th>Kondisi Kendaraan</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ret in returns" :key="ret.id">
          <td>{{ ret.customer }}</td>
          <td>{{ ret.vehicle }}</td>
          <td>{{ ret.tanggal_sewa }}</td>
          <td>{{ ret.tanggal_dikembalikan }}</td>
          <td>Rp {{ ret.denda.toLocaleString() }}</td>
          <td>{{ ret.kondisi_kendaraan }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  margin-left: 20px;
  margin-bottom: 1rem;
}

.returns-table {
  margin-left: 15px;
  width: 100%;
  border-collapse: collapse;
}

.returns-table th,
.returns-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.returns-table th {
  background-color: #f3f4f6;
}
</style>
