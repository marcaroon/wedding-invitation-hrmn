"use client";

import { useEffect, useState } from "react";
import { countdownParts } from "@/lib/date";

export function Countdown({ target }: { target: string | null }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!target) return;
    const update = () => setNow(Date.now());
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [target]);
  const countdown = now === null ? null : countdownParts(target, now);
  if (countdown?.complete)
    return (
      <p className="countdown-finished">Hari yang kami nantikan telah tiba.</p>
    );
  return (
    <div className="countdown" aria-label="Waktu menuju hari pernikahan">
      {["Hari", "Jam", "Menit", "Detik"].map((label, index) => (
        <div key={label}>
          <span className="countdown-value">
            {countdown ? String(countdown.values[index]).padStart(2, "0") : "—"}
          </span>
          <span className="countdown-label">{label}</span>
        </div>
      ))}
    </div>
  );
}
