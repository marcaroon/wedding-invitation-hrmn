export type Attendance = "present" | "absent";
export type RSVPInput = {
  name: string;
  attendance: Attendance | "";
  guests: number;
  wishes: string;
};
export type RSVPErrors = Partial<Record<keyof RSVPInput, string>>;

export function validateRSVP(input: RSVPInput, maxGuests: number): RSVPErrors {
  const errors: RSVPErrors = {};
  if (input.name.trim().length < 2)
    errors.name = "Mohon isi nama Anda, minimal 2 karakter.";
  else if (input.name.trim().length > 100)
    errors.name = "Nama maksimal 100 karakter.";
  if (input.attendance !== "present" && input.attendance !== "absent")
    errors.attendance = "Silakan pilih konfirmasi kehadiran Anda.";
  if (
    input.attendance === "present" &&
    (!Number.isInteger(input.guests) ||
      input.guests < 1 ||
      input.guests > maxGuests)
  ) {
    errors.guests = `Jumlah tamu harus antara 1 dan ${maxGuests} orang.`;
  }
  if (input.wishes.trim().length > 1000)
    errors.wishes = "Ucapan dan doa maksimal 1.000 karakter.";
  return errors;
}
