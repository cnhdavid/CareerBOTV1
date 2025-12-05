export default function SettingsModal({ theme, setTheme, onClose }) {
  return (
    <div className="settings-modal">

      <h2>Einstellungen</h2>

      <div className="setting-row">
        <label>Theme</label>

        <select value={theme} onChange={e => setTheme(e.target.value)}>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </select>
      </div>

      <button className="close-btn" onClick={onClose}>
        Schließen
      </button>

    </div>
  );
}
