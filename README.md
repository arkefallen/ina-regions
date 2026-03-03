# Indonesia Regions Filter

Sebuah aplikasi web *Single Page Application* (SPA) sederhana untuk memfilter data hierarki wilayah di Indonesia secara interaktif. Dibuat sebagai bagian dari Technical Test Frontend Development.

## 🎯 Overview

Project ini menampilkan antarmuka dua sisi (sidebar dan main area) di mana pengguna dapat memilih Provinsi, kemudian Kota/Kabupaten yang sesuai dengan provinsi tersebut, dan terakhir Kecamatan. 

Halaman secara dinamis akan memperbarui navigasi *breadcrumb* beserta penanda wilayah utama secara berjenjang di layar sebelah kanan. Canggihnya, pilihan yang dilakukan oleh pengguna akan secara otomatis disinkronisasikan dengan *URL Parameter*, sehingga apabila halaman di-refresh, state filter wilayah tidak akan hilang.

## ✨ Fitur Utama

- **Cascading Combobox**: Opsi pada combobox Kota/Kabupaten baru akan terbuka jika Provinsi dipilih. Begitupun Kecamatan yang bergantung pada Kota/Kabupaten.
- **URL State Persistence**: Filter bertahan (survive) dari reload browser dengan memanfaatkan Search Parameters di URL.
- **Responsive Typography**: Ukuran font otomatis menyesuaikan (mengecil/membesar) secara ideal dengan lebar perangkat (Mobile, Tablet, Desktop).
- **Auto-loading Data**: Data wilayah di-fetch langsung memanfaatkan arsitektur Data Router dan Loader dari React Router v7.
- **Reset State**: Tombol `RESET` untuk mengembalikan seluruh combobox ke kondisi awal seketika.

## 🛠 Tech Stack

Proyek ini dibangun mengikuti praktik pengembangan Front-End modern terbaru:

*   **[Vite v5](https://vite.dev/)** - Sebagai Next Generation Frontend Tooling yang bekerja super cepat.
*   **[React v18](https://react.dev/)** - Library UI dengan Component-based Architecture.
*   **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript untuk type-safety komponen dan data statis.
*   **[React Router v7](https://reactrouter.com/)** - Menangani routing dan data loading (Data Mode) tanpa framework utuh.
*   **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework untuk implementasi styling yang konsisten dan pixel-perfect.
*   **[Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)** - Tipografi utama yang diambil langsung dari Google Fonts.

## 🚀 Setup Secara Lokal

Untuk menjalankan project ini ke dalam environment pengembangan lokal Anda, ikuti instruksi berikut:

### Prasyarat:
Pastikan Anda sudah menginstal **Node.js** terinstal di perangkat Anda.

### Instalasi & Menjalankan Project:

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/arkefallen/ina-regions.git
   cd ina-regions
   ```

2. **Install dependency package:**
   ```bash
   npm install
   ```

3. **Jalankan local development server:**
   ```bash
   npm run dev
   ```

4. **Buka di Browser:**
   Akses `http://localhost:5173` melalui web browser.

## 📦 Build untuk Produksi (Publikasi)

Jika Anda ingin membungkus (*build*) aplikasi untuk dipublikasikan ke platform hosting gratis (seperti Vercel, Netlify, atau GitHub Pages):

```bash
npm run build
```

Perintah khusus ini akan melakukan _type-checking_ serta membuat folder `dist/` yang berisikan aset statis (HTML, CSS, JS yang sudah dikompresi) dan siap untuk langsung di-*deploy*.
