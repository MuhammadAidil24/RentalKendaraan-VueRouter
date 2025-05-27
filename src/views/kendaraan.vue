<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Data kendaraan dummy, nanti bisa diganti fetch API
const vehicles = ref([
  {
    id: 1,
    merk: "Toyota",
    tipe: "Avanza",
    plat_nomor: "B 1234 ABC",
    status: "Tersedia",
    harga_sewa: 350000,
  },
  {
    id: 2,
    merk: "Honda",
    tipe: "Jazz",
    plat_nomor: "B 5678 DEF",
    status: "Disewa",
    harga_sewa: 400000,
  },
  {
    id: 3,
    merk: "Suzuki",
    tipe: "Ertiga",
    plat_nomor: "B 9012 GHI",
    status: "Servis",
    harga_sewa: 300000,
  },
]);

function goToAddVehicle() {
  router.push("/vehicles/add");
}
</script>

<template>
  <div>
    <h1>Daftar Kendaraan</h1>
    <button @click="goToAddVehicle" class="btn-add">Tambah Kendaraan</button>

    <table class="vehicles-table">
      <thead>
        <tr>
          <th>Merk</th>
          <th>Tipe</th>
          <th>Plat Nomor</th>
          <th>Status</th>
          <th>Harga Sewa / Hari</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.id">
          <td>{{ vehicle.merk }}</td>
          <td>{{ vehicle.tipe }}</td>
          <td>{{ vehicle.plat_nomor }}</td>
          <td>{{ vehicle.status }}</td>
          <td>Rp {{ vehicle.harga_sewa.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
/* @import "tailwindcss"; */
h1 {
  margin-left: 20px;
  margin-bottom: 1rem;
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

.vehicles-table {
  margin-left: 15px;
  width: 100%;
  border-collapse: collapse;
}

.vehicles-table th,
.vehicles-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.vehicles-table th {
  background-color: #f3f4f6;
}
</style>
