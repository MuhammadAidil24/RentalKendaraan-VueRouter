<template>
  <div class="container">
    <h2>Daftar Kendaraan</h2>

    <!-- Grid Card -->
    <div class="grid">
      <div class="card" v-for="item in kendaraan" :key="item.id">
        <h3>{{ item.nama }}</h3>
        <p>Jenis: {{ item.jenis }}</p>
        <p>Status: {{ item.status }}</p>
        <div class="actions">
          <button @click="editKendaraan(item)">Edit</button>
          <button @click="deleteKendaraan(item.id)">Hapus</button>
        </div>
      </div>
    </div>

    <!-- Form -->
    <form
      @submit.prevent="isEditing ? updateKendaraan() : addKendaraan()"
      class="form"
    >
      <input v-model="form.nama" placeholder="Nama Kendaraan" required />
      <input v-model="form.jenis" placeholder="Jenis (Mobil/Motor)" required />
      <select v-model="form.status">
        <option>Tersedia</option>
        <option>Disewa</option>
      </select>
      <button type="submit">{{ isEditing ? "Update" : "Tambah" }}</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const kendaraan = ref([]);
const form = ref({ nama: "", jenis: "", status: "Tersedia" });
const isEditing = ref(false);
const editId = ref(null);

const fetchKendaraan = async () => {
  const res = await fetch("http://localhost:3000/kendaraan");
  kendaraan.value = await res.json();
};

onMounted(fetchKendaraan);

const addKendaraan = async () => {
  await fetch("http://localhost:3000/kendaraan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });
  resetForm();
  fetchKendaraan();
};

const editKendaraan = (item) => {
  form.value = { ...item };
  isEditing.value = true;
  editId.value = item.id;
};

const updateKendaraan = async () => {
  await fetch(`http://localhost:3000/kendaraan/${editId.value}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form.value),
  });
  resetForm();
  fetchKendaraan();
};

const deleteKendaraan = async (id) => {
  await fetch(`http://localhost:3000/kendaraan/${id}`, {
    method: "DELETE",
  });
  fetchKendaraan();
};

const resetForm = () => {
  form.value = { nama: "", jenis: "", status: "Tersedia" };
  isEditing.value = false;
  editId.value = null;
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin-bottom: 30px;
}
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  background: #f9f9f9;
}
.card h3 {
  margin: 0 0 10px;
}
.card .actions {
  margin-top: 10px;
}
.card button {
  margin-right: 8px;
}
.form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.form input,
.form select {
  padding: 6px;
  flex: 1;
  min-width: 150px;
}
</style>
