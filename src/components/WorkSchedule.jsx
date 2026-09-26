const weekdays = [
  { key: 'Mon', label: 'M' }, { key: 'Tue', label: 'T' }, { key: 'Wed', label: 'W' },
  { key: 'Thu', label: 'T' }, { key: 'Fri', label: 'F' }, { key: 'Sat', label: 'S' }, { key: 'Sun', label: 'S' },
]

export const defaultSchedule = {
  enabled: false,
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  startTime: '09:00',
  endTime: '17:00',
  reminderTime: '08:55',
}

export default function WorkSchedule({ schedule, onChange }) {
  const notificationSupported = typeof window !== 'undefined' && 'Notification' in window
  const permissionDenied = notificationSupported && Notification.permission === 'denied'

  function toggleDay(day) {
    const days = schedule.days.includes(day)
      ? schedule.days.filter((item) => item !== day)
      : [...schedule.days, day]
    onChange({ ...schedule, days })
  }

  return <section className="panel schedule-panel">
    <div className="panel-heading schedule-heading"><div><span className="panel-kicker">FIND YOUR FOCUS</span><h2>Work schedule</h2></div><span className="schedule-icon">◷</span></div>
    <p className="schedule-description">Choose your work days and get a nudge when it’s time to begin.</p>
    <span className="field-label">Work days</span>
    <div className="weekday-picker" role="group" aria-label="Select work days">{weekdays.map(({ key, label }) => <button type="button" key={key} className={schedule.days.includes(key) ? 'weekday-button weekday-selected' : 'weekday-button'} onClick={() => toggleDay(key)} aria-label={key} aria-pressed={schedule.days.includes(key)}>{label}</button>)}</div>
    <div className="schedule-time-grid"><label><span className="field-label">Start time</span><input className="text-input" type="time" value={schedule.startTime} onChange={(event) => onChange({ ...schedule, startTime: event.target.value })} /></label><label><span className="field-label">End time</span><input className="text-input" type="time" value={schedule.endTime} onChange={(event) => onChange({ ...schedule, endTime: event.target.value })} /></label></div>
    <label className="schedule-reminder-label"><span className="field-label">Reminder time</span><input className="text-input" type="time" value={schedule.reminderTime} onChange={(event) => onChange({ ...schedule, reminderTime: event.target.value })} /></label>
    <button className={schedule.enabled ? 'schedule-toggle schedule-on' : 'schedule-toggle'} type="button" disabled={!notificationSupported || permissionDenied || schedule.days.length === 0} onClick={() => onChange({ ...schedule, enabled: !schedule.enabled })}><span className="toggle-indicator" />{schedule.enabled ? 'Reminders on' : 'Turn on reminders'}</button>
    <p className="schedule-footnote">{!notificationSupported ? 'Browser notifications aren’t available here.' : permissionDenied ? 'Notifications are blocked. Allow them in your browser site settings.' : schedule.days.length === 0 ? 'Choose at least one work day to enable reminders.' : schedule.enabled ? 'A browser notification will appear at your reminder time.' : 'Allow notifications in your browser when prompted.'}</p>
  </section>
}
