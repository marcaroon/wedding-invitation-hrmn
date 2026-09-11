import test from "node:test";
import assert from "node:assert/strict";
import { guestFromSearch, sanitizeGuestName } from "../src/lib/guest.ts";
import {
  countdownParts,
  formatDate,
  formatTimeRange,
  validDate,
} from "../src/lib/date.ts";
import { validateRSVP } from "../src/lib/rsvp/validation.ts";
import { safeExternalUrl } from "../src/lib/urls.ts";

test("guest names decode once, preserve natural Unicode, and strip markup/control characters", () => {
  assert.equal(guestFromSearch("?to=Bapak%20Ammar"), "Bapak Ammar");
  assert.equal(guestFromSearch("?to=Ibu+Siti"), "Ibu Siti");
  assert.equal(guestFromSearch("?to=100%2525"), "100%25");
  assert.equal(sanitizeGuestName(" <b>Ibu Éka</b>\u202e "), "Ibu Éka");
  assert.equal(guestFromSearch("?to=%20%20"), "Tamu Undangan");
  assert.equal(sanitizeGuestName("A".repeat(120)).length, 100);
  assert.doesNotThrow(() => guestFromSearch("?to=%E0%A4%A"));
});

test("dates and times honor Jakarta timezone and Indonesian formatting", () => {
  // Test fixtures only; these dates are never used as client content.
  assert.equal(
    formatDate("2026-09-20T01:00:00Z", "kosong"),
    "Minggu, 20 September 2026",
  );
  assert.equal(
    formatTimeRange("2026-09-20T01:00:00Z", "2026-09-20T06:00:00Z", "kosong"),
    "08.00 – 13.00 WIB",
  );
  assert.equal(formatDate(null, "[Tanggal Akad]"), "[Tanggal Akad]");
  assert.equal(validDate("2026-09-20T08:00:00"), null);
  assert.equal(validDate("not-a-dateZ"), null);
  assert.equal(countdownParts(null, Date.now()), null);
});

test("countdown handles remaining time and never becomes negative", () => {
  const now = Date.parse("2026-09-19T00:00:00Z");
  assert.deepEqual(countdownParts("2026-09-20T01:02:03Z", now), {
    values: [1, 1, 2, 3],
    complete: false,
  });
  assert.deepEqual(countdownParts("2026-09-18T01:02:03Z", now), {
    values: [0, 0, 0, 0],
    complete: true,
  });
});

test("RSVP rejects incomplete data and bounds guest counts and wishes", () => {
  const valid = {
    name: "Ammar",
    attendance: "present" as const,
    guests: 2,
    wishes: "Selamat berbahagia.",
  };
  assert.deepEqual(validateRSVP(valid, 4), {});
  assert.ok(validateRSVP({ ...valid, name: " " }, 4).name);
  assert.ok(validateRSVP({ ...valid, attendance: "" }, 4).attendance);
  for (const guests of [0, 5, 1.5, NaN])
    assert.ok(validateRSVP({ ...valid, guests }, 4).guests);
  assert.deepEqual(
    validateRSVP({ ...valid, attendance: "absent", guests: 0 }, 4),
    {},
  );
  assert.ok(validateRSVP({ ...valid, wishes: "a".repeat(1001) }, 4).wishes);
});

test("location links accept only valid HTTPS URLs", () => {
  assert.equal(safeExternalUrl(null), null);
  assert.equal(safeExternalUrl("javascript:alert(1)"), null);
  assert.equal(safeExternalUrl("[Tautan Peta]"), null);
  assert.equal(
    safeExternalUrl("https://maps.google.com/"),
    "https://maps.google.com/",
  );
});
