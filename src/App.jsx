import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Stats from './components/Stats.jsx'
import TaskForm from './components/TaskForm.jsx'
import FilterBar from './components/FilterBar.jsx'
import TaskList from './components/TaskList.jsx'
import ProgressBar from './components/ProgressBar.jsx'
import EditTaskModal from './components/EditTaskModal.jsx'
import ConfirmModal from './components/ConfirmModal.jsx'
import SignUp from './components/SignUp.jsx'
import ProfileModal from './components/ProfileModal.jsx'
import WorkSchedule, { defaultSchedule } from './components/WorkSchedule.jsx'

const sampleTasks = [
  { id: 'sample-1', title: 'Complete React assignment', description: 'Finish the task manager project and review the requirements.', category: 'Study', priority: 'High', completed: false, createdAt: new Date().toISOString() },
  { id: 'sample-2', title: 'Go to the gym', description: 'Leg day — remember to bring a water bottle.', category: 'Personal', priority: 'Medium', completed: false, createdAt: new Date().toISOString() },
  { id: 'sample-3', title: 'Finish portfolio website', description: 'Polish the project gallery and check mobile spacing.', category: 'Work', priority: 'High', completed: true, createdAt: new Date().toISOString() },
]

function readStorage(key) {
  try { return localStorage.getItem(key) } catch { return null }
}

function writeStorage(key, value) {
  try { localStorage.setItem(key, value) } catch { /* Storage can be unavailable in restricted browsers. */ }
}

function readStoredTasks() {
  try {
    const saved = readStorage('taskflow-tasks')
    if (saved === null) return sampleTasks
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) && parsed.every((task) => task && typeof task.id === 'string' && typeof task.title === 'string' && typeof task.description === 'string' && typeof task.category === 'string' && typeof task.priority === 'string' && typeof task.completed === 'boolean') ? parsed : sampleTasks
  } catch {
    return sampleTasks
  }
}

function readStoredProfile() {
  try {
    const profile = JSON.parse(readStorage('taskflow-profile'))
    return profile && typeof profile.name === 'string' && typeof profile.email === 'string' ? profile : null
  } catch { return null }
}

function App() {
  const [tasks, setTasks] = useState(readStoredTasks)
  const [profile, setProfile] = useState(readStoredProfile)
  const [theme, setTheme] = useState(() => readStorage('taskflow-theme') || 'light')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [editingTask, setEditingTask] = useState(null)
  const [deletingTask, setDeletingTask] = useState(null)
  const [showProfile, setShowProfile] = useState(false)
  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = JSON.parse(readStorage('taskflow-schedule'))
      return saved && Array.isArray(saved.days) ? { ...defaultSchedule, ...saved } : defaultSchedule
    } catch { return defaultSchedule }
  })

  useEffect(() => {
    writeStorage('taskflow-tasks', JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStorage('taskflow-theme', theme)
  }, [theme])

  useEffect(() => {
    if (profile) writeStorage('taskflow-profile', JSON.stringify(profile))
  }, [profile])

  useEffect(() => {
    writeStorage('taskflow-schedule', JSON.stringify(schedule))
  }, [schedule])

  useEffect(() => {
    if (!schedule.enabled || !('Notification' in window) || Notification.permission !== 'granted') return undefined
    const checkReminder = () => {
      const now = new Date()
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const today = dayNames[now.getDay()]
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
      const reminderKey = `taskflow-reminder-${now.toDateString()}`
      if (schedule.days.includes(today) && currentTime === schedule.reminderTime && readStorage(reminderKey) !== 'sent') {
        new Notification('It’s work time', { body: `Your work day starts at ${schedule.startTime}. Let’s make a little progress.`, tag: 'taskflow-work-reminder' })
        writeStorage(reminderKey, 'sent')
      }
    }
    checkReminder()
    const intervalId = window.setInterval(checkReminder, 15000)
    return () => window.clearInterval(intervalId)
  }, [schedule])

  async function updateSchedule(nextSchedule) {
    if (nextSchedule.enabled && 'Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        setSchedule({ ...nextSchedule, enabled: false })
        return
      }
    }
    setSchedule(nextSchedule)
  }

  const stats = useMemo(() => ({
    total: tasks.length,
    active: tasks.filter((task) => !task.completed).length,
    completed: tasks.filter((task) => task.completed).length,
    highPriority: tasks.filter((task) => task.priority === 'High').length,
  }), [tasks])

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && !task.completed) || (statusFilter === 'Completed' && task.completed)
    const matchesCategory = categoryFilter === 'All Categories' || task.category === categoryFilter
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query)
    return matchesStatus && matchesCategory && matchesSearch
  }), [tasks, statusFilter, categoryFilter, search])

  if (!profile) return <SignUp onSignUp={setProfile} />

  function addTask(taskDetails) {
    setTasks((currentTasks) => [{ ...taskDetails, id: crypto.randomUUID(), completed: false, createdAt: new Date().toISOString() }, ...currentTasks])
  }

  function updateTask(updatedTask) {
    setTasks((currentTasks) => currentTasks.map((task) => task.id === updatedTask.id ? updatedTask : task))
    setEditingTask(null)
  }

  function toggleTask(taskId) {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return
    setTasks((currentTasks) => currentTasks.map((item) => item.id === taskId ? { ...item, completed: !item.completed } : item))
    if (!task.completed) setProfile((current) => ({ ...current, points: (current.points || 0) + 10 }))
  }

  function deleteTask() {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== deletingTask.id))
    setDeletingTask(null)
  }

  return (
    <div className="app-shell">
      <Header search={search} onSearchChange={setSearch} theme={theme} name={profile.name} photo={profile.photo} onOpenProfile={() => setShowProfile(true)} onToggleTheme={() => setTheme((current) => current === 'light' ? 'dark' : 'light')} />
      <main className="main-content">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">YOUR PERSONAL WORKSPACE</p>
            <h1>Welcome, <span>{profile.name.split(' ')[0]}.</span></h1>
            <p className="subtitle">Plan your day. Finish your goals. Stay organized.</p>
          </div>
          <ProgressBar completed={stats.completed} total={stats.total} />
        </section>

        <Stats stats={stats} />

        <div className="workspace-grid">
          <aside className="sidebar-column">
            <TaskForm onAddTask={addTask} />
            <WorkSchedule schedule={schedule} onChange={updateSchedule} />
            <div className="tip-card"><span className="tip-icon">✦</span><div><strong>A little progress adds up</strong><p>Focus on one task at a time. You’ve got this.</p></div></div>
          </aside>
          <section className="tasks-column">
            <FilterBar statusFilter={statusFilter} categoryFilter={categoryFilter} onStatusChange={setStatusFilter} onCategoryChange={setCategoryFilter} />
            <TaskList tasks={filteredTasks} hasTasks={tasks.length > 0} hasQuery={Boolean(search.trim()) || statusFilter !== 'All' || categoryFilter !== 'All Categories'} onComplete={toggleTask} onEdit={setEditingTask} onDelete={setDeletingTask} onCreate={() => document.getElementById('task-title')?.focus()} />
          </section>
        </div>
      </main>
      {editingTask && <EditTaskModal task={editingTask} onSave={updateTask} onClose={() => setEditingTask(null)} />}
      {deletingTask && <ConfirmModal title="Delete this task?" message={`Are you sure you want to delete “${deletingTask.title}”? This action cannot be undone.`} onConfirm={deleteTask} onCancel={() => setDeletingTask(null)} />}
      {showProfile && <ProfileModal profile={profile} tasks={tasks} onUpdateProfile={setProfile} onClose={() => setShowProfile(false)} />}
    </div>
  )
}

export default App
