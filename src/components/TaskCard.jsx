function formatDate(dateString) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return 'Date unavailable'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
}

export default function TaskCard({ task, onComplete, onEdit, onDelete }) {
  return <article className={`task-card ${task.completed ? 'is-completed' : ''}`}>
    <button className="completion-button" type="button" onClick={() => onComplete(task.id)} aria-label={task.completed ? `Mark ${task.title} active` : `Complete ${task.title}`} title={task.completed ? 'Mark active' : 'Mark complete'}>{task.completed ? '✓' : ''}</button>
    <div className="task-card-content"><div className="task-title-row"><h3>{task.title}</h3><span className={`priority-badge priority-${task.priority.toLowerCase()}`}><span />{task.priority}</span></div>
      {task.description && <p className="task-description">{task.description}</p>}
      <div className="task-meta"><span className={`category-badge category-${task.category.toLowerCase()}`}>{task.category}</span><span className="meta-dot">·</span><span>Created {formatDate(task.createdAt)}</span>{task.completed && <span className="done-label">✓ Done</span>}</div>
    </div>
    <div className="task-actions"><button type="button" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`} title="Edit task">✎</button><button className="delete-action" type="button" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`} title="Delete task">⌫</button></div>
  </article>
}
