<template>
  <q-layout view="lHh Lpr lFf">
    <!-- 🔺 HEADER -->
    <q-header elevated class="bg-gradient-to-r from-blue-600 to-blue-700">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title class="text-white font-semibold"
          >Rental Kendaraan</q-toolbar-title
        >
        <q-space />
        <!-- 🔹 Tombol Logout -->
        <q-btn
          flat
          dense
          color="negative"
          icon="logout"
          label="Logout"
          @click="handleLogout"
          class="text-white hover:bg-red-600 transition-colors"
        />
      </q-toolbar>
    </q-header>

    <!-- 🔹 DRAWER (Sidebar) -->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="modern-sidebar"
      :width="280"
    >
      <!-- Header Profile Section -->
      <div class="sidebar-header">
        <div class="profile-section">
          <q-avatar size="48px" class="profile-avatar">
            <q-icon name="person" size="24px" />
          </q-avatar>
          <div class="profile-info">
            <div class="username">{{ userInfo.name || "Loading..." }}</div>
            <div class="user-role">{{ userInfo.role || "User" }}</div>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <q-list class="navigation-menu">
        <q-item
          to="/"
          clickable
          v-ripple
          class="nav-item"
          :class="{ active: $route.path === '/' }"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section class="nav-text">Dashboard</q-item-section>
        </q-item>

        <q-item
          to="/kendaraan"
          clickable
          v-ripple
          class="nav-item"
          :class="{ active: $route.path === '/kendaraan' }"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="commute" />
          </q-item-section>
          <q-item-section class="nav-text">Kendaraan</q-item-section>
        </q-item>

        <q-item
          to="/pelanggan"
          clickable
          v-ripple
          class="nav-item"
          :class="{ active: $route.path === '/pelanggan' }"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="people" />
          </q-item-section>
          <q-item-section class="nav-text">Pelanggan</q-item-section>
        </q-item>

        <q-item
          to="/rental"
          clickable
          v-ripple
          class="nav-item"
          :class="{ active: $route.path === '/rental' }"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section class="nav-text">Penyewaan</q-item-section>
        </q-item>

        <q-item
          to="/pengembalian"
          clickable
          v-ripple
          class="nav-item"
          :class="{ active: $route.path === '/pengembalian' }"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="history" />
          </q-item-section>
          <q-item-section class="nav-text">Pengembalian</q-item-section>
        </q-item>

        <q-item
          to="/laporan"
          clickable
          v-ripple
          class="nav-item"
          :class="{ active: $route.path === '/laporan' }"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="insert_chart" />
          </q-item-section>
          <q-item-section class="nav-text">Laporan</q-item-section>
        </q-item>
      </q-list>

      <!-- Bottom Section -->
      <div class="sidebar-bottom">
        <q-separator class="separator" />
        <q-item
          clickable
          v-ripple
          class="nav-item logout-item"
          @click="handleLogout"
        >
          <q-item-section avatar class="nav-icon">
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section class="nav-text">Log out</q-item-section>
        </q-item>
      </div>
    </q-drawer>

    <!-- 🔸 MAIN PAGE -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

const router = useRouter();
const authStore = useAuthStore();
const $q = useQuasar();

const leftDrawerOpen = ref(true);
const userInfo = ref({
  name: "",
  email: "",
  role: "",
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

// ✅ Fungsi untuk mendapatkan informasi user
const getUserInfo = async () => {
  try {
    // Ambil user ID dari localStorage atau authStore
    const userId =
      authStore.userId ||
      localStorage.getItem("userId") ||
      localStorage.getItem("user_id");

    if (!userId) {
      console.error("User ID tidak ditemukan");
      // Fallback ke user pertama jika tidak ada ID
      await getAllUsers();
      return;
    }

    const response = await axios.get(`http://localhost:3000/users`);

    if (response.data && Array.isArray(response.data)) {
      // Cari user berdasarkan ID
      const currentUser = response.data.find((user) => user.id == userId);

      if (currentUser) {
        userInfo.value = {
          name: currentUser.username || "User",
          role: currentUser.role || "User",
        };
      } else {
        // Jika user tidak ditemukan, ambil user pertama sebagai fallback
        const firstUser = response.data[0];
        userInfo.value = {
          name: firstUser.username || "User",
          role: firstUser.role || "User",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching user info:", error);

    // Fallback: ambil dari localStorage jika ada
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        userInfo.value = {
          name: userData.username || userData.name || "User",
          role: userData.role || "User",
        };
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        // Default fallback
        userInfo.value = {
          name: "User",
          email: "user@rental.com",
          role: "User",
        };
      }
    }
  }
};

// ✅ Fungsi alternatif untuk mendapatkan semua user (jika diperlukan)
const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users`);

    if (
      response.data &&
      Array.isArray(response.data) &&
      response.data.length > 0
    ) {
      // Ambil user pertama sebagai default
      const firstUser = response.data[0];
      userInfo.value = {
        name: firstUser.username || "User",
        email: firstUser.username + "@rental.com",
        role: firstUser.role || "User",
      };
    }
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

// ✅ Fungsi Logout
const handleLogout = () => {
  authStore.logout();
  $q.notify({ type: "positive", message: "Logout berhasil" });
  router.push("/login");
};

// ✅ Load user info saat component mounted
onMounted(() => {
  getUserInfo();
});

// ✅ Fungsi untuk mendapatkan user berdasarkan username (alternatif)
const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(`http://localhost:3000/users`);

    if (response.data && Array.isArray(response.data)) {
      const user = response.data.find((u) => u.username === username);
      if (user) {
        userInfo.value = {
          name: user.username,
          email: user.username + "@rental.com",
          role: user.role || "User",
        };
      }
    }
  } catch (error) {
    console.error("Error fetching user by username:", error);
  }
};
</script>

<style scoped>
.modern-sidebar {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  border-right: 1px solid #e2e8f0;
}

.sidebar-header {
  padding: 24px 20px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 8px;
}

.profile-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.profile-avatar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-info {
  flex: 1;
}

.username {
  font-weight: 600;
  font-size: 14px;
  color: #1e293b;
  margin-bottom: 2px;
}

.user-email {
  font-size: 12px;
  color: #64748b;
}

.user-role {
  font-size: 11px;
  color: #3b82f6;
  font-weight: 600;
  background: rgba(59, 130, 246, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  display: inline-block;
  margin-top: 4px;
}

.navigation-menu {
  padding: 8px 12px;
  flex: 1;
}

.nav-item {
  border-radius: 12px;
  margin-bottom: 4px;
  transition: all 0.2s ease;
  padding: 12px 16px;
  position: relative;
}

.nav-item:hover {
  background: rgba(59, 130, 246, 0.08);
  transform: translateX(4px);
}

.nav-item.active {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.nav-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 20px;
  background: white;
  border-radius: 0 4px 4px 0;
}

.nav-icon {
  min-width: 24px;
  color: #64748b;
}

.nav-item.active .nav-icon {
  color: white;
}

.nav-text {
  font-weight: 500;
  font-size: 14px;
  color: #374151;
}

.nav-item.active .nav-text {
  color: white;
}

.sidebar-bottom {
  margin-top: auto;
  padding: 16px 12px;
}

.separator {
  margin: 12px 0;
  background: #e2e8f0;
}

.logout-item {
  color: #dc2626;
}

.logout-item:hover {
  background: rgba(220, 38, 38, 0.08);
}

.logout-item .nav-icon {
  color: #dc2626;
}

.logout-item .nav-text {
  color: #dc2626;
}

/* Header Gradient */
.bg-gradient-to-r {
  background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
}

/* Responsive Design */
@media (max-width: 768px) {
  .modern-sidebar {
    width: 260px !important;
  }

  .sidebar-header {
    padding: 16px;
  }

  .profile-avatar {
    width: 40px;
    height: 40px;
  }

  .navigation-menu {
    padding: 8px;
  }

  .nav-item {
    padding: 10px 12px;
  }
}

/* Smooth transitions */
* {
  transition: all 0.2s ease;
}

/* Custom scrollbar */
.modern-sidebar::-webkit-scrollbar {
  width: 4px;
}

.modern-sidebar::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.modern-sidebar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.modern-sidebar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
