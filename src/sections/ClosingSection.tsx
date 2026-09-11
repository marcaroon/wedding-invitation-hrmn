import { Photo } from "@/components/invitation/Photo";
import { Reveal } from "@/animations/Reveal";
import type { Invitation } from "@/types/invitation";

export function ClosingSection({ invitation }: { invitation: Invitation }) {
  return (
    <footer className="closing-section">
      <Photo
        photo={invitation.photos.closing}
        className="closing-photo"
        sizes="100vw"
      />
      <div className="closing-shade" />
      <Reveal className="closing-content">
        <span className="eyebrow">Dengan segenap kasih</span>
        <p>{invitation.closing}</p>
        <h2>
          {invitation.couple.groom.name}
          <em>& {invitation.couple.bride.name}</em>
        </h2>
        <span className="closing-thanks">Terima kasih</span>
      </Reveal>
      <div className="closing-bottom">
        <span>Undangan Pernikahan</span>
        <a href="#pembuka">Kembali ke awal ↑</a>
      </div>
    </footer>
  );
}
