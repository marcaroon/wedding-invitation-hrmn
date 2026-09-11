import type { Invitation } from "@/types/invitation";
import { Reveal } from "@/animations/Reveal";
import { CopyAccount } from "@/components/invitation/CopyAccount";

export function WeddingGift({ gift }: { gift: Invitation["gift"] }) {
  if (!gift.enabled) return null;
  return (
    <section className="gift-section section-pad" id="hadiah">
      <Reveal className="gift-heading">
        <span className="eyebrow">Tanda kasih</span>
        <h2>
          Hadiah
          <br />
          <em>Pernikahan</em>
        </h2>
        <p>Doa restu Anda merupakan hadiah yang sangat berarti bagi kami.</p>
        <p>
          Namun, apabila memberi merupakan bentuk ungkapan kasih, Anda dapat
          mengirimkan hadiah melalui informasi berikut.
        </p>
      </Reveal>
      <Reveal className="gift-details">
        {gift.accounts.map((account, index) => (
          <div className="gift-account" key={index}>
            <span className="eyebrow">{account.bank}</span>
            <p className="account-number">
              {account.number ?? "[Nomor Rekening]"}
            </p>
            <p className="account-holder">Atas nama {account.holder}</p>
            <CopyAccount number={account.number} />
          </div>
        ))}
        {gift.address && (
          <div className="gift-address">
            <h3>Alamat Pengiriman Hadiah</h3>
            <p>{gift.address}</p>
          </div>
        )}
      </Reveal>
    </section>
  );
}
