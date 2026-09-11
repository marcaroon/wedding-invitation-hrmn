import type { RSVPInput } from "@/lib/rsvp/validation";
import { validateRSVP } from "@/lib/rsvp/validation";
import type { Invitation } from "@/types/invitation";

export type RSVPReceipt = { mode: "mock" | "api" };
export interface RSVPService {
  submit(input: RSVPInput): Promise<RSVPReceipt>;
}

export function createRSVPService(
  slug: string,
  config: Invitation["rsvp"],
): RSVPService {
  return {
    async submit(input) {
      if (Object.keys(validateRSVP(input, config.maxGuests)).length)
        throw new Error("Data konfirmasi belum lengkap.");
      const payload = {
        invitationSlug: slug,
        name: input.name.trim(),
        attendance: input.attendance,
        guests: input.attendance === "absent" ? 0 : input.guests,
        wishes: input.wishes.trim(),
      };
      if (config.mode === "mock") {
        await new Promise((resolve) => setTimeout(resolve, 700));
        // Intentionally no storage: this is an explicitly labeled demonstration.
        return { mode: "mock" };
      }
      // Use a same-origin server endpoint. Never expose provider credentials in the browser.
      if (
        !config.endpoint?.startsWith("/api/") ||
        config.endpoint.includes("..")
      )
        throw new Error("Layanan konfirmasi belum tersedia.");
      const response = await fetch(config.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok)
        throw new Error(
          "Konfirmasi belum berhasil dikirim. Silakan coba kembali.",
        );
      const receipt: unknown = await response.json();
      if (
        !receipt ||
        typeof receipt !== "object" ||
        !("ok" in receipt) ||
        receipt.ok !== true
      ) {
        throw new Error(
          "Konfirmasi belum berhasil dikirim. Silakan coba kembali.",
        );
      }
      return { mode: "api" };
    },
  };
}
