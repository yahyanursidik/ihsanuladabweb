# Review UI/UX dan konten

Lingkup: beranda, sembilan halaman program, serta navigasi bersama pada
halaman tentang kami dan karir/pengabdian.

## Temuan dan Implementasi

| Temuan | Dampak | Perbaikan |
| --- | --- | --- |
| Warna teks diwarisi dari stylesheet global pada footer dan CTA | Teks sulit dibaca pada latar gelap atau berwarna | Warna eksplisit sesuai konteks pada Father Project, HBL, PKGQ, HTA, IAIEE, dan DeenUp |
| Warna tautan menimpa label tombol Fitrah dan Ushuluna | Kontras label tombol tidak memadai | Foreground tombol ditetapkan pada selector halaman |
| Menu IAIEE belum dicakup pengendali navigasi bersama | Menu tidak konsisten saat Escape atau klik luar | Satu pengendali menu, status expanded, penutupan, dan pengembalian fokus |
| DeenUp belum memiliki navigasi bawah mobile | Perpindahan bagian halaman lebih sulit pada ponsel | Navigasi bawah berikon, menu tambahan, dan safe area |
| Beranda hanya menonjolkan sebagian program tanpa pencarian | Pilihan untuk kebutuhan tertentu sulit ditemukan | Direktori sembilan program dengan pencarian, filter kebutuhan, dan kondisi kosong |
| Baris utilitas beranda terpotong pada layar kecil | Tautan tidak terlihat utuh | Header mobile lebih ringkas dan hero memberi petunjuk ke bagian berikutnya |
| Informasi praktis program belum merata | Pengunjung sulit menilai kesiapan dan langkah berikutnya | Ringkasan peserta/format/fokus, persiapan, FAQ spesifik, dan program terkait |
| Testimoni DeenUp tidak memiliki sumber pendukung dalam proyek | Kredibilitas konten tidak dapat diperiksa | Diganti contoh penerapan belajar; klaim jadwal pasti yang belum terdokumentasi dirapikan |
| Sebagian judul hero menjelaskan manfaat tanpa menyebut program | Identitas program kurang jelas pada pandangan pertama | Nama HTA, PKGQ, HBL, IAIEE, dan DeenUp menjadi sinyal utama |

## Konsistensi Tema

Pedoman lintas halaman ada di `design.md`. Identitas hijau/emas yayasan tetap
menjadi pengikat. Fitrah memakai berry/blush yang kalem, HTA/IAIEE aksen biru,
Ushuluna olive, HBL hijau keluarga, dan DeenUp cyan. Informasi praktis memakai
permukaan terang dan tipografi yang konsisten.

Gambar katalog mengikuti aset program yang sudah disetujui. Ilustrasi faceless
dan busana pada aset yang ada dipertahankan. Hero IAIEE memakai ruang kerja mutu
sebagai latar penuh dengan lapisan kontras.

## Konten Operasional

Jadwal angkatan, biaya, persyaratan, ketentuan dokumen hasil belajar, dan
ketersediaan layanan belum berasal dari basis data operasional. Halaman
mengarahkan pertanyaan ini kepada admin. Usia dan durasi tertentu memakai
konten program yang sudah ada dalam proyek.

Tautan WhatsApp berisi nama program untuk membantu calon peserta memulai
percakapan. Tautan tidak mengirim pesan secara otomatis.

## Verifikasi

- Build statis Astro mencakup 12 halaman.
- Pengujian Chromium melalui `scripts/check-ui.mjs` pada lebar 320, 375, 414,
  768, dan 1440 piksel.
- Pemeriksaan overflow, tabrakan navigasi, anchor lokal, gambar, dan error JavaScript.
- Interaksi pencarian, filter, reset, FAQ dengan keyboard, Escape, serta satu menu
  terbuka pada satu waktu.
- Kontras teks pada latar CSS diperiksa secara otomatis. Area gambar/overlay dan
  header diperiksa melalui screenshot karena komposit gambar tidak dapat dinilai
  akurat hanya dari warna CSS.
- Screenshot dan laporan rinci disimpan lokal di `.hallmark/ui-review/`.

Jalankan dengan Playwright yang tersedia di lingkungan pengujian:

```powershell
$env:UI_STATIC = '1'
node scripts/check-ui.mjs
```

`PLAYWRIGHT_MODULE` dan `PLAYWRIGHT_BROWSERS_PATH` dapat ditetapkan jika
Playwright menggunakan runtime terpisah. Direktori `.hallmark/` diabaikan Git.

## Pemeriksaan Proporsi Lanjutan

Pemeriksaan overflow saja tidak cukup untuk menilai pengalaman membaca. Tahap
berikutnya memeriksa ukuran heading, tinggi bagian, lebar paragraf, dan screenshot
bagian tengah serta footer pada seluruh halaman.

Perbaikan yang diterapkan:

- Menyatukan ukuran heading, gutter, dan ritme bagian melalui
  `src/styles/layout-refinement.css`.
- Memadatkan header beranda dan memastikan nama yayasan tetap jelas.
- Memperbaiki grid pilihan peran beranda yang masih memakai kolom desktop di mobile.
- Memperbaiki alur IAIEE: nomor tahap yang disembunyikan sebelumnya membuat paragraf
  masuk ke track 48px; layout mobile sekarang memakai dua track sesuai elemen tersisa.
- Mengatur ulang grid Fitrah, Ushuluna, IAPA, dan Tentang Kami pada tablet.
- Memindahkan padding viewport ke bagian terluar pada visi/misi dan panel webinar HTA.
- Mengubah fondasi HTA dalam kolom samping menjadi daftar yang terbaca.
- Menghapus ringkasan berulang HTA/PKGQ serta kotak mengambang di bawah hero HTA.
- Menjadikan hero Tentang Kami dan Karir full-width dengan aset nonfiguratif yang ada.
- Memadatkan kurikulum HBL menjadi empat disclosure dengan judul berbahasa Indonesia.
- Menjaga skip link tetap tersembunyi sampai menerima fokus keyboard.

Mode `UI_LAYOUT=1` pada script pengujian merekam ukuran bagian dan mendeteksi
paragraf panjang pada kolom di bawah 160px. Pengujian diperluas ke lebar 960, 1024,
dan 1920px untuk memeriksa batas breakpoint serta desktop lebar.

## Koreksi Dari Screenshot HBL

- `.iais-signals` masih mewarisi empat track dari stylesheet lama. Heading dan
  daftar empat langkah masuk ke track terpisah, sehingga kolom teks terjepit.
  Parent sekarang block; daftar langkah memakai lebar penuh dan breakpoint 4/2/1.
- Footer HBL masih mewarisi `display: flex`. Bagian penutup dan metadata sekarang
  ditumpuk, dengan track brand yang cukup dan logo yang tidak menyusut.
- Pola footer serupa dikoreksi pada Father Project, Fitrah Journey, dan Ushuluna.
- Selector pembersih inner wrapper sebelumnya mengenai `.program-inner`,
  menghapus gutter ringkasan program. Overview dikecualikan, dan guide memakai
  gutter yang sama pada section penuh, bukan container terbatas.
- Heading bagian HBL sekarang stacked. Daftar audience/orang tua dibuat sebagai
  baris terbaca, dan dekorasi legacy pada nested guardrail span dihapus.
- Infografis Tentang Kami diberi area penuh; footer Karir ditumpuk pada tablet.

Pemeriksaan sekarang mencakup teks mulai 40 karakter pada track di bawah 160px,
tabrakan link footer, keselarasan overview/intro, serta rasio lebar flowchart dan
metadata footer. Preview localhost diperiksa langsung pada 320, 375, 414, 768,
1024, 1291, 1440, dan 1876px. Screenshot HBL fokus mencakup alur, overview,
dan footer. Toolbar developer disembunyikan hanya selama pengambilan screenshot.
