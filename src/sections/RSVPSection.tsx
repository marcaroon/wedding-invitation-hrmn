"use client";

import { useRef, useState, type FormEvent } from "react";
import type { Invitation } from "@/types/invitation";
import { useInvitation } from "@/components/invitation/InvitationShell";
import {
  validateRSVP,
  type RSVPInput,
  type RSVPErrors,
} from "@/lib/rsvp/validation";
import { createRSVPService } from "@/services/rsvp";
import { Reveal } from "@/animations/Reveal";

export function RSVPSection({
  config,
  slug,
}: {
  config: Invitation["rsvp"];
  slug: string;
}) {
  const { guest, defaultGuest } = useInvitation();
  const [name, setName] = useState<string | null>(null);
  const [attendance, setAttendance] = useState<RSVPInput["attendance"]>("");
  const [guests, setGuests] = useState(1);
  const [wishes, setWishes] = useState("");
  const [errors, setErrors] = useState<RSVPErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const inFlight = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const displayName = name ?? (guest === defaultGuest ? "" : guest);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;
    const input: RSVPInput = {
      name: displayName,
      attendance,
      guests: attendance === "absent" ? 0 : guests,
      wishes,
    };
    const validation = validateRSVP(input, config.maxGuests);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStatus("idle");
      setMessage("Mohon periksa kembali isian yang ditandai.");
      requestAnimationFrame(() => {
        const field = formRef.current?.querySelector<HTMLElement>(
          '[aria-invalid="true"]',
        );
        if (field?.tagName === "FIELDSET")
          field.querySelector("input")?.focus();
        else field?.focus();
      });
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    setMessage("");
    try {
      const receipt = await createRSVPService(slug, config).submit(input);
      setStatus("success");
      setMessage(
        receipt.mode === "mock"
          ? "Simulasi berhasil. Konfirmasi dan ucapan Anda belum dikirim kepada pasangan."
          : "Terima kasih. Konfirmasi kehadiran dan ucapan Anda telah kami terima.",
      );
    } catch {
      setStatus("error");
      setMessage("Konfirmasi belum berhasil dikirim. Silakan coba kembali.");
    } finally {
      inFlight.current = false;
    }
  }

  if (!config.enabled) return null;
  return (
    <section id="konfirmasi" className="rsvp-section section-pad">
      <Reveal className="rsvp-intro">
        <span className="eyebrow">Kehadiran Anda berarti</span>
        <h2>
          Konfirmasi
          <br />
          <em>Kehadiran</em>
        </h2>
        <p>
          Kami menantikan kehadiran Anda.
          <br />
          Titipkan juga ucapan dan doa untuk perjalanan kami.
        </p>
        <span className="section-index">05 — Ucapan & Doa</span>
      </Reveal>
      <Reveal className="rsvp-form-wrap">
        {config.mode === "mock" && (
          <p className="demo-note" id="rsvp-demo">
            Mode pratinjau — konfirmasi dan ucapan belum dikirim kepada
            pasangan.
          </p>
        )}
        <form
          ref={formRef}
          noValidate
          onSubmit={submit}
          aria-describedby={config.mode === "mock" ? "rsvp-demo" : undefined}
          aria-busy={status === "sending"}
        >
          <fieldset
            disabled={status === "sending" || status === "success"}
            className="form-fields"
          >
            <div className="field">
              <label htmlFor="guest-name">Nama</label>
              <input
                id="guest-name"
                name="name"
                autoComplete="name"
                placeholder="Nama Anda"
                value={displayName}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="field-error">
                  {errors.name}
                </p>
              )}
            </div>
            <fieldset
              className="attendance-field"
              aria-invalid={Boolean(errors.attendance)}
              aria-describedby={
                errors.attendance ? "attendance-error" : undefined
              }
            >
              <legend>Kehadiran</legend>
              <div className="attendance-options">
                {(
                  [
                    { value: "present", label: "Hadir" },
                    { value: "absent", label: "Berhalangan Hadir" },
                  ] as const
                ).map((option) => (
                  <label className="attendance-option" key={option.value}>
                    <input
                      type="radio"
                      name="attendance"
                      value={option.value}
                      checked={attendance === option.value}
                      onChange={() => setAttendance(option.value)}
                      required
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
              {errors.attendance && (
                <p id="attendance-error" className="field-error">
                  {errors.attendance}
                </p>
              )}
            </fieldset>
            {attendance === "present" && (
              <div className="field">
                <label htmlFor="guest-count">
                  Jumlah Tamu{" "}
                  <span className="field-hint">(termasuk Anda)</span>
                </label>
                <select
                  id="guest-count"
                  name="guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  aria-invalid={Boolean(errors.guests)}
                  aria-describedby={errors.guests ? "guests-error" : undefined}
                >
                  {Array.from({ length: config.maxGuests }, (_, index) => (
                    <option key={index} value={index + 1}>
                      {index + 1} orang
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <p id="guests-error" className="field-error">
                    {errors.guests}
                  </p>
                )}
              </div>
            )}
            <div className="field">
              <label htmlFor="wishes">
                Ucapan & Doa <span className="field-hint">(opsional)</span>
              </label>
              <textarea
                id="wishes"
                name="wishes"
                rows={3}
                placeholder="Tuliskan ucapan hangat Anda…"
                value={wishes}
                maxLength={1000}
                onChange={(e) => setWishes(e.target.value)}
                aria-invalid={Boolean(errors.wishes)}
                aria-describedby={errors.wishes ? "wishes-error" : undefined}
              />
              {errors.wishes && (
                <p id="wishes-error" className="field-error">
                  {errors.wishes}
                </p>
              )}
            </div>
            <button className="button button-dark" type="submit">
              {status === "sending" ? "Mengirim..." : "Kirim Konfirmasi"}
              <span aria-hidden="true">↗</span>
            </button>
          </fieldset>
          <div
            role="status"
            aria-live="polite"
            className={`form-feedback ${status === "error" ? "field-error" : ""}`}
          >
            {message}
          </div>
          {status === "success" && config.mode === "mock" && (
            <button
              type="button"
              className="text-link"
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
            >
              Ulangi Simulasi
            </button>
          )}
        </form>
      </Reveal>
    </section>
  );
}
