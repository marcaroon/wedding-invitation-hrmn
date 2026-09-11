"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useInvitation } from "./InvitationShell";

type HeaderState = { tone: string; active: string };

export function FloatingHeader({
  groom,
  bride,
  hasGift,
  hasGallery,
}: {
  groom: string;
  bride: string;
  hasGift: boolean;
  hasGallery: boolean;
}) {
  const { opened } = useInvitation();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState<HeaderState>({
    tone: "light",
    active: "pembuka",
  });

  useEffect(() => {
    if (!opened) return;
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-tone]"),
    );
    let frame = 0;
    let last: HeaderState | null = null;

    function update() {
      frame = 0;
      const header = ref.current?.getBoundingClientRect();
      const sample = header ? header.top + header.height / 2 : 40;
      const section = sections.find((element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.top <= sample && bounds.bottom > sample;
      });
      const next = {
        tone: section?.dataset.headerTone ?? "light",
        active: section?.id ?? "",
      };
      if (next.tone !== last?.tone || next.active !== last?.active) {
        last = next;
        setCurrent(next);
      }
    }

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
    };
  }, [opened]);

  const links = [
    { id: "acara", label: "Acara" },
    ...(hasGift ? [{ id: "hadiah", label: "Hadiah" }] : []),
    ...(hasGallery ? [{ id: "galeri", label: "Galeri" }] : []),
  ];

  return (
    <motion.header
      ref={ref}
      className="site-header"
      data-tone={current.tone}
      initial={false}
      animate={{ opacity: opened ? 1 : 0, y: opened || reduced ? 0 : -12 }}
      transition={{
        duration: reduced ? 0 : 0.65,
        delay: opened && !reduced ? 0.5 : 0,
      }}
    >
      <a className="wordmark" href="#pembuka" aria-label="Kembali ke pembuka">
        {groom} <i>&</i> {bride}
      </a>
      <nav aria-label="Navigasi undangan">
        {links.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            aria-current={current.active === link.id ? "location" : undefined}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
