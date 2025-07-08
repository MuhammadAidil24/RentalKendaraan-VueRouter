<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <h4>Daftar Kendaraan</h4>

      <!-- Form Tambah/Update -->
      <q-form @submit.prevent="isEditing ? updateKendaraan() : addKendaraan()">
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-input filled v-model="form.nama" label="Nama Kendaraan" />
          </div>
          <div class="col-12 col-md-4">
            <q-input filled v-model="form.jenis" label="Jenis (Mobil/Motor)" />
          </div>
          <div class="col-12 col-md-4">
            <q-select
              filled
              v-model="form.status"
              :options="['Tersedia', 'Disewa']"
              label="Status"
            />
          </div>

          <!-- Upload Gambar -->
          <div class="col-12 col-md-6">
            <input type="file" accept="image/*" @change="handleFileUpload" />
            <q-img
              v-if="form.gambar"
              :src="form.gambar"
              style="max-width: 200px; margin-top: 10px"
            />
          </div>

          <div class="col-12">
            <q-btn
              :label="isEditing ? 'Update' : 'Tambah'"
              color="primary"
              type="submit"
            />
            <q-btn label="Reset" color="grey" flat @click="resetForm" />
          </div>
        </div>
      </q-form>

      <q-separator spaced />

      <!-- List Kendaraan -->
      <div class="row q-col-gutter-md">
        <div
          class="col-xs-12 col-sm-6 col-md-4"
          v-for="item in kendaraan"
          :key="item.id"
        >
          <q-card>
            <q-img
              v-if="item.gambar"
              :src="item.gambar"
              style="height: 150px; object-fit: cover"
            />
            <q-card-section>
              <div class="text-h6">{{ item.nama }}</div>
              <div>Jenis: {{ item.jenis }}</div>
              <div>Status: {{ item.status }}</div>
            </q-card-section>
            <q-card-actions>
              <q-btn
                flat
                label="Edit"
                color="primary"
                @click="editKendaraan(item)"
              />
              <q-btn
                flat
                label="Hapus"
                color="negative"
                @click="deleteKendaraan(item.id)"
              />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Cloudinary config
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/diue0tqkv/image/upload";
const CLOUDINARY_PRESET = "kendaraan_preset";

// State
const kendaraan = ref([]);
const form = ref({
  nama: "",
  jenis: "",
  status: "Tersedia",
  gambar: "",
});
const isEditing = ref(false);
const editId = ref(null);

// Ambil data dari JSON Server
const fetchKendaraan = async () => {
  const res = await fetch("http://localhost:3000/kendaraan");
  kendaraan.value = await res.json();
};

// Upload file ke Cloudinary
const handleFileUpload = async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    console.warn("Tidak ada file dipilih.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);

  try {
    const res = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      form.value.gambar = data.secure_url;
      console.log("Gambar tersimpan di:", form.value.gambar);
    } else {
      console.warn("Gagal upload gambar ke Cloudinary:", data);
    }
  } catch (err) {
    console.error("Upload error:", err);
  }
};

// Tambah data kendaraan
const addKendaraan = async () => {
  await fetch("http://localhost:3000/kendaraan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });
  resetForm();
  fetchKendaraan();
};

// Edit data
const editKendaraan = (item) => {
  form.value = { ...item };
  isEditing.value = true;
  editId.value = item.id;
};

// Update data
const updateKendaraan = async () => {
  await fetch(`http://localhost:3000/kendaraan/${editId.value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });
  resetForm();
  fetchKendaraan();
};

// Hapus data
const deleteKendaraan = async (id) => {
  await fetch(`http://localhost:3000/kendaraan/${id}`, {
    method: "DELETE",
  });
  fetchKendaraan();
};

// Reset form
const resetForm = () => {
  form.value = {
    nama: "",
    jenis: "",
    status: "Tersedia",
    gambar: "",
  };
  isEditing.value = false;
  editId.value = null;
};

onMounted(fetchKendaraan);
</script>

<style scoped>
.text-h6 {
  font-weight: bold;
}

.q-card {
  margin-left: 20px;
}
</style>
