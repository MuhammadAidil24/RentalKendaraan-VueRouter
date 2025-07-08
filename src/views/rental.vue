<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Data Penyewaan</div>
      <q-btn
        color="primary"
        label="Tambah Penyewaan"
        icon="add"
        @click="openDialog"
      />
    </div>

    <q-table
      title="Daftar Penyewaan"
      :rows="penyewaan"
      :columns="columns"
      row-key="id"
      flat
      bordered
    />

    <!-- Dialog Tambah Penyewaan -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Tambah Penyewaan</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="form.pelanggan"
            :options="pelangganOptions"
            label="Pelanggan"
          />
          <q-select
            v-model="form.kendaraan"
            :options="kendaraanOptions"
            label="Kendaraan"
            class="q-mt-sm"
          />
          <q-input
            v-model="form.tanggal"
            label="Tanggal Sewa"
            type="date"
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn color="primary" label="Simpan" @click="simpanPenyewaan" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const penyewaan = ref([]);
const pelangganOptions = ref([]);
const kendaraanOptions = ref([]);
const dialog = ref(false);
const form = ref({ pelanggan: "", kendaraan: "", tanggal: "" });

const columns = [
  {
    name: "nama_pelanggan",
    label: "Pelanggan",
    field: (row) => row.nama_pelanggan.label,
    sortable: true,
  },
  {
    name: "nama_kendaraan",
    label: "Kendaraan",
    field: (row) => row.nama_kendaraan.label,
    sortable: true,
  },
  {
    name: "tanggal",
    label: "Tanggal Sewa",
    field: "tanggal",
    sortable: true,
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    sortable: true,
  },
];

const fetchData = async () => {
  const [res1, res2, res3] = await Promise.all([
    fetch("http://localhost:3000/penyewaan"),
    fetch("http://localhost:3000/pelanggan"),
    fetch("http://localhost:3000/kendaraan"),
  ]);
  penyewaan.value = await res1.json();
  const pelanggan = await res2.json();
  const kendaraan = await res3.json();

  pelangganOptions.value = pelanggan.map((p) => ({
    label: p.nama,
    value: p.nama,
  }));
  kendaraanOptions.value = kendaraan
    .filter((k) => k.status === "Tersedia")
    .map((k) => ({ label: k.nama, value: k.nama }));
};

const openDialog = () => {
  form.value = { pelanggan: "", kendaraan: "", tanggal: "" };
  dialog.value = true;
};

const simpanPenyewaan = async () => {
  if (!form.value.pelanggan || !form.value.kendaraan) {
    $q.notify({ type: "negative", message: "Lengkapi semua data" });
    return;
  }

  await fetch("http://localhost:3000/penyewaan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      nama_pelanggan: form.value.pelanggan,
      nama_kendaraan: form.value.kendaraan,
      tanggal: form.value.tanggal,
      status: "Aktif",
    }),
  });

  await fetch(`http://localhost:3000/kendaraan?nama=${form.value.kendaraan}`)
    .then((r) => r.json())
    .then(async (data) => {
      if (data[0]) {
        await fetch(`http://localhost:3000/kendaraan/${data[0].id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data[0], status: "Disewa" }),
        });
      }
    });

  dialog.value = false;
  await fetchData();
  $q.notify({ type: "positive", message: "Data penyewaan berhasil disimpan" });
};

onMounted(fetchData);
</script>
