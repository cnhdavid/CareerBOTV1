export default function NavItem({ icon, label }) {
  return (
    <button className="sidebar-item">
      {icon}
      <span className="label">{label}</span>
    </button>
  );
}
