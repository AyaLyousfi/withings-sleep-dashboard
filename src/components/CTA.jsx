import { ArrowRight, Calendar } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" style={{
      padding: '7rem 2rem',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {/* Glow orb */}
        <div style={{
          width: 200, height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--gold-glow-strong) 0%, transparent 70%)',
          margin: '0 auto -100px',
          pointerEvents: 'none',
        }} />

        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-strong)',
          borderRadius: '24px',
          padding: '4rem 3rem',
          boxShadow: '0 20px 60px var(--shadow-md)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle corner ornament */}
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 200, height: 200,
            background: 'radial-gradient(circle at top right, var(--gold-glow) 0%, transparent 60%)',
          }} />

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px',
            border: '1px solid var(--gold-glow-strong)',
            borderRadius: '20px',
            background: 'var(--gold-glow)',
            marginBottom: '1.5rem',
          }}>
            <Calendar size={12} color="var(--gold)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 500 }}>30-Minute Live Demo</span>
          </div>

          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            lineHeight: 1.2,
          }}>
            Ready to transform<br />
            <span style={{ color: 'var(--gold)' }}>your guest experience?</span>
          </h2>

          <p style={{
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            fontWeight: 300,
            fontSize: '1rem',
          }}>
            Join 50+ hotels already using SleepIQ. Our team will walk you through a live setup with your room configuration and answer every question.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@sleepiq.app" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '15px 32px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              boxShadow: '0 4px 20px var(--gold-glow-strong)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px var(--gold-glow-strong)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px var(--gold-glow-strong)' }}
            >
              Schedule Demo <ArrowRight size={15} />
            </a>
            <a href="mailto:hello@sleepiq.app" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '15px 28px',
              background: 'transparent',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-strong)',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 400,
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-strong)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              Contact Sales
            </a>
          </div>

          <p style={{ marginTop: '1.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            No commitment required · GDPR compliant · Setup in &lt; 4 hours
          </p>
        </div>
      </div>
    </section>
  )
}
