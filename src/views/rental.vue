<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Data penyewaan dummy, bisa diganti fetch API
const rentals = ref([
  {
    id: 1,
    customer: "Andi",
    vehicle: "Toyota Avanza",
    tanggal_sewa: "2025-05-01",
    tanggal_kembali: "2025-05-03",
    total_biaya: 700000,
    status: "Selesai",
  },
  {
    id: 2,
    customer: "Budi",
    vehicle: "Honda Jazz",
    tanggal_sewa: "2025-05-05",
    tanggal_kembali: "2025-05-07",
    total_biaya: 800000,
    status: "Sedang Disewa",
  },
]);

function goToAddRental() {
  router.push("/rentals/add");
}
</script>

<template>
  <div>
    <h1>Daftar Penyewaan</h1>
    <button @click="goToAddRental" class="btn-add">Tambah Penyewaan</button>

    <table class="rentals-table">
      <thead>
        <tr>
          <th>Pelanggan</th>
          <th>Kendaraan</th>
          <th>Tanggal Sewa</th>
          <th>Tanggal Kembali</th>
          <th>Total Biaya</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rental in rentals" :key="rental.id">
          <td>{{ rental.customer }}</td>
          <td>{{ rental.vehicle }}</td>
          <td>{{ rental.tanggal_sewa }}</td>
          <td>{{ rental.tanggal_kembali }}</td>
          <td>Rp {{ rental.total_biaya.toLocaleString() }}</td>
          <td>{{ rental.status }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
  margin-left: 20px;
}

.btn-add {
  margin-bottom: 1rem;
  margin-left: 20px;
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #1d4ed8;
}

.rentals-table {
  margin-left: 15px;
  width: 100%;
  border-collapse: collapse;
}

.rentals-table th,
.rentals-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.rentals-table th {
  background-color: #f3f4f6;
}
</style>
