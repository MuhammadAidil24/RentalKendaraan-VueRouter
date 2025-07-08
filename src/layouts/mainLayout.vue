<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 🔺 HEADER -->
    <q-header elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Rental Kendaraan</q-toolbar-title>
        <q-space />
        <!-- 🔹 Tombol Logout -->
        <q-btn
          flat
          dense
          color="negative"
          icon="logout"
          label="Logout"
          @click="handleLogout"
        />
      </q-toolbar>
    </q-header>

    <!-- 🔹 DRAWER (Sidebar) -->
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list padding>
        <q-item to="/" clickable v-ripple>
          <q-item-section avatar><q-icon name="dashboard" /></q-item-section>
          <q-item-section>Dashboard</q-item-section>
        </q-item>
        <q-item to="/kendaraan" clickable v-ripple>
          <q-item-section avatar><q-icon name="commute" /></q-item-section>
          <q-item-section>Kendaraan</q-item-section>
        </q-item>
        <q-item to="/pelanggan" clickable v-ripple>
          <q-item-section avatar><q-icon name="people" /></q-item-section>
          <q-item-section>Pelanggan</q-item-section>
        </q-item>
        <q-item to="/rental" clickable v-ripple>
          <q-item-section avatar><q-icon name="assignment" /></q-item-section>
          <q-item-section>Penyewaan</q-item-section>
        </q-item>
        <q-item to="/pengembalian" clickable v-ripple>
          <q-item-section avatar><q-icon name="history" /></q-item-section>
          <q-item-section>Pengembalian</q-item-section>
        </q-item>
        <q-item to="/laporan" clickable v-ripple>
          <q-item-section avatar><q-icon name="insert_chart" /></q-item-section>
          <q-item-section>Laporan</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- 🔸 MAIN PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();

const leftDrawerOpen = ref(true);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// ✅ Fungsi Logout
const handleLogout = () => {
  authStore.logout();
  $q.notify({ type: "positive", message: "Logout berhasil" });
  router.push("/login");
};
</script>
