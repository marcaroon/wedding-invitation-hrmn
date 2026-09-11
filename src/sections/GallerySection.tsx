import { Photo } from "@/components/invitation/Photo";
import { Reveal } from "@/animations/Reveal";
import type { Photo as PhotoData } from "@/types/invitation";

export function GallerySection({ photos }: { photos: PhotoData[] }) {
  if (!photos.length) return null;
  return (
    <section className="gallery-section section-pad" id="galeri">
      <Reveal className="gallery-heading">
        <span className="section-index">06 — Galeri</span>
        <h2>
          Yang ingin
          <br />
          <em>kami kenang.</em>
        </h2>
      </Reveal>
      <div className="editorial-gallery">
        {photos.map((photo, index) => (
          <Reveal
            className={`gallery-item gallery-item-${index % 4}`}
            key={`${photo.src}-${index}`}
          >
            <figure>
              <Photo
                photo={photo}
                sizes={
                  index % 4 === 2
                    ? "(max-width: 767px) 88vw, 72vw"
                    : "(max-width: 767px) 70vw, 45vw"
                }
              />
              <figcaption>{String(index + 1).padStart(2, "0")}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
