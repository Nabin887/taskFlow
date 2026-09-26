import { useState } from 'react'

export default function SignUp({ onSignUp }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email to continue.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }
    onSignUp({ name: name.trim(), email: email.trim() })
  }

  return (
    <main className="signup-page">
      <section className="signup-card">
        <a className="brand signup-brand" href="#top"><span className="brand-mark">✓</span><span>taskflow<span className="brand-period">.</span></span></a>
        <div className="signup-art" aria-hidden="true">✳</div>
        <p className="eyebrow">A FRESH START</p>
        <h1>Let’s get to know you.</h1>
        <p className="signup-copy">Add a few details to personalize your TaskFlow workspace.</p>
        <form onSubmit={handleSubmit} noValidate>
          <label className="field-label" htmlFor="signup-name">Your name</label>
          <input id="signup-name" className="text-input" type="text" autoComplete="name" placeholder="e.g. Jamie Doe" value={name} onChange={(event) => setName(event.target.value)} maxLength="80" />
          <label className="field-label" htmlFor="signup-email">Email address</label>
          <input id="signup-email" className="text-input" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} maxLength="120" />
          {error && <p className="validation-message" role="alert">{error}</p>}
          <button className="primary-button signup-button" type="submit">Create my workspace <span>→</span></button>
        </form>
        <p className="signup-note">Your details stay saved in this browser.</p>
      </section>
    </main>
  )
}
