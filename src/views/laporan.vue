<script setup>
import { ref, computed } from "vue";

// Data dummy laporan
const laporanSemua = ref([
  {
    id: 1,
    tanggal: "2025-05-01",
    customer: "Andi",
    vehicle: "Avanza",
    lama_sewa: 2,
    total: 700000,
  },
  {
    id: 2,
    tanggal: "2025-05-03",
    customer: "Budi",
    vehicle: "Jazz",
    lama_sewa: 3,
    total: 1200000,
  },
  {
    id: 3,
    tanggal: "2025-05-05",
    customer: "Citra",
    vehicle: "Ertiga",
    lama_sewa: 1,
    total: 300000,
  },
]);

const tanggalMulai = ref("");
const tanggalAkhir = ref("");

const laporanTampil = ref([...laporanSemua.value]);

const totalPendapatan = computed(() =>
  laporanTampil.value.reduce((acc, item) => acc + item.total, 0)
);

function filterLaporan() {
  if (tanggalMulai.value && tanggalAkhir.value) {
    laporanTampil.value = laporanSemua.value.filter(
      (item) =>
        item.tanggal >= tanggalMulai.value && item.tanggal <= tanggalAkhir.value
    );
  } else {
    laporanTampil.value = [...laporanSemua.value];
  }
}
</script>

<template>
  <div>
    <h1>Laporan Transaksi</h1>

    <div class="filters">
      <label>
        Dari Tanggal:
        <input type="date" v-model="tanggalMulai" />
      </label>
      <label>
        Sampai Tanggal:
        <input type="date" v-model="tanggalAkhir" />
      </label>
      <button @click="filterLaporan">Tampilkan</button>
    </div>

    <h2>Total Pendapatan: Rp {{ totalPendapatan.toLocaleString() }}</h2>

    <table class="reports-table">
      <thead>
        <tr>
          <th>Tanggal</th>
          <th>Pelanggan</th>
          <th>Kendaraan</th>
          <th>Lama Sewa (hari)</th>
          <th>Total Biaya</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="laporan in laporanTampil" :key="laporan.id">
          <td>{{ laporan.tanggal }}</td>
          <td>{{ laporan.customer }}</td>
          <td>{{ laporan.vehicle }}</td>
          <td>{{ laporan.lama_sewa }}</td>
          <td>Rp {{ laporan.total.toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
h1,
h2 {
  margin-bottom: 1rem;
  margin-left: 20px;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  margin-left: 20px;
  flex-wrap: wrap;
}

.filters label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

button {
  padding: 0.5rem 1rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  height: fit-content;
  cursor: pointer;
  margin-left: 15px;
}

button:hover {
  background-color: #1d4ed8;
}

.reports-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  margin-left: 15px;
}

.reports-table th,
.reports-table td {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.reports-table th {
  background-color: #f3f4f6;
}
</style>
