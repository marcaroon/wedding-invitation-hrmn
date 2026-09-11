import Image from "next/image";
import type { Photo as PhotoData } from "@/types/invitation";

export function Photo({
  photo,
  className = "",
  priority = false,
  sizes = "(max-width: 767px) 100vw, 50vw",
}: {
  photo: PhotoData;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`photo ${photo.src ? "" : "photo-empty"} ${className}`}>
      {photo.src ? (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          preload={priority}
          quality={priority ? 85 : 75}
          style={{
            objectFit: "cover",
            objectPosition: photo.position ?? "center",
          }}
        />
      ) : (
        <div className="photo-placeholder">
          <span className="placeholder-rule" />
          <span>{photo.placeholder}</span>
          <span className="placeholder-rule" />
        </div>
      )}
    </div>
  );
}
