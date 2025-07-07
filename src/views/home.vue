<template>
  <q-page padding>
    <!-- 🔹 NOTIFIKASI -->
    <q-banner v-if="pengingat" type="warning" class="q-mb-md">
      {{ pengingat }}
    </q-banner>

    <!-- 🔹 STATISTIK -->
    <div class="row q-col-gutter-md q-mb-md">
      <q-card
        class="col-12 col-sm-6 col-md-3"
        v-for="item in stats"
        :key="item.label"
      >
        <q-card-section class="text-center">
          <q-icon :name="item.icon" size="40px" color="primary" />
          <div class="text-h6 q-mt-sm">{{ item.label }}</div>
          <div class="text-subtitle1 text-bold">{{ item.value }}</div>
        </q-card-section>
      </q-card>
    </div>

    <!-- 🔹 TOMBOL AKSI -->
    <div class="q-mb-md">
      <q-btn
        color="primary"
        icon="add"
        label="Tambah Penyewaan"
        class="q-mr-sm"
      />
      <q-btn
        color="secondary"
        icon="person_add"
        label="Tambah Pelanggan"
        class="q-mr-sm"
      />
      <q-btn color="teal" icon="description" label="Lihat Laporan" />
    </div>

    <!-- 🔹 TABEL PENYEWAAN -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Penyewaan Terbaru</div>
      </q-card-section>
      <q-separator />
      <q-table
        :rows="recentPenyewaan"
        :columns="columns"
        row-key="id"
        flat
        dense
        hide-bottom
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

const stats = ref([
  { label: "Total Kendaraan", value: 0, icon: "directions_car" },
  { label: "Sedang Disewa", value: 0, icon: "assignment_returned" },
  { label: "Pelanggan Terdaftar", value: 0, icon: "group" },
  { label: "Pendapatan Hari Ini", value: "Rp 0", icon: "attach_money" },
]);

const recentPenyewaan = ref([]);
const pengingat = ref("");

const columns = [
  { name: "namaPelanggan", label: "Nama Pelanggan", field: "namaPelanggan" },
  { name: "namaKendaraan", label: "Nama Kendaraan", field: "namaKendaraan" },
  { name: "tanggal", label: "Tanggal Sewa", field: "tanggal" },
  { name: "status", label: "Status", field: "status" },
];

// Ambil data dari json-server
onMounted(async () => {
  const [kendaraan, penyewaan, pelanggan] = await Promise.all([
    fetch("http://localhost:3000/kendaraan").then((r) => r.json()),
    fetch("http://localhost:3000/penyewaan?_sort=id&_order=desc&_limit=5").then(
      (r) => r.json()
    ),
    fetch("http://localhost:3000/pelanggan").then((r) => r.json()),
  ]);

  // Update statistik
  stats.value[0].value = kendaraan.length;
  stats.value[1].value = kendaraan.filter((k) => k.status === "Disewa").length;
  stats.value[2].value = pelanggan.length;
  stats.value[3].value = "Rp 1.500.000"; // dummy

  // Update tabel penyewaan
  recentPenyewaan.value = penyewaan.map((p) => ({
    id: p.id,
    namaPelanggan: p.nama_pelanggan,
    namaKendaraan: p.nama_kendaraan,
    tanggal: p.tanggal,
    status: p.status,
  }));

  // Pengingat (contoh logika: jika ada kendaraan disewa)
  const countDipinjam = kendaraan.filter((k) => k.status === "Disewa").length;
  if (countDipinjam > 0) {
    pengingat.value = `Ada ${countDipinjam} kendaraan belum dikembalikan`;
  }
});
</script>

<style scoped>
.q-card {
  min-height: 120px;
}
</style>
