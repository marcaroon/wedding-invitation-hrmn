import { Photo } from "@/components/invitation/Photo";
import { Reveal } from "@/animations/Reveal";
import type { Invitation } from "@/types/invitation";
import { ArrowUp } from "lucide-react";
import { ParallaxImage } from "@/animations/ParallaxImage";
import { BrandCredit } from "@/components/invitation/BrandCredit";

export function ClosingSection({ invitation }: { invitation: Invitation }) {
  return (
    <footer
      className="closing-section"
      id="penutup"
      data-snap-section
      data-header-tone="dark"
    >
      <ParallaxImage className="closing-background">
        <Photo
          photo={invitation.photos.closing}
          className="closing-photo"
          sizes="100vw"
        />
      </ParallaxImage>
      <div className="closing-shade" />
      <Reveal className="closing-content">
        <span className="eyebrow">Dengan segenap kasih</span>
        <p>{invitation.closing}</p>
        <h2>
          {invitation.couple.groom.name}
          <em>& {invitation.couple.bride.name}</em>
        </h2>
        <span className="closing-thanks">Terima kasih</span>
        <BrandCredit placement="closing" />
      </Reveal>
      <div className="closing-bottom">
        {/* <span>Undangan Pernikahan</span> */}
        <a href="#pembuka">
          Kembali ke awal{" "}
          <ArrowUp className="ui-arrow" aria-hidden="true" strokeWidth={1.4} />
        </a>
      </div>
    </footer>
  );
}
