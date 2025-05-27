import { createRouter, createWebHistory } from "vue-router";
import mainLayout from "../layouts/mainLayout.vue";

// import home from "../views/home.vue";
// import kendaraan from "../views/kendaraan.vue";
// import rental from "../views/rental.vue";

// const home = () => import("../views/home.vue");

// const routes = [
//   { path: "/", component: home },
//   { path: "/kendaraan", component: () => import("../views/kendaraan.vue") },
//   { path: "/rental", component: () => import("../views/rental.vue") },
// ];

const routes = [
  {
    path: "/",
    component: mainLayout,
    children: [
      { path: "", component: () => import("../views/home.vue") },
      { path: "kendaraan", component: () => import("../views/kendaraan.vue") },
      { path: "rental", component: () => import("../views/rental.vue") },
      {
        path: "pengembalian",
        component: () => import("../views/pengembalian.vue"),
      },
      { path: "pelanggan", component: () => import("../views/pelanggan.vue") },
      { path: "laporan", component: () => import("../views/laporan.vue") },
      // tambahkan route lainnya di sini...
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
