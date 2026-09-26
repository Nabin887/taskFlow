import { useEffect, useState } from 'react'

export default function EditTaskModal({ task, onSave, onClose }) {
  const [form, setForm] = useState({ title: task.title, description: task.description, category: task.category, priority: task.priority })
  const [error, setError] = useState('')

  useEffect(() => {
    function handleKeyDown(event) { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim()) { setError('Task title cannot be empty.'); return }
    onSave({ ...task, ...form, title: form.title.trim(), description: form.description.trim() })
  }

  function updateField(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })) }

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="edit-title"><div className="modal-heading"><div><span className="panel-kicker">MAKE A CHANGE</span><h2 id="edit-title">Edit task</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close">×</button></div><form onSubmit={handleSubmit}>
    <label className="field-label" htmlFor="edit-title-input">Task title</label><input id="edit-title-input" autoFocus className="text-input" name="title" value={form.title} onChange={updateField} maxLength="100" />{error && <p className="validation-message" role="alert">{error}</p>}
    <label className="field-label" htmlFor="edit-description">Description</label><textarea id="edit-description" className="text-input description-input" name="description" value={form.description} onChange={updateField} rows="3" maxLength="300" />
    <div className="form-pair"><div><label className="field-label" htmlFor="edit-category">Category</label><select id="edit-category" className="text-input select-input" name="category" value={form.category} onChange={updateField}><option>Personal</option><option>Work</option><option>Study</option><option>Other</option></select></div><div><label className="field-label" htmlFor="edit-priority">Priority</label><select id="edit-priority" className="text-input select-input" name="priority" value={form.priority} onChange={updateField}><option>Low</option><option>Medium</option><option>High</option></select></div></div>
    <div className="modal-actions"><button className="secondary-button" type="button" onClick={onClose}>Cancel</button><button className="primary-button" type="submit">Save changes</button></div>
  </form></section></div>
}
