import TaskCard from './TaskCard.jsx'
import EmptyState from './EmptyState.jsx'

export default function TaskList({ tasks, hasTasks, hasQuery, onComplete, onEdit, onDelete, onCreate }) {
  if (tasks.length === 0) return <EmptyState filtered={hasQuery} hasTasks={hasTasks} onCreate={onCreate} />
  return <div className="task-list">{tasks.map((task) => <TaskCard key={task.id} task={task} onComplete={onComplete} onEdit={onEdit} onDelete={onDelete} />)}</div>
}
