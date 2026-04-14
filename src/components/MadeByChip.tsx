
import Link from "next/link";
import "@/styles/common/made-by-chip.css";

export default function MadeByChip() {
  return (
    <div className="made-by-chip-wrapper">
      <Link href="/" className="made-by-chip">
        <img 
          src="/assets/img/logo-mini.png" 
          alt="sameerasw.com" 
          className="made-by-avatar"
        />
        <span>
          Made by <span className="made-by-domain">sameerasw.com</span>
        </span>
      </Link>
    </div>
  );
}
