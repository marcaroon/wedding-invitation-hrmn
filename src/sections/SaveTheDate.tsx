import type { Invitation } from "@/types/invitation";
import { formatDate, validDate } from "@/lib/date";
import { Countdown } from "@/components/invitation/Countdown";
import { Reveal } from "@/animations/Reveal";

export function SaveTheDate({ date }: { date: Invitation["date"] }) {
  const parsed = validDate(date.startsAt);
  const numeric = parsed
    ? new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        timeZone: date.timeZone,
      }).formatToParts(parsed)
    : [];
  const dateArt = numeric.length
    ? ["day", "month", "year"]
        .map((part) => numeric.find((item) => item.type === part)?.value)
        .join(".")
    : "— . — . —";
  return (
    <section
      className="date-section section-pad"
      id="tanggal"
      data-snap-section
      data-header-tone="dark"
    >
      <Reveal>
        <span className="eyebrow">Simpan Tanggalnya</span>
        <h2 className="date-art" aria-hidden="true">
          {dateArt}
        </h2>
        <p className="wedding-date">
          {formatDate(date.startsAt, date.placeholder, date.timeZone)}
        </p>
      </Reveal>
      <Reveal>
        <Countdown target={date.startsAt} />
      </Reveal>
    </section>
  );
}
