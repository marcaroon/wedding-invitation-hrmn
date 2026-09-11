import { Reveal } from "@/animations/Reveal";
import { Photo } from "@/components/invitation/Photo";
import type { Invitation } from "@/types/invitation";

export function CoupleSection({ invitation }: { invitation: Invitation }) {
  const { groom, bride } = invitation.couple;
  return (
    <section
      id="mempelai"
      className="couple-section section-pad"
      data-header-tone="light"
    >
      <Reveal className="couple-heading">
        <span className="eyebrow">Dua hati, satu perjalanan</span>
        <h2>
          {groom.name}
          <em>& {bride.name}</em>
        </h2>
      </Reveal>
      <Reveal className="couple-photo" variant="image">
        <Photo
          photo={invitation.photos.couple}
          sizes="(max-width: 767px) 88vw, 48vw"
        />
      </Reveal>
      <Reveal className="couple-details">
        <span className="section-index">Kedua mempelai</span>
        <div className="person">
          <h3>{groom.fullName}</h3>
          <p>
            Putra dari
            <br />
            Bapak {groom.father}
            <br />& Ibu {groom.mother}
          </p>
        </div>
        <span className="couple-ampersand" aria-hidden="true">
          &
        </span>
        <div className="person">
          <h3>{bride.fullName}</h3>
          <p>
            Putri dari
            <br />
            Bapak {bride.father}
            <br />& Ibu {bride.mother}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
