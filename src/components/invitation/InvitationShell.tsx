"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import type { Invitation } from "@/types/invitation";
import { guestFromSearch } from "@/lib/guest";
import { Photo } from "./Photo";

const InvitationContext = createContext({
  opened: false,
  guest: "Tamu Undangan",
  defaultGuest: "Tamu Undangan",
});
export const useInvitation = () => useContext(InvitationContext);

export function InvitationShell({
  invitation,
  children,
}: {
  invitation: Invitation;
  children: ReactNode;
}) {
  const [opened, setOpened] = useState(false);
  const [guest, setGuest] = useState(invitation.guest.defaultName);
  const [playing, setPlaying] = useState(false);
  const [musicMessage, setMusicMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hasMusic = invitation.music.enabled && Boolean(invitation.music.src);
  const { groom, bride } = invitation.couple;

  useEffect(() => {
    const updateGuest = () =>
      setGuest(
        guestFromSearch(window.location.search, invitation.guest.defaultName),
      );
    updateGuest();
    window.addEventListener("popstate", updateGuest);
    return () => window.removeEventListener("popstate", updateGuest);
  }, [invitation.guest.defaultName]);

  useEffect(() => {
    if (opened) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [opened]);

  async function playMusic() {
    if (!audioRef.current) return;
    try {
      await audioRef.current.play();
      setPlaying(true);
      setMusicMessage("");
    } catch {
      setPlaying(false);
      setMusicMessage("Musik belum dapat diputar. Silakan coba kembali.");
    }
  }

  function openInvitation() {
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpened(true);
    if (hasMusic) void playMusic();
  }

  return (
    <InvitationContext.Provider
      value={{ opened, guest, defaultGuest: invitation.guest.defaultName }}
    >
      <MotionConfig reducedMotion="user">
        <AnimatePresence
          onExitComplete={() => mainRef.current?.focus({ preventScroll: true })}
        >
          {!opened && (
            <motion.div
              className="invitation-cover"
              role="dialog"
              aria-modal="true"
              aria-label="Undangan pernikahan"
              key="cover"
              initial={false}
              exit={{ opacity: 0, y: reduced ? 0 : "-7%" }}
              transition={{
                duration: reduced ? 0.15 : 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  event.currentTarget.querySelector("button")?.focus();
                }
              }}
            >
              <Photo
                photo={invitation.photos.cover}
                className="cover-photo"
                priority
                sizes="100vw"
              />
              <div className="cover-shade" />
              <div className="cover-top">
                <span>Undangan Pernikahan</span>
                <span className="cover-monogram" aria-hidden="true">
                  {groom.name[0]} <i>&</i> {bride.name[0]}
                </span>
              </div>
              <div className="cover-title">
                <span className="eyebrow">Dengan penuh kebahagiaan</span>
                <h1>
                  {groom.name}
                  <i>&</i>
                  {bride.name}
                </h1>
              </div>
              <div className="cover-bottom">
                <div className="cover-guest">
                  <p>
                    Kepada Yth.
                    <br />
                    Bapak/Ibu/Saudara/i
                  </p>
                  <p className="guest-name">{guest}</p>
                </div>
                <button
                  className="button button-ivory cover-button"
                  onClick={openInvitation}
                >
                  Buka Undangan <span aria-hidden="true">↗</span>
                </button>
              </div>
              <noscript>
                <p className="no-script">
                  Aktifkan JavaScript untuk membuka undangan dan mengisi
                  konfirmasi kehadiran.
                </p>
              </noscript>
            </motion.div>
          )}
        </AnimatePresence>
        <div
          ref={mainRef}
          tabIndex={-1}
          inert={!opened}
          className="invitation-content"
          aria-label="Isi undangan"
        >
          <a className="skip-link" href="#acara">
            Langsung ke informasi acara
          </a>
          {children}
        </div>
        {hasMusic && (
          <audio
            ref={audioRef}
            src={invitation.music.src!}
            loop
            preload="none"
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
          />
        )}
        {opened && hasMusic && (
          <div className="music-control">
            <button
              type="button"
              aria-label={playing ? "Jeda musik" : "Putar musik"}
              aria-pressed={playing}
              onClick={() => {
                if (playing) audioRef.current?.pause();
                else void playMusic();
              }}
            >
              <span aria-hidden="true">{playing ? "Ⅱ" : "♪"}</span>
            </button>
            <span role="status">{musicMessage}</span>
          </div>
        )}
      </MotionConfig>
    </InvitationContext.Provider>
  );
}
