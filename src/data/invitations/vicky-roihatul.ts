import type { Invitation, Photo } from "@/types/invitation";

const photo = (placeholder: string): Photo => ({
  src: null,
  alt: placeholder,
  placeholder,
});

export const vickyRoihatul: Invitation = {
  slug: "vicky-roihatul",
  couple: {
    groom: {
      name: "Vicky",
      fullName: "[Nama Lengkap Vicky]",
      father: "[Nama Ayah Vicky]",
      mother: "[Nama Ibu Vicky]",
    },
    bride: {
      name: "Roihatul",
      fullName: "[Nama Lengkap Roihatul]",
      father: "[Nama Ayah Roihatul]",
      mother: "[Nama Ibu Roihatul]",
    },
  },
  guest: { defaultName: "Tamu Undangan" },
  opening: {
    heading: "Sebuah awal,\nuntuk selamanya.",
    text: "Dengan penuh kebahagiaan, kami mengundang Anda untuk menjadi bagian dari hari istimewa kami.",
  },
  // Add only a quote or religious verse approved by the couple.
  quote: null,
  date: {
    startsAt: null,
    placeholder: "[Tanggal Pernikahan]",
    timeZone: "Asia/Jakarta",
    zoneLabel: "WIB",
  },
  photos: {
    cover: photo("[Foto Sampul Vicky & Roihatul]"),
    couple: photo("[Foto Bersama Vicky & Roihatul]"),
    story: [
      photo("[Foto Prawedding 01]"),
      photo("[Foto Prawedding 02]"),
      photo("[Foto Prawedding 03]"),
    ],
    interlude: photo("[Foto Prawedding Lanskap]"),
    closing: photo("[Foto Penutup Vicky & Roihatul]"),
  },
  gallery: [
    photo("[Foto Galeri 01]"),
    photo("[Foto Galeri 02]"),
    photo("[Foto Galeri 03]"),
    photo("[Foto Galeri 04]"),
  ],
  events: [
    {
      id: "akad",
      title: "Akad Nikah",
      startsAt: null,
      endsAt: null,
      datePlaceholder: "[Tanggal Akad]",
      timePlaceholder: "[Waktu Akad]",
      venue: "[Lokasi Akad]",
      address: "[Alamat Lokasi Akad]",
      mapsUrl: null,
    },
    {
      id: "resepsi",
      title: "Resepsi",
      startsAt: null,
      endsAt: null,
      datePlaceholder: "[Tanggal Resepsi]",
      timePlaceholder: "[Waktu Resepsi]",
      venue: "[Lokasi Resepsi]",
      address: "[Alamat Lokasi Resepsi]",
      mapsUrl: null,
    },
  ],
  gift: {
    enabled: true,
    accounts: [
      { bank: "[Nama Bank]", holder: "[Nama Pemilik Rekening]", number: null },
    ],
    address: null,
  },
  rsvp: { enabled: true, mode: "mock", endpoint: null, maxGuests: 4 },
  closing:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",
  music: { enabled: false, src: null },
  theme: {
    background: "#f4f0e8",
    foreground: "#292923",
    accent: "#80704b",
    stone: "#ded7c9",
  },
  seo: {
    title: "Undangan Pernikahan Vicky & Roihatul",
    description:
      "Dengan penuh kebahagiaan, Vicky & Roihatul mengundang Anda untuk hadir dan memberikan doa restu di hari pernikahan mereka.",
    ogImage: null,
    indexable: false,
  },
};
