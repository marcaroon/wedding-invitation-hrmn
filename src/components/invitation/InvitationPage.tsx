import type { CSSProperties } from "react";
import type { Invitation } from "@/types/invitation";
import { InvitationShell } from "./InvitationShell";
import { OpeningSection } from "@/sections/OpeningSection";
import { CoupleSection } from "@/sections/CoupleSection";
import { PhotoStory } from "@/sections/PhotoStory";
import { SaveTheDate } from "@/sections/SaveTheDate";
import { EventSection } from "@/sections/EventSection";
import { PhotoInterlude } from "@/sections/PhotoInterlude";
import { FloatingHeader } from "./FloatingHeader";
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
        <FloatingHeader
          groom={invitation.couple.groom.name}
          bride={invitation.couple.bride.name}
          hasGift={invitation.gift.enabled}
          hasGallery={invitation.gallery.length > 0}
        />
        <main>
          <OpeningSection invitation={invitation} />
          <CoupleSection invitation={invitation} />
          <PhotoStory photos={invitation.photos.story} />
          <SaveTheDate date={invitation.date} />
          <EventSection invitation={invitation} />
          <PhotoInterlude photo={invitation.photos.interlude} />
          <WeddingGift gift={invitation.gift} />
          <GallerySection photos={invitation.gallery} />
        </main>
        <ClosingSection invitation={invitation} />
      </InvitationShell>
    </div>
  );
}
