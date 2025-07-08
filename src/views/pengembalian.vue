<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Daftar Pengembalian</div>

    <q-table
      :rows="pengembalian"
      :columns="columns"
      row-key="id"
      flat
      bordered
    />

    <!-- Dialog Pengembalian -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Proses Pengembalian</div>
        </q-card-section>

        <q-card-section>
          <q-select
            v-model="form.penyewaan"
            :options="penyewaanOptions"
            label="Pilih Penyewaan"
            option-label="label"
            option-value="value"
            emit-value
            map-options
          />
          <q-input
            v-model="form.tanggal_kembali"
            label="Tanggal Dikembalikan"
            type="date"
            class="q-mt-sm"
          />
          <q-input
            v-model="form.denda"
            label="Denda (Rp)"
            type="number"
            class="q-mt-sm"
          />
          <q-input
            v-model="form.kondisi"
            label="Kondisi Kendaraan"
            type="text"
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn color="primary" label="Simpan" @click="simpanPengembalian" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn
      color="primary"
      icon="assignment_return"
      label="Proses Pengembalian"
      class="q-mt-md"
      @click="openDialog"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const pengembalian = ref([]);
const penyewaanOptions = ref([]);
const penyewaanMap = ref({});
const dialog = ref(false);
const form = ref({
  penyewaan: null,
  tanggal_kembali: "",
  denda: 0,
  kondisi: "",
});

const columns = [
  { name: "pelanggan", label: "Pelanggan", field: "pelanggan" },
  { name: "kendaraan", label: "Kendaraan", field: "kendaraan" },
  { name: "tanggal", label: "Tanggal Sewa", field: "tanggal" },
  {
    name: "tanggal_kembali",
    label: "Tanggal Dikembalikan",
    field: "tanggal_kembali",
  },
  { name: "denda", label: "Denda", field: "denda" },
  { name: "kondisi", label: "Kondisi Kendaraan", field: "kondisi" },
];

const fetchData = async () => {
  const [pengRes, sewaRes] = await Promise.all([
    fetch("http://localhost:3000/pengembalian"),
    fetch("http://localhost:3000/penyewaan"),
  ]);
  const pengData = await pengRes.json();
  const sewaData = await sewaRes.json();

  penyewaanMap.value = {};
  sewaData.forEach((p) => (penyewaanMap.value[p.id] = p));

  pengembalian.value = pengData.map((p) => {
    const penyewaan = penyewaanMap.value[p.penyewaan_id] || {};
    return {
      ...p,
      pelanggan: penyewaan.nama_pelanggan?.label || "-",
      kendaraan: penyewaan.nama_kendaraan?.label || "-",
      tanggal: penyewaan.tanggal || "-",
    };
  });

  penyewaanOptions.value = sewaData
    .filter((p) => p.status === "Aktif")
    .map((p) => ({
      label: `${p.nama_pelanggan.label} - ${p.nama_kendaraan.label} (${p.tanggal})`,
      value: p.id,
    }));
};

const openDialog = () => {
  form.value = { penyewaan: null, tanggal_kembali: "", denda: 0, kondisi: "" };
  dialog.value = true;
};

const simpanPengembalian = async () => {
  const id = form.value.penyewaan;
  const data = penyewaanMap.value[id];
  if (!data || !form.value.tanggal_kembali) {
    $q.notify({ type: "negative", message: "Lengkapi semua data!" });
    return;
  }

  await fetch("http://localhost:3000/pengembalian", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      penyewaan_id: data.id, // ⬅️ WAJIB DITAMBAHKAN
      tanggal_kembali: form.value.tanggal_kembali,
      denda: `Rp ${parseInt(form.value.denda).toLocaleString("id-ID")}`,
      kondisi: form.value.kondisi,
    }),
  });

  await fetch(`http://localhost:3000/penyewaan/${data.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, status: "Kembali" }),
  });

  const kendaraanRes = await fetch(
    `http://localhost:3000/kendaraan?nama=${data.nama_kendaraan.value}`
  );
  const kendaraanData = await kendaraanRes.json();
  if (kendaraanData[0]) {
    await fetch(`http://localhost:3000/kendaraan/${kendaraanData[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...kendaraanData[0], status: "Tersedia" }),
    });
  }

  dialog.value = false;
  await fetchData();
  $q.notify({ type: "positive", message: "Pengembalian berhasil disimpan" });
};

onMounted(fetchData);
</script>
