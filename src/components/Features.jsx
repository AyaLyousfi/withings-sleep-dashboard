import { Moon, BarChart2, Bell, Thermometer, Users, Shield } from 'lucide-react'
import { useState } from 'react'

const features = [
  {
    icon: Moon,
    title: 'Deep Sleep Tracking',
    desc: 'Monitor all four sleep stages in real-time. Identify patterns that affect guest recovery and morning satisfaction scores.',
    color: 'var(--teal)',
    bg: 'rgba(91,142,138,0.1)',
  },
  {
    icon: BarChart2,
    title: 'Analytics Dashboard',
    desc: 'Hotel-wide reporting with per-room, per-guest, and per-season breakdowns. Export reports instantly for management reviews.',
    color: 'var(--gold)',
    bg: 'var(--gold-glow)',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    desc: 'Receive proactive notifications when a guest experiences disrupted sleep, so your team can respond before they check out unhappy.',
    color: 'var(--lavender)',
    bg: 'rgba(138,139,168,0.1)',
  },
  {
    icon: Thermometer,
    title: 'Environment Correlation',
    desc: 'Link sleep quality to room temperature, noise levels, and light exposure to identify and fix comfort issues at scale.',
    color: 'var(--sage)',
    bg: 'rgba(122,145,117,0.1)',
  },
  {
    icon: Users,
    title: 'Guest Profiles',
    desc: 'Build anonymised sleep preference profiles across return visits. Personalise room preparation before the guest even arrives.',
    color: 'var(--teal-light)',
    bg: 'rgba(122,171,167,0.1)',
  },
  {
    icon: Shield,
    title: 'GDPR Compliant',
    desc: 'Data sovereignty built in. All biometric data is anonymised, locally processed, and guests retain full control of their information.',
    color: 'var(--gold-dark)',
    bg: 'rgba(168,136,58,0.1)',
  },
]

function FeatureCard({ icon: Icon, title, desc, color, bg, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '2rem',
        background: hovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
        border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: '16px',
        cursor: 'default',
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px var(--shadow-md)' : '0 4px 16px var(--shadow)',
        animationDelay: delay,
      }}
      className="animate-fade-up"
    >
      <div style={{
        width: 48, height: 48,
        borderRadius: '12px',
        background: bg,
        border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.2rem',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        <Icon size={22} color={color} />
      </div>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '1.25rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        marginBottom: '0.6rem',
      }}>{title}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
          }}>Platform Capabilities</div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 500,
            color: 'var(--text-primary)',
            marginBottom: '1rem',
          }}>Everything you need to<br />
            <span style={{ color: 'var(--gold)' }}>elevate guest rest</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7, fontWeight: 300 }}>
            A complete suite of tools designed specifically for the hospitality industry, seamlessly integrated with the Withings ecosystem.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem',
        }}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={`${i * 0.1}s`} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #features > div > div:last-child { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #features > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
