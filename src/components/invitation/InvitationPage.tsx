import type { CSSProperties } from "react";
import type { Invitation } from "@/types/invitation";
import { InvitationShell } from "./InvitationShell";
import { OpeningSection } from "@/sections/OpeningSection";
import { CoupleSection } from "@/sections/CoupleSection";
import { PhotoStory } from "@/sections/PhotoStory";
import { SaveTheDate } from "@/sections/SaveTheDate";
import { EventSection } from "@/sections/EventSection";
import { PhotoInterlude } from "@/sections/PhotoInterlude";
import { RSVPSection } from "@/sections/RSVPSection";
import { WeddingGift } from "@/sections/WeddingGift";
import { GallerySection } from "@/sections/GallerySection";
import { ClosingSection } from "@/sections/ClosingSection";

export function InvitationPage({ invitation }: { invitation: Invitation }) {
  const theme = {
    "--ivory": invitation.theme.background,
    "--ink": invitation.theme.foreground,
    "--gold": invitation.theme.accent,
    "--stone": invitation.theme.stone,
  } as CSSProperties;
  return (
    <div className="invitation" style={theme}>
      <InvitationShell invitation={invitation}>
        <header className="site-header">
          <a
            className="wordmark"
            href="#pembuka"
            aria-label="Kembali ke pembuka"
          >
            {invitation.couple.groom.name} <i>&</i>{" "}
            {invitation.couple.bride.name}
          </a>
          <nav aria-label="Navigasi undangan">
            <a href="#acara">Acara</a>
            <a href="#galeri">Galeri</a>
            {invitation.rsvp.enabled && <a href="#konfirmasi">Konfirmasi</a>}
          </nav>
        </header>
        <main>
          <OpeningSection invitation={invitation} />
          <CoupleSection invitation={invitation} />
          <PhotoStory photos={invitation.photos.story} />
          <SaveTheDate date={invitation.date} />
          <EventSection invitation={invitation} />
          <PhotoInterlude photo={invitation.photos.interlude} />
          <RSVPSection slug={invitation.slug} config={invitation.rsvp} />
          <WeddingGift gift={invitation.gift} />
          <GallerySection photos={invitation.gallery} />
        </main>
        <ClosingSection invitation={invitation} />
      </InvitationShell>
    </div>
  );
}
