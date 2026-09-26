export default function EmptyState({ filtered, hasTasks, onCreate }) {
  if (filtered) return <div className="empty-state"><div className="empty-illustration search-empty">⌕</div><h3>No matching tasks</h3><p>Try changing your search or filters to find what you need.</p></div>
  if (hasTasks) return <div className="empty-state"><div className="empty-illustration">✓</div><h3>You’re all caught up</h3><p>Nothing left on this list. Enjoy the breathing room.</p></div>
  return <div className="empty-state"><div className="empty-illustration">✳</div><h3>No tasks yet</h3><p>Create your first task and start organizing your day.</p><button className="primary-button" type="button" onClick={onCreate}>＋ Create task</button></div>
}
