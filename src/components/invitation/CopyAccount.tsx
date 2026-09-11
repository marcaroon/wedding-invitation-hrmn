"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function CopyAccount({ number }: { number: string | null }) {
  const [message, setMessage] = useState("");
  async function copy() {
    if (!number) return;
    try {
      await navigator.clipboard.writeText(number);
      setMessage("Nomor rekening berhasil disalin");
    } catch {
      setMessage(
        "Nomor rekening belum dapat disalin. Silakan salin secara manual.",
      );
    }
  }
  return (
    <div>
      <button
        className="text-link"
        type="button"
        disabled={!number}
        onClick={copy}
      >
        Salin Nomor Rekening{" "}
        <ArrowUpRight
          className="ui-arrow"
          aria-hidden="true"
          strokeWidth={1.4}
        />
      </button>
      <p className="inline-feedback" role="status">
        {message}
      </p>
    </div>
  );
}
