<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Data pelanggan dummy
const customers = ref([
  {
    id: 1,
    nama: "Andi Saputra",
    nomor_ktp: "3174091234560001",
    telepon: "081234567890",
  },
  {
    id: 2,
    nama: "Budi Santoso",
    nomor_ktp: "3174091234560002",
    telepon: "085678901234",
  },
  {
    id: 3,
    nama: "Citra Dewi",
    nomor_ktp: "3174091234560003",
    telepon: "087812341234",
  },
]);

function goToAddCustomer() {
  router.push("/customers/add");
}
</script>

<template>
  <div>
    <h1>Data Pelanggan</h1>
    <button @click="goToAddCustomer" class="btn-add">Tambah Pelanggan</button>

    <table class="customers-table">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Nomor KTP</th>
          <th>Telepon</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.nama }}</td>
          <td>{{ customer.nomor_ktp }}</td>
          <td>{{ customer.telepon }}</td>
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
  margin-left: 20px;
  margin-bottom: 1rem;
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

.customers-table {
  margin-left: 15px;
  width: 100%;
  border-collapse: collapse;
}

.customers-table th,
.customers-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.customers-table th {
  background-color: #f3f4f6;
}
</style>
