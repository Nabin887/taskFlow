const statuses = ['All', 'Active', 'Completed']
const categories = ['All Categories', 'Personal', 'Work', 'Study', 'Other']

export default function FilterBar({ statusFilter, categoryFilter, onStatusChange, onCategoryChange }) {
  return <div className="filter-panel"><div className="filter-topline"><div><span className="panel-kicker">YOUR TASKS</span><h2>Task list</h2></div><span className="filter-label">Filter by</span></div><div className="filter-controls"><div className="status-tabs" role="group" aria-label="Filter by status">{statuses.map((status) => <button type="button" key={status} className={statusFilter === status ? 'status-tab selected' : 'status-tab'} onClick={() => onStatusChange(status)}>{status}</button>)}</div><select className="category-filter" value={categoryFilter} onChange={(event) => onCategoryChange(event.target.value)} aria-label="Filter by category">{categories.map((category) => <option key={category}>{category}</option>)}</select></div></div>
}
