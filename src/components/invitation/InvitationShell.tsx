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
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useSectionSnap } from "@/hooks/useSectionSnap";
import { BrandCredit } from "./BrandCredit";

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
  const [muted, setMuted] = useState(false);
  const [startingMusic, setStartingMusic] = useState(false);
  const [musicMessage, setMusicMessage] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequested = useRef(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const hasMusic = invitation.music.enabled && Boolean(invitation.music.src);
  const { groom, bride } = invitation.couple;
  useSectionSnap(mainRef, opened);

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
    if (!audioRef.current || playRequested.current) return;
    playRequested.current = true;
    setStartingMusic(true);
    setMusicMessage("");
    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
      setMusicMessage("Musik belum dapat diputar. Silakan coba kembali.");
    } finally {
      playRequested.current = false;
      setStartingMusic(false);
    }
  }

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing || playRequested.current) {
      // Mute without restarting the song when sound is enabled again.
      audio.muted = !audio.muted;
      setMuted(audio.muted);
    } else {
      audio.muted = false;
      setMuted(false);
      if (audio.error) audio.load();
      void playMusic();
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
                  const controls = event.currentTarget.querySelectorAll<HTMLElement>(
                    "button:not([disabled]), a[href]",
                  );
                  const first = controls[0];
                  const last = controls[controls.length - 1];
                  if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last?.focus();
                  } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first?.focus();
                  }
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
                <div className="cover-actions">
                  <button
                    className="button button-ivory cover-button"
                    onClick={openInvitation}
                  >
                    Buka Undangan{" "}
                    <ArrowUpRight
                      className="ui-arrow"
                      aria-hidden="true"
                      strokeWidth={1.4}
                    />
                  </button>
                  <BrandCredit placement="cover" />
                </div>
              </div>
              <noscript>
                <p className="no-script">
                  Aktifkan JavaScript untuk membuka undangan.
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
            onPlaying={() => setPlaying(true)}
            onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
            onError={() => {
              setPlaying(false);
              setStartingMusic(false);
              setMusicMessage(
                "Musik belum dapat diputar. Silakan coba kembali.",
              );
            }}
          />
        )}
        {opened && hasMusic && (
          <div className="music-control">
            <button
              type="button"
              aria-label={
                playing || startingMusic ? "Bisukan musik" : "Putar musik"
              }
              aria-pressed={playing || startingMusic ? muted : undefined}
              title={
                playing || startingMusic
                  ? muted
                    ? "Aktifkan suara"
                    : "Bisukan musik"
                  : "Putar musik"
              }
              onClick={toggleMusic}
            >
              {!muted && (playing || startingMusic) ? (
                <Volume2 size={18} strokeWidth={1.4} aria-hidden="true" />
              ) : (
                <VolumeX size={18} strokeWidth={1.4} aria-hidden="true" />
              )}
            </button>
            <span role="status">{musicMessage}</span>
          </div>
        )}
      </MotionConfig>
    </InvitationContext.Provider>
  );
}
