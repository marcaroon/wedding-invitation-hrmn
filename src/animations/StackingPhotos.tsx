import { Photo } from "@/components/invitation/Photo";
import type { Photo as PhotoData } from "@/types/invitation";

export function StackingPhotos({ photos }: { photos: PhotoData[] }) {
  return (
    <div className="photo-stack">
      {photos.map((photo, index) => (
        <figure
          className="stack-frame"
          key={`${photo.src}-${index}`}
          style={{ top: `calc(4rem + ${index * 12}px)` }}
        >
          <Photo photo={photo} sizes="(max-width: 767px) 88vw, 66vw" />
          <figcaption>
            <span>Dalam setiap momen</span>
            <span>
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(photos.length).padStart(2, "0")}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
