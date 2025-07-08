<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6">Data Pelanggan</div>
      <q-btn
        color="primary"
        label="Tambah Pelanggan"
        icon="person_add"
        @click="openDialog()"
      />
    </div>

    <!-- ✅ Tabel Data Pelanggan -->
    <q-table
      title="Daftar Pelanggan"
      :rows="pelanggan"
      :columns="columns"
      row-key="id"
      flat
      bordered
    >
      <template v-slot:body-cell-aksi="props">
        <q-td align="center">
          <q-btn size="sm" icon="edit" flat @click="openDialog(props.row)" />
          <q-btn
            size="sm"
            icon="delete"
            flat
            color="negative"
            @click="hapusPelanggan(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>

    <!-- ✅ Dialog Tambah/Edit Pelanggan -->
    <q-dialog v-model="dialog">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">{{ isEdit ? "Edit" : "Tambah" }} Pelanggan</div>
        </q-card-section>

        <q-card-section>
          <q-input v-model="form.nama" label="Nama" filled dense />
          <q-input
            v-model="form.telepon"
            label="Telepon"
            filled
            dense
            class="q-mt-sm"
          />
          <q-input
            v-model="form.alamat"
            label="Alamat"
            filled
            dense
            class="q-mt-sm"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Batal" @click="tutupDialog" />
          <q-btn color="primary" label="Simpan" @click="simpanPelanggan" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

const pelanggan = ref([]);
const dialog = ref(false);
const isEdit = ref(false); // flag edit
const selectedId = ref(null); // id pelanggan saat edit

const form = ref({
  nama: "",
  telepon: "",
  alamat: "",
});

const columns = [
  { name: "nama", label: "Nama", field: "nama", sortable: true },
  { name: "telepon", label: "Telepon", field: "telepon" },
  { name: "alamat", label: "Alamat", field: "alamat" },
  { name: "aksi", label: "Aksi", field: "aksi", sortable: false },
];

const fetchPelanggan = async () => {
  const res = await fetch("http://localhost:3000/pelanggan");
  pelanggan.value = await res.json();
};

const openDialog = (item = null) => {
  if (item) {
    form.value = { ...item };
    selectedId.value = item.id;
    isEdit.value = true;
  } else {
    form.value = { nama: "", telepon: "", alamat: "" };
    selectedId.value = null;
    isEdit.value = false;
  }
  dialog.value = true;
};

const tutupDialog = () => {
  dialog.value = false;
  form.value = { nama: "", telepon: "", alamat: "" };
  isEdit.value = false;
  selectedId.value = null;
};

const simpanPelanggan = async () => {
  if (!form.value.nama || !form.value.telepon) {
    $q.notify({ type: "negative", message: "Nama dan Telepon wajib diisi" });
    return;
  }

  const url = isEdit.value
    ? `http://localhost:3000/pelanggan/${selectedId.value}`
    : `http://localhost:3000/pelanggan`;

  const method = isEdit.value ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });

  await fetchPelanggan();
  $q.notify({
    type: "positive",
    message: `Data berhasil ${isEdit.value ? "diperbarui" : "ditambahkan"}`,
  });
  tutupDialog();
};

const hapusPelanggan = async (id) => {
  $q.dialog({
    title: "Konfirmasi",
    message: "Yakin ingin menghapus pelanggan ini?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    await fetch(`http://localhost:3000/pelanggan/${id}`, { method: "DELETE" });
    await fetchPelanggan();
    $q.notify({ type: "positive", message: "Data berhasil dihapus" });
  });
};

onMounted(fetchPelanggan);
</script>
