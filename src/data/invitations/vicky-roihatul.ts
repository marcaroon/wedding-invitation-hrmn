import type { Invitation } from "@/types/invitation";
// import type { Invitation, Photo } from "@/types/invitation";

// const photo = (placeholder: string): Photo => ({
//   src: null,
//   alt: placeholder,
//   placeholder,
// });

export const vickyRoihatul: Invitation = {
  slug: "vicky-roihatul",
  couple: {
    groom: {
      name: "Vicky",
      fullName: "Vicky Ardi Putra Dani",
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
    cover: {
      src: "/couples/vicky-roihatul/cover/cover.webp",
      alt: "Foto sampul Vicky dan Roihatul",
      placeholder: "[Foto Sampul Vicky & Roihatul]",
      position: "50% 100%",
    },
    couple: {
      src: "/couples/vicky-roihatul/couple/couple.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Bersama Vicky & Roihatul]",
      position: "70% 100%",
    },
    story: [
      {
        src: "/couples/vicky-roihatul/gallery/prewed-01.webp",
        alt: "Foto bersama Vicky dan Roihatul",
        placeholder: "[Foto Prewedding Vicky & Roihatul]",
        position: "48% 100%",
      },
      {
        src: "/couples/vicky-roihatul/gallery/prewed-02.webp",
        alt: "Foto bersama Vicky dan Roihatul",
        placeholder: "[Foto Prewedding Vicky & Roihatul]",
        position: "70% 100%",
      },
      {
        src: "/couples/vicky-roihatul/gallery/prewed-03.webp",
        alt: "Foto bersama Vicky dan Roihatul",
        placeholder: "[Foto Prewedding Vicky & Roihatul]",
        position: "50% 100%",
      },
    ],
    interlude: {
      src: "/couples/vicky-roihatul/gallery/sela.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Landscape Vicky & Roihatul]",
      position: "48% 100%",
    },
    closing: {
      src: "/couples/vicky-roihatul/closing/closing.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Prewedding Vicky & Roihatul]",
      position: "57% 100%",
    },
  },
  gallery: [
    {
      src: "/couples/vicky-roihatul/gallery/gallery-1.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Prewedding Vicky & Roihatul]",
      position: "50% 100%",
    },
    {
      src: "/couples/vicky-roihatul/gallery/gallery-2.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Prewedding Vicky & Roihatul]",
      position: "50% 100%",
    },
    {
      src: "/couples/vicky-roihatul/gallery/gallery-3.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Prewedding Vicky & Roihatul]",
      position: "50% 50%",
    },
    {
      src: "/couples/vicky-roihatul/gallery/gallery-4.webp",
      alt: "Foto bersama Vicky dan Roihatul",
      placeholder: "[Foto Prewedding Vicky & Roihatul]",
      position: "50% 100%",
    },
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
  rsvp: { enabled: false, mode: "mock", endpoint: null, maxGuests: 4 },
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
