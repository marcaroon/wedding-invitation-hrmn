# Undangan Pernikahan

Undangan editorial untuk Vicky & Roihatul, menggunakan Next.js App Router, TypeScript strict, Tailwind CSS, `next/image`, `next/font`, Motion, dan ikon Lucide minimal. Seluruh antarmuka, metadata, label aksesibilitas, dan umpan balik menggunakan Bahasa Indonesia.

## Status konten

Implementasi dapat dijalankan lokal. **Belum siap dibagikan kepada tamu:** foto, tanggal, data keluarga, lokasi, dan rekening belum lengkap. Data yang sudah diisi dipertahankan; informasi yang belum tersedia memakai placeholder atau `null`. Kutipan tidak ditampilkan sebelum disetujui pasangan. Bagian konfirmasi kehadiran telah dihapus dari alur undangan; tidak ada formulir atau pengumpulan data tamu pada halaman.

## Menjalankan

Gunakan Node.js 22.13+ dan npm.

```sh
npm ci
npm run dev
```

Buka `http://localhost:3000` atau `http://localhost:3000/vicky-roihatul?to=Bapak%20Ammar`. Parameter `to` diproses di browser sehingga halaman dapat diprarender dan metadata tidak berisi nama tamu. URL didekode tepat sekali, dibatasi 100 karakter, dibersihkan dari markup dan kontrol arah teks, lalu dirender sebagai teks React.

```sh
npm test
npm run typecheck
npm run lint
npm run build
npm start
```

Build awal memerlukan akses Google Fonts. `next/font` mengunduh dan menyajikan font dari aplikasi sehingga tamu tidak mengakses Google Fonts secara langsung.

## Arsitektur

```text
src/app/                     Rute, metadata, halaman kesalahan, CSS dan token
src/data/invitations/         Konfigurasi per pasangan dan registri undangan
src/types/invitation.ts       Model data undangan
src/sections/                Bagian halaman yang dapat dipakai ulang
src/components/invitation/   Sampul, foto, penghitung waktu, salin rekening
src/animations/              Reveal, parallax, foto bertumpuk
src/lib/                     Format id-ID, nama tamu, URL, validasi RSVP
src/services/rsvp.ts         Adapter simulasi/API untuk konfirmasi
public/couples/              Foto dan musik lokal per klien
tests/                      Pengujian data, tanggal, URL, dan validasi
```

Komposisi bagian halaman menggunakan Server Components. State browser dibatasi pada sampul/nama tamu/musik, header mengambang, animasi, penghitung waktu, dan salin rekening. Server Components diteruskan sebagai `children` ke pembungkus interaktif. Tidak menggunakan database atau Prisma.

## Mengubah nama dan membuat klien baru

Semua data berada di `src/data/invitations/vicky-roihatul.ts`. Ubah `couple.groom` dan `couple.bride`: `name`, `fullName`, `father`, `mother`. Nama orang tua cukup nama saja; komponen menambahkan sapaan Bapak/Ibu.

Untuk klien baru:

1. Salin konfigurasi tersebut ke berkas baru, ubah nama ekspor dan `slug`.
2. Isi data pasangan, konten, aset, dan metadata. Pertahankan `null` untuk informasi yang belum dikonfirmasi.
3. Impor dan tambahkan ke objek `invitations` di `src/data/invitations/index.ts`.
4. Buat folder `public/couples/<slug>/` dan masukkan aset.
5. Jalankan pemeriksaan dan build. Rute `/<slug>` tersedia otomatis. Ubah `defaultInvitation` jika halaman `/` perlu membuka pasangan lain.

Tema per klien berada pada `theme`: `background`, `foreground`, `accent`, `stone`. Token spasi, komposisi, breakpoint dan ukuran teks berada di `src/app/globals.css`. Font Cormorant Garamond dan DM Sans diatur di `src/app/layout.tsx`.

## Foto

Struktur awal sudah disiapkan:

```text
public/couples/vicky-roihatul/
  cover/
  couple/
  gallery/
  ceremony/
  reception/
  closing/
  music/
```

Masukkan foto asli berformat WebP/JPEG/AVIF. Ubah objek `Photo` dari `src: null` menjadi path yang diawali `/couples/`. Contoh struktur (nama berkas harus sesuai aset yang benar-benar tersedia):

```ts
{
  src: "/couples/vicky-roihatul/cover/utama.webp",
  alt: "Vicky dan Roihatul mengenakan busana Jawa di depan bangunan batu",
  placeholder: "[Foto Sampul Vicky & Roihatul]",
  position: "50% 40%",
}
```

Sesuaikan `alt` dengan isi foto yang sebenarnya. `position` opsional mengatur titik potong. Sampul portrait, foto pasangan 4:5, cerita portrait, interlude lanskap, serta galeri campuran akan mengikuti bingkai responsif. `photos.story` adalah foto yang bertumpuk ketika digulir; `gallery` mengatur galeri editorial terpisah. Foto penutup berada di `photos.closing`.

Hanya sampul dipreload. Aset lain menggunakan lazy loading, `sizes` responsif, kualitas 75, dan bingkai berukuran tetap untuk menghindari pergeseran tata letak. Sampul berkualitas 85. Sebaiknya siapkan lebar sumber sekitar 1600–2400 piksel dan kompres sebelum dimasukkan. Hindari file kamera mentah. Foto tidak dibuka dalam lightbox.

## Tanggal, waktu, dan acara

Isi `date.startsAt` dengan waktu pernikahan utama dalam ISO 8601 **dengan zona eksplisit**, misalnya format `YYYY-MM-DDTHH:mm:ss+07:00`, menggunakan tanggal sebenarnya. Isi juga `events[].startsAt` dan opsional `endsAt` untuk setiap acara. `date.startsAt` menentukan hitung mundur; waktu acara ditentukan masing-masing dan perlu diselaraskan.

`date.timeZone` default `Asia/Jakarta`, `date.zoneLabel` default `WIB`. Semua tanggal dan waktu diformat menggunakan `Intl.DateTimeFormat("id-ID", ...)`. Bila zona berbeda, ubah keduanya secara konsisten. Contoh label WIB: `08.00 – 13.00 WIB`.

Jika tanggal masih `null` atau tidak valid, placeholder ditampilkan dan penghitung waktu menampilkan garis, bukan angka rekaan. Setelah waktu tujuan lewat, penghitung berhenti menampilkan angka negatif dan menampilkan pesan bahwa hari yang dinantikan telah tiba.

Ubah `events[].venue`, `address`, dan `mapsUrl`. Tautan Google Maps harus HTTPS dan telah diperiksa sesuai lokasi acara. Tombol lokasi hanya muncul untuk URL valid; tidak ada peta atau URL rekaan.

## Hadiah dan musik

`gift.enabled` mengatur bagian hadiah. `gift.accounts` menerima satu atau beberapa `{ bank, holder, number }`. Nomor rekening harus berupa string agar angka nol di depan tidak hilang. Jika `number: null`, tombol salin dinonaktifkan. `gift.address` opsional untuk hadiah fisik. Clipboard memerlukan HTTPS atau localhost; kegagalannya ditangani dengan pesan Indonesia agar nomor bisa disalin manual.

Aktifkan `music.enabled` dan isi `music.src` dengan path audio lokal yang berhak digunakan. Musik baru diputar setelah tombol **Buka Undangan** ditekan. Kontrol kecil dapat menjeda atau memutar kembali; kegagalan pemutaran memiliki pesan tersendiri. Tidak ada audio dimuat ketika musik dinonaktifkan.

## Modul RSVP yang tidak ditampilkan

`RSVPSection` tidak lagi diimpor atau dirender oleh `InvitationPage`, dan tautan konfirmasi telah dihapus dari header. Konfigurasi klien memakai `rsvp.enabled: false`. Modul formulir, validasi, dan adapter lama disimpan untuk kemungkinan penggunaan pada klien lain; perubahan lokal pada modul tersebut tetap dipertahankan. Bagian ini hanya referensi jika kelak ingin mengaktifkan ulang fitur dengan memasang komponen ke halaman serta mengubah konfigurasi.

`rsvp.mode: "mock"` menjalankan simulasi 700 ms, tanpa jaringan, database, atau localStorage. Pesan simulasi tetap terlihat. Jangan mengganti pesan simulasi menjadi klaim konfirmasi diterima.

Untuk backend sungguhan:

1. Buat Route Handler server, misalnya `src/app/api/rsvp/route.ts`.
2. Validasi ulang payload di server (validasi client tidak cukup), cari `invitationSlug` dalam registri, gunakan batas tamu dari konfigurasi server, dan normalisasi tamu tidak hadir menjadi 0.
3. Simpan ke Supabase, Google Sheets API, atau API lain di server. Terapkan pembatasan request, pembatasan ukuran isi, pencegahan spam, dan aturan duplikasi/update yang sesuai.
4. Kembalikan status 2xx dengan JSON `{ "ok": true }` **hanya sesudah penyimpanan berhasil**; kembalikan status non-2xx jika gagal. UI mempertahankan isian agar bisa dicoba kembali.
5. Isi `rsvp.mode: "api"` dan `rsvp.endpoint: "/api/rsvp"`. Endpoint hanya boleh same-origin `/api/`.

Payload adapter:

```ts
{
  invitationSlug: string;
  name: string;
  attendance: "present" | "absent";
  guests: number; // 0 jika berhalangan hadir
  wishes: string;
}
```

Untuk Supabase, simpan service-role key di environment server tanpa prefiks `NEXT_PUBLIC_`. Jangan mengimpor kredensial ke komponen client. Aktifkan RLS, batasi akses data tamu, dan jangan beri akses baca publik ke tabel RSVP. Backend perlu pengenal undangan tamu atau receipt/token yang aman untuk mencegah duplikasi saat request dicoba ulang. Nama saja bukan identitas unik. Adapter dipisahkan agar kontrak dapat diperluas tanpa mengubah desain formulir.

## Aksesibilitas dan gerak

Sampul menahan scroll dan membuat isi undangan `inert` sampai dibuka. Tab tetap pada tombol pembuka; fokus berpindah ke isi setelah transisi selesai. Navigasi dan umpan balik memakai elemen semantik. Ikon panah Lucide menggunakan `currentColor`, garis 1,4 piksel, dan `aria-hidden` karena label tautan sudah menjelaskan tindakan.

Pembuka, tanggal, foto setelah acara, hadiah, dan penutup ditandai `data-snap-section`. Hook `useSectionSnap` mengukur tinggi aktual bagian setelah perubahan konten, font, atau viewport. Hanya bagian yang muat pada viewport yang mendapatkan `data-snap-fit`, sehingga browser dapat menariknya ke posisi awal dengan `scroll-snap-type: y proximity`. Bagian panjang tetap bebas digulir; tidak ada intersepsi wheel/touch atau pemaksaan perpindahan satu halaman. Atur tanda tersebut di komponen bagian bila komposisi klien berubah.

Header berbentuk kapsul transparan dengan warna dari token tema. `FloatingHeader` membaca `data-header-tone` pada bagian yang sedang dilewati: `light`, `dark`, atau `photo`. Transparansi diatur melalui `--header-bg` pada `.site-header`. Tautan bagian aktif memiliki latar lembut. Header tidak mengubah data klien.

Foto menggunakan reveal bingkai, parallax/zoom ringan, dan tumpukan yang perlahan mengecil ketika foto berikutnya naik. `prefers-reduced-motion` menonaktifkan snap, parallax, sticky stacking, smooth scroll, dan transisi kompleks. Gerak dominan memakai opacity/transform dan sticky CSS; reveal foto memakai clip-path sekali saat masuk layar. Layout memakai `svh`, safe-area inset, dan target sentuh minimal 44 piksel. JavaScript diperlukan untuk membuka dan berinteraksi; ada pesan `noscript`.

## SEO, pratinjau tautan, dan Vercel

Ubah `seo.title`, `seo.description`, dan `seo.ogImage` (path foto pratinjau lokal yang tersedia, disarankan 1200×630). OpenGraph memakai locale `id_ID`. `seo.indexable` default `false` selama konten belum lengkap; tentukan kebijakan indeks sesuai pasangan. Nama tamu dari query tidak dimasukkan metadata.

Untuk deploy ke Vercel:

1. Lengkapi konten nyata dan foto.
2. Push repository ke GitHub, lalu impor proyek ke Vercel dengan preset Next.js.
3. Pilih Node.js 22.x, install `npm ci`, dan build `npm run build`; output mengikuti default Next.js.
4. Tambahkan `NEXT_PUBLIC_SITE_URL` berupa origin HTTPS domain final, tanpa path. Konfigurasi ini mengaktifkan canonical dan URL absolut pratinjau. Tambahkan rahasia backend sebagai environment server bila digunakan.
5. Deploy dan periksa rute, URL nama tamu, foto, pratinjau WhatsApp, musik, clipboard, serta kenyamanan scroll pada perangkat sasaran.

Next.js memerlukan runtime server untuk optimasi `next/image` dan integrasi API di masa depan. Proyek tidak memakai static export. Publikasi belum dilakukan dalam implementasi awal ini.

## Referensi teknis

- [Next.js](https://nextjs.org/docs)
- [Motion untuk React](https://motion.dev/docs/react-installation)
- [Tailwind CSS dengan Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs)
