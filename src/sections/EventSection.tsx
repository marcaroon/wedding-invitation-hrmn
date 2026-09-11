import { Reveal } from "@/animations/Reveal";
import type { Invitation } from "@/types/invitation";
import { formatDate, formatTimeRange } from "@/lib/date";
import { safeExternalUrl } from "@/lib/urls";
import { ArrowUpRight } from "lucide-react";

export function EventSection({ invitation }: { invitation: Invitation }) {
  return (
    <section
      className="events-section section-pad"
      id="acara"
      data-header-tone="light"
    >
      <Reveal className="events-heading">
        {/* <span className="section-index">04 — Hari bahagia</span> */}
        <h2>
          Waktu &<br />
          <em>Tempat</em>
        </h2>
      </Reveal>
      <div className="events-list">
        {invitation.events.map((event) => {
          const mapsUrl = safeExternalUrl(event.mapsUrl);
          return (
            <Reveal key={event.id}>
              <article className="event">
                <div className="event-title">
                  {/* <span className="eyebrow">
                    {String(index + 1).padStart(2, "0")}
                  </span> */}
                  <h3>{event.title}</h3>
                </div>
                <p>
                  {formatDate(
                    event.startsAt,
                    event.datePlaceholder,
                    invitation.date.timeZone,
                  )}
                  <br />
                  <span className="event-time">
                    {formatTimeRange(
                      event.startsAt,
                      event.endsAt,
                      event.timePlaceholder,
                      invitation.date.timeZone,
                      invitation.date.zoneLabel,
                    )}
                  </span>
                </p>
                <div className="event-venue">
                  <h4>{event.venue}</h4>
                  <p>{event.address}</p>
                </div>
                {mapsUrl ? (
                  <a
                    className="text-link"
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lihat lokasi ${event.title}, membuka tab baru`}
                  >
                    Lihat Lokasi{" "}
                    <ArrowUpRight
                      className="ui-arrow"
                      aria-hidden="true"
                      strokeWidth={1.4}
                    />
                  </a>
                ) : (
                  <p className="location-pending">
                    [Tautan Lokasi Belum Tersedia]
                  </p>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
