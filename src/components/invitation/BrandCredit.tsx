export function BrandCredit({ placement }: { placement: "cover" | "closing" }) {
  return (
    <div className={`brand-credit brand-credit-${placement}`}>
      <span className="brand-credit-label">Undangan oleh</span>
      <span className="brand-credit-name">Harmonia</span>
      <a
        className="brand-credit-instagram"
        href="https://www.instagram.com/harmoniastories/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram Harmonia @harmoniastories, membuka tab baru"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <path d="M17.5 6.5h.01" />
        </svg>
        <span>harmoniastories</span>
      </a>
    </div>
  );
}
