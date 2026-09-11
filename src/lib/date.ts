export function validDate(value: string | null): Date | null {
  if (!value || !/(Z|[+-]\d{2}:\d{2})$/.test(value)) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date : null;
}

export function formatDate(
  value: string | null,
  fallback: string,
  timeZone = "Asia/Jakarta",
): string {
  const date = validDate(value);
  return date
    ? new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone,
      }).format(date)
    : fallback;
}

export function formatTimeRange(
  start: string | null,
  end: string | null,
  fallback: string,
  timeZone = "Asia/Jakarta",
  zoneLabel = "WIB",
): string {
  const date = validDate(start);
  if (!date) return fallback;
  const formatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone,
  });
  const finish = validDate(end);
  return `${formatter.format(date)}${finish ? ` – ${formatter.format(finish)}` : ""} ${zoneLabel}`;
}

export function countdownParts(target: string | null, now: number) {
  const date = validDate(target);
  if (!date) return null;
  const seconds = Math.max(0, Math.floor((date.getTime() - now) / 1000));
  return {
    values: [
      Math.floor(seconds / 86400),
      Math.floor(seconds / 3600) % 24,
      Math.floor(seconds / 60) % 60,
      seconds % 60,
    ],
    complete: date.getTime() <= now,
  };
}
