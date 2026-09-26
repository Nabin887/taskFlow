import { useRef, useState } from 'react'

function getLevel(points) {
  if (points >= 300) return { name: 'Productivity Pro', number: 4, floor: 300, next: null }
  if (points >= 150) return { name: 'Consistent', number: 3, floor: 150, next: 300 }
  if (points >= 50) return { name: 'Focused', number: 2, floor: 50, next: 150 }
  return { name: 'Getting Started', number: 1, floor: 0, next: 50 }
}

export default function ProfileModal({ profile, tasks, onUpdateProfile, onClose }) {
  const fileInput = useRef(null)
  const [imageError, setImageError] = useState('')
  const completedCount = tasks.filter((task) => task.completed).length
  const taskProgress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0
  const points = profile.points || 0
  const level = getLevel(points)
  const levelProgress = level.next ? Math.min(100, ((points - level.floor) / (level.next - level.floor)) * 100) : 100
  const initials = profile.name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()

  function handleImageChange(event) {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setImageError('Choose an image file to update your photo.')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setImageError('Choose an image smaller than 2 MB.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      onUpdateProfile({ ...profile, photo: reader.result })
      setImageError('')
    }
    reader.onerror = () => setImageError('That image could not be loaded. Try another one.')
    reader.readAsDataURL(file)
  }

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <section className="modal-card profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title">
      <div className="modal-heading"><div><span className="panel-kicker">YOUR SPACE</span><h2 id="profile-title">My profile</h2></div><button type="button" className="modal-close" onClick={onClose} aria-label="Close profile">×</button></div>
      <div className="profile-summary">
        <div className="profile-photo-wrap">{profile.photo ? <img className="profile-photo" src={profile.photo} alt={`${profile.name}'s profile`} /> : <div className="profile-photo profile-initials">{initials}</div>}</div>
        <div className="profile-identity"><strong>{profile.name}</strong><span>{profile.email}</span><button className="photo-upload-button" type="button" onClick={() => fileInput.current?.click()}>Upload photo</button><input ref={fileInput} className="visually-hidden" type="file" accept="image/*" onChange={handleImageChange} /></div>
      </div>
      {imageError && <p className="validation-message" role="alert">{imageError}</p>}
      <div className="profile-level-card"><div className="level-icon">{level.number}</div><div className="level-main"><div className="level-title"><div><span className="panel-kicker">CURRENT LEVEL</span><strong>{level.name}</strong></div><span className="level-points">{points} pts</span></div><div className="progress-track"><span style={{ width: `${levelProgress}%` }} /></div><p>{level.next ? `${level.next - points} points to Level ${level.number + 1}` : 'You reached the highest level!'}</p></div></div>
      <section className="profile-progress"><div className="profile-section-title"><h3>Work progress</h3><span>{completedCount} of {tasks.length} tasks</span></div><div className="progress-track"><span style={{ width: `${taskProgress}%` }} /></div><p>{taskProgress}% of your current tasks completed</p></section>
      <div className="points-note"><span>✦</span><p>You earn <strong>10 points</strong> each time you complete a task.</p></div>
    </section>
  </div>
}
