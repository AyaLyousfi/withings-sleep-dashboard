import { useState } from 'react'

const testimonials = [
  {
    quote: "Since deploying SleepIQ across our 120 rooms, our morning satisfaction scores have climbed by 23 points. Guests now specifically mention sleep quality in their reviews.",
    name: "Isabelle Morin",
    role: "Director of Guest Experience",
    hotel: "Le Grand Palais, Paris",
    initials: "IM",
    color: "var(--teal)",
  },
  {
    quote: "The analytics dashboard gave us visibility we never had before. We identified that three floors had HVAC noise issues affecting sleep — fixed in a week, complaints dropped immediately.",
    name: "Ahmed Al-Rashidi",
    role: "General Manager",
    hotel: "Riad Lumière, Marrakech",
    initials: "AA",
    color: "var(--gold)",
  },
  {
    quote: "Our premium sleep package, built on SleepIQ data, now generates 18% of total room revenue. The ROI justified the investment within 60 days.",
    name: "Sofia Andersson",
    role: "VP Revenue Management",
    hotel: "Nordic Signature Hotels",
    initials: "SA",
    color: "var(--lavender)",
  },
]

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <section style={{ padding: '7rem 2rem', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
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
        }}>From Our Partners</div>

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
          fontWeight: 500,
          color: 'var(--text-primary)',
          marginBottom: '4rem',
        }}>Trusted by <span style={{ color: 'var(--gold)' }}>leading hospitality brands</span></h2>

        {/* Quote card */}
        <div style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 40px var(--shadow)',
          position: 'relative',
        }}>
          {/* Gold quote mark */}
          <div style={{
            position: 'absolute', top: '-18px', left: '3rem',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '5rem',
            color: 'var(--gold)',
            lineHeight: 1,
            opacity: 0.6,
          }}>"</div>

          <p style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            fontStyle: 'italic',
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 400,
            marginBottom: '2rem',
          }}>{t.quote}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
            <div style={{
              width: 44, height: 44,
              borderRadius: '50%',
              background: t.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.85rem',
            }}>{t.initials}</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 500, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{t.name}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{t.role} · {t.hotel}</div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 28 : 8,
              height: 8,
              borderRadius: '4px',
              background: i === active ? 'var(--gold)' : 'var(--border-strong)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  )
}
