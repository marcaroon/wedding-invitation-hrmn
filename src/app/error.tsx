"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="error-page">
      <span className="eyebrow">Undangan Pernikahan</span>
      <h1>Mohon maaf.</h1>
      <p>Undangan belum dapat dimuat. Silakan coba kembali.</p>
      <button className="button button-dark" onClick={reset}>
        Coba Kembali
      </button>
    </main>
  );
}
