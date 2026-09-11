import { Photo } from "@/components/invitation/Photo";
import { ParallaxImage } from "@/animations/ParallaxImage";
import type { Photo as PhotoData } from "@/types/invitation";

export function PhotoInterlude({ photo }: { photo: PhotoData }) {
  return (
    <div
      className="interlude-scene"
      id="momen"
      data-snap-section
      data-header-tone="photo"
    >
      <div className="interlude-sticky">
        <ParallaxImage>
          <Photo photo={photo} sizes="100vw" />
        </ParallaxImage>
      </div>
    </div>
  );
}
