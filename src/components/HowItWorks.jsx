import { Cpu, Cloud, LineChart, Sparkles } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Cpu,
    title: 'Connect Withings Devices',
    desc: 'Install Withings Sleep Analyzers in guest rooms. Devices sync automatically via Wi-Fi — no guest interaction required.',
    color: 'var(--teal)',
  },
  {
    number: '02',
    icon: Cloud,
    title: 'Secure Data Pipeline',
    desc: 'Sleep data flows through our anonymisation layer using the Withings OAuth2 API. Guest identity stays protected by design.',
    color: 'var(--gold)',
  },
  {
    number: '03',
    icon: LineChart,
    title: 'Real-Time Analytics',
    desc: 'Your hotel dashboard populates instantly with sleep scores, stage breakdowns, and room-level comparisons.',
    color: 'var(--lavender)',
  },
  {
    number: '04',
    icon: Sparkles,
    title: 'Actionable Insights',
    desc: 'AI-powered recommendations surface daily: adjust room temperature, flag noisy corridors, or offer targeted wellness upgrades.',
    color: 'var(--sage)',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      padding: '7rem 2rem',
      background: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '4px 14px',
            border: '1px solid var(--border-strong)',
            borderRadius: '20px',
            fontSize: '0.72rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '1.2rem',
          }}>Simple Setup</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}>Up and running in<br /><span style={{ color: 'var(--gold)' }}>under one afternoon</span></h2>
        </div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* connector line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '10%', right: '10%',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--border-strong), var(--gold-glow-strong), var(--border-strong), transparent)',
          }} />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2rem',
            position: 'relative',
          }}>
            {steps.map(({ number, icon: Icon, title, desc, color }) => (
              <div key={number} style={{ textAlign: 'center' }}>
                {/* Circle */}
                <div style={{
                  width: 80, height: 80,
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  background: 'var(--bg-card)',
                  border: `1px solid ${color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                  boxShadow: `0 0 0 8px var(--bg-secondary), 0 0 0 9px ${color}20`,
                }}>
                  <Icon size={28} color={color} />
                  <div style={{
                    position: 'absolute',
                    top: -8, right: -8,
                    width: 24, height: 24,
                    borderRadius: '50%',
                    background: color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.6rem',
                    color: '#fff',
                    fontWeight: 600,
                  }}>{number}</div>
                </div>

                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.6rem',
                }}>{title}</h3>
                <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #how-it-works > div > div:last-child > div { grid-template-columns: repeat(2, 1fr) !important; }
          #how-it-works > div > div:last-child > div:first-child { display: none; }
        }
        @media (max-width: 580px) {
          #how-it-works > div > div:last-child > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
