import { Menu, Sparkles } from "lucide-react";

export default function Topbar({ onMenu }) {
  return (
    <header className="topbar">
      <button className="icon-btn" onClick={onMenu}>
        <Menu size={20} />
      </button>

      <div className="brand">
        <Sparkles size={18} />
        <span className="brand-text">CareerBOT</span>
      </div>
    </header>
  );
}
