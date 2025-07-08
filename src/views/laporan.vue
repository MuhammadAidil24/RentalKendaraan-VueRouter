<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Laporan Penyewaan & Pengembalian</div>

    <!-- Filter -->
    <div class="row q-col-gutter-md q-mb-md">
      <q-input
        v-model="filter.nama"
        label="Nama Pelanggan"
        filled
        class="col-12 col-md-3"
      />
      <q-select
        v-model="filter.status"
        :options="['Semua', 'Aktif', 'Kembali']"
        label="Status"
        filled
        class="col-12 col-md-3"
      />
      <q-input
        v-model="filter.tanggalMulai"
        label="Tanggal Mulai"
        type="date"
        filled
        class="col-6 col-md-3"
      />
      <q-input
        v-model="filter.tanggalAkhir"
        label="Tanggal Akhir"
        type="date"
        filled
        class="col-6 col-md-3"
      />
    </div>

    <!-- Tabel Laporan -->
    <q-table
      :rows="filteredData"
      :columns="columns"
      row-key="id"
      flat
      bordered
    />

    <!-- Rekap -->
    <div class="q-mt-md text-subtitle1">
      Total Penyewaan: {{ filteredData.length }}<br />
      Total Denda: Rp {{ totalDenda.toLocaleString("id-ID") }}
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const penyewaan = ref([]);
const pengembalian = ref([]);
const laporan = ref([]);

const filter = ref({
  nama: "",
  status: "Semua",
  tanggalMulai: "",
  tanggalAkhir: "",
});

const columns = [
  { name: "pelanggan", label: "Pelanggan", field: "pelanggan" },
  { name: "kendaraan", label: "Kendaraan", field: "kendaraan" },
  { name: "tanggal", label: "Tanggal Sewa", field: "tanggal" },
  {
    name: "tanggal_kembali",
    label: "Tanggal Kembali",
    field: "tanggal_kembali",
  },
  { name: "status", label: "Status", field: "status" },
  { name: "denda", label: "Denda", field: "denda" },
];

const fetchData = async () => {
  const [resPenyewaan, resPengembalian] = await Promise.all([
    fetch(
      "https://701168b2-1ff2-42a6-a846-877d8350bcd8-00-212yd22juhy5j.sisko.replit.dev/penyewaan"
    ),
    fetch(
      "https://701168b2-1ff2-42a6-a846-877d8350bcd8-00-212yd22juhy5j.sisko.replit.dev/pengembalian"
    ),
  ]);

  penyewaan.value = await resPenyewaan.json();
  pengembalian.value = await resPengembalian.json();

  // Gabungkan data
  laporan.value = penyewaan.value.map((sewa) => {
    const kembali = pengembalian.value.find((p) => p.penyewaan_id === sewa.id);
    return {
      id: sewa.id,
      pelanggan: sewa.nama_pelanggan?.label || "-",
      kendaraan: sewa.nama_kendaraan?.label || "-",
      tanggal: sewa.tanggal,
      tanggal_kembali: kembali?.tanggal_kembali || "-",
      status: sewa.status,
      denda: kembali?.denda || "Rp 0",
    };
  });
};

onMounted(fetchData);

const filteredData = computed(() => {
  return laporan.value.filter((item) => {
    const matchNama = item.pelanggan
      .toLowerCase()
      .includes(filter.value.nama.toLowerCase());
    const matchStatus =
      filter.value.status === "Semua" || item.status === filter.value.status;
    const matchTanggalMulai = filter.value.tanggalMulai
      ? item.tanggal >= filter.value.tanggalMulai
      : true;
    const matchTanggalAkhir = filter.value.tanggalAkhir
      ? item.tanggal <= filter.value.tanggalAkhir
      : true;
    return matchNama && matchStatus && matchTanggalMulai && matchTanggalAkhir;
  });
});

const totalDenda = computed(() => {
  return filteredData.value.reduce((sum, item) => {
    const angka = parseInt(item.denda.replace(/\D/g, "")) || 0;
    return sum + angka;
  }, 0);
});
</script>

<style scoped>
.q-table {
  font-size: 14px;
}
</style>
