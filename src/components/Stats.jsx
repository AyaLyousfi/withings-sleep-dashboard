export default function Stats() {
  const stats = [
    { value: '2.3min', label: 'Avg. Response Time', sub: 'to guest sleep issues' },
    { value: '↑31%', label: 'Revenue Increase', sub: 'from premium sleep packages' },
    { value: '4.9★', label: 'App Store Rating', sub: 'across hotel partners' },
    { value: '24/7', label: 'Live Monitoring', sub: 'with instant alerts' },
  ]

  return (
    <section style={{
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '3rem 2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '2rem',
      }}>
        {stats.map(({ value, label, sub }, i) => (
          <div key={i} style={{
            textAlign: 'center',
            padding: '1rem',
            borderRight: i < 3 ? '1px solid var(--border)' : 'none',
          }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '2rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '4px',
            }}>{value}</div>
            <div style={{ fontWeight: 500, fontSize: '0.85rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{sub}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          section > div { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
