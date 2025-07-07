import { createRouter, createWebHistory } from "vue-router";
import mainLayout from "../layouts/mainLayout.vue";
import { useAuthStore } from "../stores/auth.js"; // tambahkan ini

const routes = [
  {
    path: "/login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/",
    component: mainLayout,
    children: [
      {
        path: "",
        component: () => import("../views/home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "kendaraan",
        component: () => import("../views/kendaraan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "rental",
        component: () => import("../views/rental.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "pengembalian",
        component: () => import("../views/pengembalian.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "pelanggan",
        component: () => import("../views/pelanggan.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "laporan",
        component: () => import("../views/laporan.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ ROUTER GUARD
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.path === "/login") {
    next();
  } else if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    next("/login");
  } else {
    next();
  }
});

export default router;
