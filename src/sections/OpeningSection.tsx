import type { Invitation } from "@/types/invitation";
import { Reveal } from "@/animations/Reveal";

export function OpeningSection({ invitation }: { invitation: Invitation }) {
  return (
    <section className="opening section-pad" id="pembuka">
      <Reveal>
        <span className="eyebrow">
          Pernikahan {invitation.couple.groom.name} &{" "}
          {invitation.couple.bride.name}
        </span>
      </Reveal>
      <Reveal delay={0.1}>
        <h2>
          {invitation.opening.heading.split("\n").map((line, index) => (
            <span key={line}>{index === 0 ? line : <em>{line}</em>}</span>
          ))}
        </h2>
      </Reveal>
      <Reveal className="opening-bottom" delay={0.2}>
        <span className="section-index">01 — Awal cerita</span>
        <p>{invitation.opening.text}</p>
        <a
          href="#mempelai"
          className="scroll-cue"
          aria-label="Gulir ke perkenalan mempelai"
        >
          ↓
        </a>
      </Reveal>
      {invitation.quote && (
        <Reveal className="opening-quote">
          <blockquote>
            <p>{invitation.quote.text}</p>
            {invitation.quote.attribution && (
              <cite>{invitation.quote.attribution}</cite>
            )}
          </blockquote>
        </Reveal>
      )}
    </section>
  );
}
