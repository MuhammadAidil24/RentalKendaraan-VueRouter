Penjelasan

Library	dan Fungsi nya yang digunkan didalam projek
- Vue 3	Framework utama untuk membuat antarmuka pengguna.
- Vue Router	Untuk navigasi antar halaman (routing).
- Pinia	State management modern dan ringan untuk Vue 3.
- Pinia Plugin Persisted	Menyimpan state ke localStorage agar tidak hilang saat refresh.
- Axios	Untuk komunikasi HTTP dengan REST API.
- Quasar	UI Framework untuk Vue yang menyediakan komponen siap pakai.
- @quasar/extras	Ikon tambahan dan gaya dari Quasar.

Alur Kerja Website secata umum 
1. Halaman Awal: Login
 Pengguna pertama kali diarahkan ke halaman /login (views/login.vue).
 - User mengisi username dan password, lalu menekan tombol Login dan Data dikirim ke API menggunakan Axios.
 Jika berhasil:
 - Sistem menerima token autentikasi dari server.
 - Token dan data user disimpan di Pinia store (stores/auth.js) dan localStorage.
 - User dialihkan ke halaman Dashboard (misal: /dashboard).

2. Manajemen Autentikasi dan Akses
 File routers/index.js memiliki route guard (beforeEach):
 - Mengecek apakah token tersedia.
 - Jika tidak ada token → diarahkan ke login.
 - Jika token ada → akses halaman diberikan.

3. Tampilan dan Navigasi (Layout)
 Setelah login, pengguna akan masuk ke tampilan layout utama (layouts/mainLayout.vue) yang berisi:
 - Sidebar navigasi (components/Sidebar.vue)
 - Konten halaman yang dinamis (router-view)
 - Tombol Logout di sidebar/header.

4. Navigasi Halaman (Routing)
 - Navigasi menggunakan Vue Router.
 Struktur menu biasanya merujuk ke:
 - Dashboard
 - Master Data (pelanggan, kendaraan, dsb.)
 - Transaksi (penyewaan, pengembalian)
 Setiap halaman adalah file di views/, dan terhubung melalui routers/index.js.

5. Komunikasi dengan Backend (API)
 Setiap operasi data (lihat, tambah, ubah, hapus) menggunakan Axios untuk mengakses REST API.
 Contoh:
  GET /api/customers → Ambil daftar pelanggan
  POST /api/vehicles → Tambah kendaraan baru
  PUT /api/rental/5 → Update transaksi sewa ke status "selesai"
 Token dikirim via header Authorization untuk proteksi API.

6. State Management (Pinia)
 File stores/auth.js menyimpan:
 - Data pengguna
 - Token autentikasi
 - Status login
Persisted State Plugin: memastikan state tetap ada meskipun browser di-refresh.

7. Logout
 Saat pengguna menekan tombol Logout:
 - Fungsi logout() di auth.js dijalankan:
 - Token dan data pengguna dihapus dari state dan localStorage.
 - Router diarahkan kembali ke halaman /login.

======= Rangkuman Alur Kerja Website =======
1. User membuka website → diarahkan ke /login
2. Login sukses → token disimpan
3. Halaman dashboard terbuka → layout utama dimuat
4. Navigasi halaman pakai sidebar + vue-router
5. Semua data diambil dan dikirim pakai Axios ke API
6. Logout → hapus token, kembali ke login
