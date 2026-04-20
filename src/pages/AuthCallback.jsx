import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export default function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')

    if (code) {
      // Exchange code for token via backend
      fetch(`${API_URL}/auth/callback?code=${code}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem('withings_connected', 'true')
            navigate('/dashboard')
          } else {
            navigate('/dashboard?auth=error')
          }
        })
        .catch(() => navigate('/dashboard?auth=error'))
    } else {
      navigate('/dashboard?auth=error')
    }
  }, [navigate])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 48,
          height: 48,
          border: '3px solid var(--gold)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 16px',
        }} />
        <p style={{ color: 'var(--text-secondary)' }}>Connecting Withings account…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  )
}
