"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Photo } from "@/components/invitation/Photo";
import type { Photo as PhotoData } from "@/types/invitation";

function StackingPhoto({
  photo,
  index,
  count,
  progress,
}: {
  photo: PhotoData;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const start = index / Math.max(1, count - 1);
  const end = start + 1 / Math.max(1, count - 1);
  const scale = useTransform(progress, [start, end], [1, 0.95]);
  const opacity = useTransform(progress, [start, end], [1, 0.78]);
  const isLast = index === count - 1;
  return (
    <motion.figure
      className="stack-frame"
      style={{
        top: `calc(6rem + ${index * 12}px)`,
        ...(!reduced && !isLast ? { scale, opacity } : {}),
      }}
    >
      <Photo photo={photo} sizes="(max-width: 767px) 88vw, 66vw" />
      {/* <figcaption>
        <span>Dalam setiap momen</span>
        <span>
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(count).padStart(2, "0")}
        </span>
      </figcaption> */}
    </motion.figure>
  );
}

export function StackingPhotos({ photos }: { photos: PhotoData[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  return (
    <div ref={ref} className="photo-stack">
      {photos.map((photo, index) => (
        <StackingPhoto
          key={`${photo.src}-${index}`}
          photo={photo}
          index={index}
          count={photos.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
