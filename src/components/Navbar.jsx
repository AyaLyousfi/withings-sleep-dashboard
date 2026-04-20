import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar({ theme, toggleTheme, lang, toggleLang, t }) {
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const onDashboard = location.pathname === '/dashboard'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const anchorLinks = [
    { label: t('nav.features'), href: '#features' },
    { label: t('nav.howItWorks'), href: '#how-it-works' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '0 2rem',
      height: '72px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'var(--nav-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: 38, height: 38,
          background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 12px var(--gold-glow-strong)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 2C5.5 2 2 5.5 2 10C2 14.4 5.5 18 10 18C14.4 18 18 14.4 18 10C18 5.5 14.4 2 10 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
            <path d="M10 5V10L13.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="10" cy="10" r="1.5" fill="white"/>
          </svg>
        </div>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.5rem',
          fontWeight: 600,
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '0.02em',
        }}>
          SleepIQ
        </span>
      </Link>

      {/* Desktop nav — hide anchor links when on dashboard */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="desktop-nav">
        {!onDashboard && anchorLinks.map(link => (
          <a key={link.href} href={link.href} style={{
            color: 'var(--text-secondary)',
            textDecoration: 'none',
            fontSize: '0.9rem',
            fontWeight: 400,
            letterSpacing: '0.01em',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.target.style.color = 'var(--gold)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
          >{link.label}</a>
        ))}

        {/* Dashboard link */}
        <Link to="/dashboard" style={{
          color: onDashboard ? 'var(--gold)' : 'var(--text-secondary)',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: onDashboard ? 600 : 400,
          letterSpacing: '0.01em',
          transition: 'color 0.2s',
          borderBottom: onDashboard ? '1px solid var(--gold)' : '1px solid transparent',
          paddingBottom: '2px',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
        onMouseLeave={e => e.currentTarget.style.color = onDashboard ? 'var(--gold)' : 'var(--text-secondary)'}
        >
          {t('nav.dashboard')}
        </Link>
      </div>

      {/* Right side: lang toggle + theme toggle + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>

        {/* Language toggle pill */}
        <button onClick={toggleLang} style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          border: '1px solid var(--border-strong)',
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'var(--bg-card)',
          cursor: 'pointer',
          padding: 0,
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{
            padding: '6px 10px',
            background: lang === 'en' ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'transparent',
            color: lang === 'en' ? '#fff' : 'var(--text-muted)',
            transition: 'all 0.2s',
          }}>EN</span>
          <span style={{
            padding: '6px 10px',
            background: lang === 'fr' ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'transparent',
            color: lang === 'fr' ? '#fff' : 'var(--text-muted)',
            transition: 'all 0.2s',
          }}>FR</span>
        </button>

        {/* Theme toggle */}
        <button onClick={toggleTheme} style={{
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid var(--border-strong)',
          background: 'var(--bg-card)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* CTA — show "Demander une démo" on landing, "Synchroniser" on dashboard */}
        {onDashboard ? (
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('sleepiq:sync'))}
            style={{
              padding: '9px 22px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              color: '#fff',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              boxShadow: '0 2px 12px var(--gold-glow)',
              transition: 'all 0.25s ease',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px var(--gold-glow-strong)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px var(--gold-glow)' }}
          >
            {t('nav.sync')}
          </button>
        ) : (
          <a href="#contact" style={{
            padding: '9px 22px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.02em',
            boxShadow: '0 2px 12px var(--gold-glow)',
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px var(--gold-glow-strong)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px var(--gold-glow)' }}
          >
            {t('nav.demo')}
          </a>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
