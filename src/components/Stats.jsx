const statItems = [
  { key: 'total', label: 'Total tasks', icon: '▤', tone: 'blue' },
  { key: 'active', label: 'In progress', icon: '◷', tone: 'amber' },
  { key: 'completed', label: 'Completed', icon: '✓', tone: 'green' },
  { key: 'highPriority', label: 'High priority', icon: '↗', tone: 'rose' },
]

export default function Stats({ stats }) {
  return <section className="stats-grid" aria-label="Task statistics">{statItems.map((item) => <article className="stat-card" key={item.key}><div className={`stat-icon ${item.tone}`}>{item.icon}</div><div><p>{item.label}</p><strong>{stats[item.key]}</strong></div><span className="stat-decoration" /></article>)}</section>
}
