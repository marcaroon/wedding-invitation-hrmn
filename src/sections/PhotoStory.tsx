import { Reveal } from "@/animations/Reveal";
import { StackingPhotos } from "@/animations/StackingPhotos";
import type { Photo } from "@/types/invitation";

export function PhotoStory({ photos }: { photos: Photo[] }) {
  if (!photos.length) return null;
  return (
    <section
      className="story-section section-pad"
      aria-labelledby="story-heading"
    >
      <Reveal className="story-heading">
        <span className="section-index">02 — Tentang kita</span>
        <h2 id="story-heading">
          Hal-hal sederhana.
          <br />
          <em>Kenangan selamanya.</em>
        </h2>
      </Reveal>
      <StackingPhotos photos={photos} />
    </section>
  );
}
