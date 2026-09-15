export type Photo = {
  src: string | null;
  alt: string;
  placeholder: string;
  position?: string;
};

export type Person = {
  name: string;
  fullName: string;
  father: string;
  mother: string;
};

export type WeddingEvent = {
  id: string;
  title: string;
  /** ISO 8601 with an explicit timezone offset. Null until confirmed. */
  startsAt: string | null;
  endsAt: string | null;
  datePlaceholder: string;
  timePlaceholder: string;
  venue: string;
  address: string;
  mapsUrl: string | null;
};

export type Invitation = {
  slug: string;
  couple: { groom: Person; bride: Person };
  guest: { defaultName: string };
  opening: { heading: string; text: string };
  quote: { text: string; attribution?: string } | null;
  date: {
    startsAt: string | null;
    placeholder: string;
    timeZone: string;
    zoneLabel: string;
  };
  photos: {
    cover: Photo;
    couple: Photo;
    story: Photo[];
    interlude: Photo;
    closing: Photo;
  };
  gallery: Photo[];
  events: WeddingEvent[];
  gift: {
    enabled: boolean;
    accounts: { bank: string; holder: string; number: string | null }[];
    recipient: string | null;
    address: string | null;
  };
  rsvp: {
    enabled: boolean;
    mode: "mock" | "api";
    endpoint: string | null;
    maxGuests: number;
  };
  closing: string;
  music: { enabled: boolean; src: string | null };
  theme: {
    background: string;
    foreground: string;
    accent: string;
    stone: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage: string | null;
    indexable: boolean;
  };
};
