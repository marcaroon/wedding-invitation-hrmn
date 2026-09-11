"use client";

import { motion, useReducedMotion } from "motion/react";
import { useInvitation } from "@/components/invitation/InvitationShell";
import type { ReactNode } from "react";

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const { opened } = useInvitation();
  return (
    <motion.div
      className={className}
      initial={false}
      animate={!opened ? { opacity: 0, y: reduced ? 0 : 24 } : undefined}
      whileInView={opened ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: reduced ? 0 : 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
