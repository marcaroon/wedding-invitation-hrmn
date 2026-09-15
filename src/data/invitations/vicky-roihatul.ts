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
      father: "Aris Dani",
      mother: "Yuyus Kurniyati",
    },
    bride: {
      name: "Roihatul",
      fullName: "Roihatul Jannah",
      father: "Agus Yuliono",
      mother: "Gemi Suharti",
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
    startsAt: "2026-09-20T08:00:00+07:00",
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
      startsAt: "2026-09-20T08:00:00+07:00",
      endsAt: null,
      datePlaceholder: "[Tanggal Akad]",
      timePlaceholder: "[Waktu Akad]",
      venue: "Tawangagung, Ampelgading",
      address: "RT 17 RW 06, Tawangagung, Ampelgading, Kabupaten Malang",
      mapsUrl:
        "https://www.google.com/maps?q=-8.2096697,112.8656407&z=17&hl=en",
    },
    {
      id: "resepsi",
      title: "Resepsi",
      startsAt: "2026-09-20T13:00:00+07:00",
      endsAt: null,
      datePlaceholder: "[Tanggal Resepsi]",
      timePlaceholder: "[Waktu Resepsi]",
      venue: "Tawangagung, Ampelgading",
      address: "RT 17 RW 06, Tawangagung, Ampelgading, Kabupaten Malang",
      mapsUrl:
        "https://www.google.com/maps?q=-8.2096697,112.8656407&z=17&hl=en",
    },
  ],
  gift: {
    enabled: true,
    accounts: [
      { bank: "Aladin", holder: "Roihatul Jannah", number: "50340519993" },
      { bank: "GoPay", holder: "Vicky Ardi", number: "081249812542" },
    ],
    recipient: "Vicky Ardi",
    address: "RT 17 RW 06, Tawangagung, Ampelgading, Kabupaten Malang",
  },
  rsvp: { enabled: false, mode: "mock", endpoint: null, maxGuests: 4 },
  closing:
    "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.",
  music: {
    enabled: true,
    src: "/couples/vicky-roihatul/music/backsound.mp3",
  },
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
