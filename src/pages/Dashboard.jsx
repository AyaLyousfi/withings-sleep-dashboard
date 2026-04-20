import { useState, useEffect } from 'react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const CHART_HEX = {
  deep:  '#5B8E8A',
  rem:   '#C9A84C',
  light: '#8A8BA8',
  awake: '#9E9890',
  score: '#E2C47A',
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, unit, color, sublabel }) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 16,
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>
        {label}
      </span>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '2.8rem',
          fontWeight: 600,
          color: color || 'var(--gold)',
          lineHeight: 1,
        }}>{value}</span>
        {unit && <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{unit}</span>}
      </div>
      {sublabel && <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{sublabel}</span>}
    </div>
  )
}

// ── Score color ───────────────────────────────────────────────
function scoreColor(score) {
  if (score >= 76) return '#5B8E8A'
  if (score >= 60) return '#C9A84C'
  return '#C96B5B'
}

// ── Custom tooltip ────────────────────────────────────────────
function SleepTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: 10,
      padding: '0.75rem 1rem',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '0.8rem',
    }}>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, color: p.color }}>
          <span>{p.name}</span>
          <span style={{ fontWeight: 600 }}>{p.value}{p.dataKey === 'score' ? '' : ' min'}</span>
        </div>
      ))}
    </div>
  )
}

// ── Connection panel ──────────────────────────────────────────
function ConnectionPanel({ onLoadDemo, t }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      gap: '2rem',
      textAlign: 'center',
    }}>
      {/* Icon */}
      <div style={{
        width: 80, height: 80,
        background: 'var(--gold-glow)',
        border: '1px solid var(--gold)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'pulse-glow 3s ease-in-out infinite',
      }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      </div>

      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', color: 'var(--text-primary)', marginBottom: 8 }}>
          {t('dashboard.title')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 420 }}>
          {t('dashboard.connectPrompt')}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: 340 }}>
        <a href={`${API_URL}/auth/login`} style={{
          padding: '14px 32px',
          background: 'linear-gradient(135deg, var(--gold), var(--gold-dark))',
          color: '#fff',
          borderRadius: 10,
          textDecoration: 'none',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.95rem',
          boxShadow: '0 4px 16px var(--gold-glow-strong)',
          transition: 'all 0.25s ease',
          textAlign: 'center',
        }}>
          {t('dashboard.connectWithings')}
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{t('dashboard.demoPrompt').split(' ').slice(0, 1)}</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        <button onClick={onLoadDemo} style={{
          padding: '14px 32px',
          background: 'var(--bg-card)',
          color: 'var(--gold)',
          border: '1px solid var(--gold)',
          borderRadius: 10,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 600,
          fontSize: '0.95rem',
          cursor: 'pointer',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-glow)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-card)' }}
        >
          {t('dashboard.loadDemo')}
        </button>
      </div>
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────
export default function Dashboard({ t }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [range, setRange] = useState(30)
  const [selectedRoom, setSelectedRoom] = useState(0)

  const loadDemo = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/api/demo-data?rooms=8&days=90`)
      const json = await res.json()
      setData(json)
      setSelectedRoom(0)
    } catch {
      // Backend not running — generate minimal inline demo
      setData(generateInlineDemo())
    } finally {
      setLoading(false)
    }
  }

  // Navbar "Synchroniser" button fires this event
  useEffect(() => {
    const handler = () => loadDemo()
    window.addEventListener('sleepiq:sync', handler)
    return () => window.removeEventListener('sleepiq:sync', handler)
  }, [data])

  // Derived data for selected room
  const room = data?.[selectedRoom]
  const nights = room?.nights?.slice(0, range) ?? []

  // Timeline data (score over time)
  const timelineData = [...nights].reverse().map(n => ({
    date: n.date.slice(5),  // MM-DD
    score: n.sleep_score,
    deep: n.deep_sleep_min,
    rem: n.rem_sleep_min,
    light: n.light_sleep_min,
    awake: n.awake_min,
  }))

  // Aggregate stats (last 7 nights)
  const recent = nights.slice(0, 7)
  const avgScore = recent.length ? Math.round(recent.reduce((s, n) => s + n.sleep_score, 0) / recent.length) : 0
  const avgDuration = recent.length ? Math.round(recent.reduce((s, n) => s + n.total_duration_min, 0) / recent.length) : 0
  const avgEfficiency = recent.length ? (recent.reduce((s, n) => s + n.efficiency, 0) / recent.length).toFixed(1) : 0
  const avgHR = recent.length ? Math.round(recent.reduce((s, n) => s + n.heart_rate_avg, 0) / recent.length) : 0

  // Donut data (avg of last 7 nights)
  const avgDeep = recent.length ? Math.round(recent.reduce((s, n) => s + n.deep_sleep_min, 0) / recent.length) : 0
  const avgRem = recent.length ? Math.round(recent.reduce((s, n) => s + n.rem_sleep_min, 0) / recent.length) : 0
  const avgLight = recent.length ? Math.round(recent.reduce((s, n) => s + n.light_sleep_min, 0) / recent.length) : 0
  const avgAwake = recent.length ? Math.round(recent.reduce((s, n) => s + n.awake_min, 0) / recent.length) : 0

  const donutData = [
    { name: t('dashboard.deepSleep'), value: avgDeep, color: CHART_HEX.deep },
    { name: t('dashboard.remSleep'), value: avgRem, color: CHART_HEX.rem },
    { name: t('dashboard.lightSleep'), value: avgLight, color: CHART_HEX.light },
    { name: t('dashboard.awake'), value: avgAwake, color: CHART_HEX.awake },
  ]

  const durationH = Math.floor(avgDuration / 60)
  const durationM = avgDuration % 60

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 72 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
          <ConnectionPanel onLoadDemo={loadDemo} t={t} />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{
          width: 48, height: 48,
          border: '3px solid var(--gold)',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: 72, fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: 'var(--text-primary)', margin: 0 }}>
            {t('dashboard.title')}
          </h1>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {/* Room selector */}
            <select
              value={selectedRoom}
              onChange={e => setSelectedRoom(Number(e.target.value))}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-strong)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
            >
              {data.map((r, i) => (
                <option key={i} value={i}>{t('dashboard.room')} {r.room}</option>
              ))}
            </select>

            {/* Range selector */}
            {[7, 30, 90].map(d => (
              <button key={d} onClick={() => setRange(d)} style={{
                padding: '8px 16px',
                borderRadius: 8,
                border: `1px solid ${range === d ? 'var(--gold)' : 'var(--border-strong)'}`,
                background: range === d ? 'var(--gold-glow)' : 'var(--bg-card)',
                color: range === d ? 'var(--gold)' : 'var(--text-secondary)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.82rem',
                fontWeight: range === d ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                {d}d
              </button>
            ))}

            <button onClick={() => setData(null)} style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid var(--border-strong)',
              background: 'var(--bg-card)',
              color: 'var(--text-muted)',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.82rem',
              cursor: 'pointer',
            }}>
              ← {t('dashboard.connectWithings')}
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          <StatCard label={t('dashboard.sleepScore')} value={avgScore} color={scoreColor(avgScore)} sublabel={`${t('dashboard.room')} ${room?.room}`} />
          <StatCard label={t('dashboard.duration')} value={`${durationH}${t('dashboard.hrs')} ${durationM}`} unit={t('dashboard.mins')} />
          <StatCard label={t('dashboard.efficiency')} value={avgEfficiency} unit="%" />
          <StatCard label={t('dashboard.heartRate')} value={avgHR} unit={t('dashboard.bpm')} />
        </div>

        {/* Charts row: donut + timeline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(400px, 2fr)', gap: '1rem', marginBottom: '1rem' }}>

          {/* Sleep stages donut */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {t('dashboard.sleepStages')}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {donutData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${v} min`} contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
              {donutData.map(d => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 10, height: 10, borderRadius: '50%', background: d.color, display: 'inline-block' }} />
                    <span style={{ color: 'var(--text-secondary)' }}>{d.name}</span>
                  </div>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{d.value} min</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sleep score timeline */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              {t('dashboard.sleepTimeline')}
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={timelineData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_HEX.score} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={CHART_HEX.score} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} interval={Math.floor(timelineData.length / 6)} />
                <YAxis domain={[40, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
                <Tooltip content={<SleepTooltip />} />
                <Area type="monotone" dataKey="score" name={t('dashboard.sleepScore')} stroke={CHART_HEX.score} fill="url(#scoreGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly bar chart */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {t('dashboard.weeklyBreakdown')}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={timelineData.slice(-14)} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <Tooltip content={<SleepTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }} />
              <Bar dataKey="deep" name={t('dashboard.deepSleep')} stackId="a" fill={CHART_HEX.deep} />
              <Bar dataKey="rem" name={t('dashboard.remSleep')} stackId="a" fill={CHART_HEX.rem} />
              <Bar dataKey="light" name={t('dashboard.lightSleep')} stackId="a" fill={CHART_HEX.light} />
              <Bar dataKey="awake" name={t('dashboard.awake')} stackId="a" fill={CHART_HEX.awake} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Room comparison table */}
        <RoomTable data={data} t={t} onSelectRoom={setSelectedRoom} selectedRoom={selectedRoom} />

      </div>
    </div>
  )
}

// ── Room comparison table ─────────────────────────────────────
function RoomTable({ data, t, onSelectRoom, selectedRoom }) {
  const [sortKey, setSortKey] = useState('avg_score')
  const [sortDir, setSortDir] = useState('desc')

  const sorted = [...data].sort((a, b) => {
    const av = sortKey === 'room' ? a.room : a[sortKey]
    const bv = sortKey === 'room' ? b.room : b[sortKey]
    if (sortDir === 'asc') return av > bv ? 1 : -1
    return av < bv ? 1 : -1
  })

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const thStyle = (key) => ({
    padding: '10px 16px',
    textAlign: 'left',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: sortKey === key ? 'var(--gold)' : 'var(--text-muted)',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    borderBottom: '1px solid var(--border)',
    background: 'var(--bg-secondary)',
  })

  const SortArrow = ({ k }) => sortKey !== k ? null : (
    <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  )

  return (
    <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', marginBottom: '2rem' }}>
      <div style={{ padding: '1.5rem 1.5rem 1rem' }}>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--text-primary)', margin: 0 }}>
          {t('dashboard.roomComparison')}
        </h3>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'DM Sans', sans-serif" }}>
          <thead>
            <tr>
              {[
                { key: 'room', label: t('dashboard.room') },
                { key: 'avg_score', label: t('dashboard.avgScore') },
                { key: 'trend', label: t('dashboard.trend') },
                { key: 'last_sync', label: t('dashboard.lastSync') },
              ].map(col => (
                <th key={col.key} style={thStyle(col.key)} onClick={() => toggleSort(col.key)}>
                  {col.label}<SortArrow k={col.key} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((room, i) => {
              const isSelected = data.indexOf(room) === selectedRoom
              return (
                <tr
                  key={room.room}
                  onClick={() => onSelectRoom(data.indexOf(room))}
                  style={{
                    background: isSelected ? 'var(--gold-glow)' : i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-secondary)',
                    cursor: 'pointer',
                    transition: 'background 0.15s',
                    borderLeft: isSelected ? '3px solid var(--gold)' : '3px solid transparent',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'var(--bg-secondary)' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-card)' : 'var(--bg-secondary)' }}
                >
                  <td style={{ padding: '12px 16px', color: 'var(--text-primary)', fontWeight: 600 }}>
                    {t('dashboard.room')} {room.room}
                    <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                      Floor {room.floor}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: scoreColor(room.avg_score),
                    }}>
                      {room.avg_score}
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: scoreColor(room.avg_score),
                        display: 'inline-block',
                      }} />
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: '1.1rem',
                      color: room.trend === 'up' ? '#5B8E8A' : '#C96B5B',
                    }}>
                      {room.trend === 'up' ? '↑' : '↓'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    {room.last_sync}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ── Inline demo fallback (no backend) ────────────────────────
function generateInlineDemo() {
  const today = new Date()
  return Array.from({ length: 8 }, (_, roomIdx) => {
    const base = 65 + Math.floor(Math.random() * 23)
    const nights = Array.from({ length: 90 }, (_, d) => {
      const date = new Date(today)
      date.setDate(today.getDate() - d)
      const score = Math.max(40, Math.min(100, base + (Math.random() - 0.5) * 16))
      const total = Math.round(360 + Math.random() * 120)
      return {
        date: date.toISOString().slice(0, 10),
        room_id: roomIdx + 1,
        sleep_score: Math.round(score),
        total_duration_min: total,
        deep_sleep_min: Math.round(total * (0.15 + Math.random() * 0.10)),
        rem_sleep_min: Math.round(total * (0.18 + Math.random() * 0.10)),
        light_sleep_min: Math.round(total * (0.40 + Math.random() * 0.15)),
        awake_min: Math.round(total * 0.05),
        efficiency: +(82 + Math.random() * 14).toFixed(1),
        heart_rate_avg: Math.round(52 + Math.random() * 12),
        snoring_episodes: Math.floor(Math.random() * 12),
        respiratory_rate: +(14 + Math.random() * 4).toFixed(1),
      }
    })
    const avgScore = nights.reduce((s, n) => s + n.sleep_score, 0) / nights.length
    return {
      room: String(101 + roomIdx),
      floor: Math.floor(roomIdx / 3) + 1,
      avg_score: +avgScore.toFixed(1),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      last_sync: nights[0].date,
      nights,
    }
  })
}
