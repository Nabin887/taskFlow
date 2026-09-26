import { useEffect } from 'react'

export default function ConfirmModal({ title, message, onConfirm, onCancel }) {
  useEffect(() => {
    function handleKeyDown(event) { if (event.key === 'Escape') onCancel() }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onCancel])

  return <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onCancel() }}><section className="modal-card confirm-card" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title"><div className="confirm-icon">!</div><h2 id="confirm-title">{title}</h2><p>{message}</p><div className="modal-actions"><button className="secondary-button" type="button" onClick={onCancel}>Cancel</button><button className="danger-button" type="button" onClick={onConfirm}>Delete task</button></div></section></div>
}
