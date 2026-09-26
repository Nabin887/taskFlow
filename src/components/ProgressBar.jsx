export default function ProgressBar({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100)
  return <div className="progress-card"><div className="progress-heading"><div><p className="eyebrow">DAILY PROGRESS</p><strong>{completed} <span>of {total} tasks completed</span></strong></div><span className="progress-percent">{percentage}%</span></div><div className="progress-track" role="progressbar" aria-label="Daily task progress" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${percentage}%` }} /></div></div>
}
