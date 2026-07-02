# Yayasan Pendidikan Ihsanul Adab

Revamp website Yayasan Pendidikan Ihsanul Adab menggunakan Astro 7.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Struktur utama

- `src/pages/index.astro` - halaman utama dan data program.
- `src/styles/global.css` - seluruh styling visual.
- `public/images/logo-ihsanul-adab.png` - logo dari brief.
- `public/images/hero-majelis-ilmu-salaf.png` - hero image baru bernuansa majelis ilmu.
- `public/images/hero-pendidikan-ihsanul-adab.png` - hero image versi awal untuk pembanding.
- `docs/studiocms-astro7-notes.md` - catatan kompatibilitas StudioCMS dengan Astro 7.

## StudioCMS

Project ini memakai Astro 7.0.4. Saat dicek pada 2026-07-01, `studiocms@0.4.4` masih mensyaratkan peer dependency `astro:^5.12.9`, jadi belum dipasang langsung agar build Astro 7 tetap stabil.

Konten di `src/pages/index.astro` sudah dibuat sebagai data terstruktur agar mudah dipindah ke koleksi StudioCMS setelah paketnya mendukung Astro 7.
