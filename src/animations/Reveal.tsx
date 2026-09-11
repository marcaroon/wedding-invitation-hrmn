"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useInvitation } from "@/components/invitation/InvitationShell";
import { useRef, type ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "text",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "text" | "image";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduced = useReducedMotion();
  const { opened } = useInvitation();
  const isImage = variant === "image";
  const visible = reduced || (opened && inView);
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible ? 0 : isImage ? 32 : 22,
        ...(isImage
          ? {
              clipPath: visible ? "inset(0% 0% 0% 0%)" : "inset(7% 0% 0% 0%)",
            }
          : {}),
      }}
      transition={{
        duration: reduced ? 0 : isImage ? 1.25 : 0.95,
        delay: reduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
