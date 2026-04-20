export default function Footer() {
  const year = new Date().getFullYear()

  const cols = [
    { heading: 'Product', links: ['Features', 'Integrations', 'Pricing', 'Changelog'] },
    { heading: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
    { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'GDPR', 'Cookie Policy'] },
  ]

  return (
    <footer style={{
      background: 'var(--bg-primary)',
      borderTop: '1px solid var(--border)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '4rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, var(--gold-light), var(--gold-dark))',
                borderRadius: '9px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2C5.5 2 2 5.5 2 10C2 14.4 5.5 18 10 18C14.4 18 18 14.4 18 10C18 5.5 14.4 2 10 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                  <path d="M10 5V10L13.5 12" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="10" cy="10" r="1.5" fill="white"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.4rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>SleepIQ</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: '260px', fontWeight: 300 }}>
              Hotel sleep intelligence powered by the Withings ecosystem. Built for the modern hospitality industry.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Powered by <span style={{ color: 'var(--gold)' }}>Withings API</span>
            </p>
          </div>

          {/* Columns */}
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <h4 style={{
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
                marginBottom: '1.2rem',
                fontWeight: 500,
              }}>{heading}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                {links.map(link => (
                  <a key={link} href="#" style={{
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontWeight: 300,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{link}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            © {year} SleepIQ. All rights reserved.
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Crafted with care for the hospitality industry.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 580px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
