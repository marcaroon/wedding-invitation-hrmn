"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

export function ParallaxImage({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <div ref={ref} className={`parallax-window ${className}`}>
      <motion.div className="parallax-inner" style={reduced ? {} : { y }}>
        {children}
      </motion.div>
    </div>
  );
}
