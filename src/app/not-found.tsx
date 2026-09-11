import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="error-page">
      <span className="eyebrow">Undangan Pernikahan</span>
      <h1>
        Undangan
        <br />
        <em>tidak ditemukan.</em>
      </h1>
      <p>Silakan periksa kembali tautan undangan Anda.</p>
      <Link className="text-link" href="/">
        Kembali ke awal{" "}
        <ArrowUpRight
          className="ui-arrow"
          aria-hidden="true"
          strokeWidth={1.4}
        />
      </Link>
    </main>
  );
}
