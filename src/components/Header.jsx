export default function Header({ search, onSearchChange, theme, name, photo, onOpenProfile, onToggleTheme }) {
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  return (
    <header className="topbar">
      <a className="brand" href="#top" aria-label="TaskFlow home"><span className="brand-mark">✓</span><span>taskflow<span className="brand-period">.</span></span></a>
      <div className="header-actions">
        <label className="search-box"><span className="search-icon" aria-hidden="true">⌕</span><input type="search" placeholder="Search your tasks..." value={search} onChange={(event) => onSearchChange(event.target.value)} aria-label="Search tasks" /></label>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? '☾' : '☀'}</button>
        <button className="avatar" type="button" onClick={onOpenProfile} aria-label={`Open ${name}'s profile`} title="Open profile">{photo ? <img src={photo} alt="" /> : initials}</button>
      </div>
    </header>
  )
}
