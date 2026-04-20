import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import LandingPage from './pages/LandingPage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AuthCallback from './pages/AuthCallback.jsx'
import { useTranslation } from './hooks/useTranslation.js'

export default function App() {
  const [theme, setTheme] = useState('light')
  const { t, lang, toggleLang } = useTranslation()

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} t={t} />
      <Routes>
        <Route path="/" element={<LandingPage t={t} lang={lang} />} />
        <Route path="/dashboard" element={<Dashboard t={t} lang={lang} />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </div>
  )
}
