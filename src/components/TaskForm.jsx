import { useState } from 'react'

const initialForm = { title: '', description: '', category: 'Personal', priority: 'Medium' }

export default function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    if (event.target.name === 'title' && event.target.value.trim()) setError('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('Give your task a title to get started.')
      return
    }
    onAddTask({ ...form, title: form.title.trim(), description: form.description.trim() })
    setForm(initialForm)
    setError('')
  }

  return <section className="panel task-form-panel"><div className="panel-heading"><div><span className="panel-kicker">GET IT OUT OF YOUR HEAD</span><h2>Create a task</h2></div><span className="heading-spark">✳</span></div>
    <form onSubmit={handleSubmit} noValidate>
      <label className="field-label" htmlFor="task-title">Task title <span>*</span></label>
      <input id="task-title" className={`text-input ${error ? 'input-error' : ''}`} name="title" value={form.title} onChange={handleChange} placeholder="e.g. Prepare presentation" maxLength="100" />
      {error && <p className="validation-message" role="alert">{error}</p>}
      <label className="field-label" htmlFor="task-description">Description <span className="optional">OPTIONAL</span></label>
      <textarea id="task-description" className="text-input description-input" name="description" value={form.description} onChange={handleChange} placeholder="Add a few details..." rows="3" maxLength="300" />
      <div className="form-pair"><div><label className="field-label" htmlFor="task-category">Category</label><select id="task-category" className="text-input select-input" name="category" value={form.category} onChange={handleChange}><option>Personal</option><option>Work</option><option>Study</option><option>Other</option></select></div><div><label className="field-label" htmlFor="task-priority">Priority</label><select id="task-priority" className="text-input select-input" name="priority" value={form.priority} onChange={handleChange}><option>Low</option><option>Medium</option><option>High</option></select></div></div>
      <button className="primary-button add-button" type="submit"><span>＋</span> Add task</button>
    </form>
  </section>
}
