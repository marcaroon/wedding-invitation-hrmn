"use client";

import { useEffect, type RefObject } from "react";
import { useReducedMotion } from "motion/react";

/** Native proximity snapping; long sections never become snap destinations. */
export function useSectionSnap(
  root: RefObject<HTMLDivElement | null>,
  enabled: boolean,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced || !root.current) return;
    const documentRoot = document.documentElement;
    const sections = Array.from(
      root.current.querySelectorAll<HTMLElement>("[data-snap-section]"),
    );
    let frame = 0;
    let disposed = false;

    function measure() {
      frame = 0;
      if (disposed) return;
      const viewport =
        window.visualViewport?.height ?? documentRoot.clientHeight;
      // Measure layout, not an animated child's transformed bounds.
      const fits = sections.map(
        (section) => section.offsetHeight <= viewport + 2,
      );
      sections.forEach((section, index) => {
        section.toggleAttribute("data-snap-fit", fits[index]);
      });
      documentRoot.dataset.invitationSnap = "proximity";
    }

    function schedule() {
      if (!frame && !disposed) frame = requestAnimationFrame(measure);
    }
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("resize", schedule);
    window.visualViewport?.addEventListener("resize", schedule);
    void document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", schedule);
      window.visualViewport?.removeEventListener("resize", schedule);
      delete documentRoot.dataset.invitationSnap;
      sections.forEach((section) => section.removeAttribute("data-snap-fit"));
    };
  }, [enabled, reduced, root]);
}
