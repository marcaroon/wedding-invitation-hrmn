import Link from "next/link";

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
        Kembali ke awal ↗
      </Link>
    </main>
  );
}
