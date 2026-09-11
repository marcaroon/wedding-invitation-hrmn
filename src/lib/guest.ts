/** URLSearchParams already decodes percent escapes. Never decode a second time. */
export function sanitizeGuestName(
  value: string | null | undefined,
  fallback = "Tamu Undangan",
): string {
  const clean = (value ?? "")
    .normalize("NFC")
    .replace(/<[^>]*>/g, "")
    .replace(
      /[<>\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e\u2066-\u2069]/g,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();
  return Array.from(clean).slice(0, 100).join("") || fallback;
}

export function guestFromSearch(
  search: string,
  fallback = "Tamu Undangan",
): string {
  return sanitizeGuestName(new URLSearchParams(search).get("to"), fallback);
}
