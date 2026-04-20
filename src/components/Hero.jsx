import { useEffect, useRef } from 'react'
import { ArrowRight, Wifi, Activity } from 'lucide-react'

function SleepChart() {
  const data = [
    { stage: 'Awake', value: 5, color: 'var(--gold-light)' },
    { stage: 'REM', value: 22, color: 'var(--teal-light)' },
    { stage: 'Light', value: 45, color: 'var(--lavender)' },
    { stage: 'Deep', value: 28, color: 'var(--teal)' },
  ]
  const max = 50
  const hours = ['10PM', '12AM', '2AM', '4AM', '6AM', '8AM']

  const wavePath = (offset, amplitude, yBase) => {
    const w = 320
    const points = []
    for (let x = 0; x <= w; x += 4) {
      const y = yBase + Math.sin((x / w) * Math.PI * 4 + offset) * amplitude
              + Math.sin((x / w) * Math.PI * 2 + offset * 0.7) * (amplitude * 0.4)
      points.push(`${x},${y}`)
    }
    return `M 0,80 L ${points.join(' L ')} L ${w},80`
  }

  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '20px',
      padding: '28px',
      boxShadow: '0 20px 60px var(--shadow-md)',
      width: '100%',
      maxWidth: '460px',
      animation: 'float 6s ease-in-out infinite',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>Sleep Quality</div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1 }}>87<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontFamily: "'DM Sans', sans-serif" }}>/100</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px', background: 'rgba(91,142,138,0.12)', borderRadius: '20px', border: '1px solid rgba(91,142,138,0.25)' }}>
            <Activity size={12} color="var(--teal)" />
            <span style={{ fontSize: '0.72rem', color: 'var(--teal)', fontWeight: 500 }}>Live</span>
          </div>
        </div>
      </div>

      {/* Wave SVG */}
      <div style={{ position: 'relative', height: '80px', marginBottom: '16px', overflow: 'hidden', borderRadius: '10px' }}>
        <svg width="100%" height="80" viewBox="0 0 320 80" preserveAspectRatio="none" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5B8E8A" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#5B8E8A" stopOpacity="0.05"/>
            </linearGradient>
            <linearGradient id="wave2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8A8BA8" stopOpacity="0.45"/>
              <stop offset="100%" stopColor="#8A8BA8" stopOpacity="0.03"/>
            </linearGradient>
          </defs>
          <path d={wavePath(0, 18, 38)} fill="url(#wave1)" />
          <path d={wavePath(1.2, 12, 42)} fill="url(#wave2)" />
          {/* Sleep stage line */}
          <polyline
            points="0,60 53,55 106,30 160,20 213,35 267,50 320,58"
            fill="none"
            stroke="var(--gold)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {[53, 106, 160, 213, 267].map((x, i) => (
            <circle key={i} cx={x} cy={[55,30,20,35,50][i]} r="3" fill="var(--gold)" />
          ))}
        </svg>
        {/* time labels */}
        <div style={{ position: 'absolute', bottom: '-18px', left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 2px' }}>
          {hours.map(h => <span key={h} style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>{h}</span>)}
        </div>
      </div>

      {/* Stage bars */}
      <div style={{ marginTop: '28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.map(({ stage, value, color }) => (
          <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '40px', flexShrink: 0 }}>{stage}</span>
            <div style={{ flex: 1, height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(value / max) * 100}%`,
                background: color,
                borderRadius: '3px',
                transition: 'width 1.2s ease',
              }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', width: '28px', textAlign: 'right' }}>{value}%</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
        {[['6h 42m', 'Duration'], ['94%', 'Efficiency'], ['58 bpm', 'Heart Rate']].map(([val, label]) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>{val}</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '100px 2rem 4rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '-8%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, var(--gold-glow) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'breathe 8s ease-in-out infinite',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', right: '-5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(91,142,138,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'breathe 10s ease-in-out infinite 2s',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', right: '35%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(138,139,168,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        animation: 'breathe 12s ease-in-out infinite 4s',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '5rem',
        alignItems: 'center',
      }}>
        {/* Left */}
        <div>
          <div className="animate-fade-up animate-delay-1" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px',
            border: '1px solid var(--gold-glow-strong)',
            borderRadius: '20px',
            background: 'var(--gold-glow)',
            marginBottom: '2rem',
          }}>
            <Wifi size={12} color="var(--gold)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--gold)', fontWeight: 500, letterSpacing: '0.04em' }}>Powered by Withings API</span>
          </div>

          <h1 className="animate-fade-up animate-delay-2" style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
            fontWeight: 500,
            lineHeight: 1.12,
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
          }}>
            Sleep Intelligence<br />
            <span style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold-dark))',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4s linear infinite',
            }}>for Modern Hotels</span>
          </h1>

          <p className="animate-fade-up animate-delay-3" style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.75,
            maxWidth: '460px',
            marginBottom: '2.5rem',
            fontWeight: 300,
          }}>
            Transform guest wellbeing with real-time sleep analytics. Connect Withings devices, monitor rest quality, and deliver personalised experiences that keep guests returning.
          </p>

          <div className="animate-fade-up animate-delay-4" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
              color: '#fff',
              borderRadius: '10px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              boxShadow: '0 4px 20px var(--gold-glow-strong)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px var(--gold-glow-strong)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px var(--gold-glow-strong)' }}
            >
              Book a Demo <ArrowRight size={15} />
            </a>
            <a href="#features" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px',
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
              Explore Features
            </a>
          </div>

          <div className="animate-fade-up animate-delay-5" style={{ marginTop: '3rem', display: 'flex', gap: '2.5rem' }}>
            {[['50+', 'Hotels Connected'], ['98%', 'Guest Satisfaction'], ['3.2M', 'Nights Tracked']].map(([num, label]) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '1.8rem', fontWeight: 600,
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>{num}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '2px' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — chart */}
        <div className="animate-fade-up animate-delay-3" style={{ display: 'flex', justifyContent: 'center' }}>
          <SleepChart />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          section > div { grid-template-columns: 1fr !important; }
          section > div > div:last-child { display: none; }
        }
      `}</style>
    </section>
  )
}
