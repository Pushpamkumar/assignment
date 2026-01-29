'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts'

const COLORS = ['#FF6B9D', '#C44569', '#FFA07A', '#98D8C8', '#6C5CE7']

interface DashboardStats {
  status_counts: Record<string, number>
  platform_budgets: Record<string, number>
  total_budget: number
  total_campaigns: number
}

export default function Dashboard() {
  const pathname = usePathname()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadStats()
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/api/campaigns/stats/`)
      if (!response.ok) throw new Error('Failed to fetch stats')
      const data = await response.json()
      setStats(data)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Failed to load dashboard statistics. Please ensure backend is running.')
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const statusData = stats
    ? Object.entries(stats.status_counts).map(([name, value]) => ({ name, value }))
    : []

  const platformData = stats
    ? Object.entries(stats.platform_budgets).map(([name, value]) => ({
        name,
        value: Number(value)
      }))
    : []

  // Calculate percentages for visual indicators
  const activePercentage = stats 
    ? ((stats.status_counts.Active || 0) / stats.total_campaigns * 100).toFixed(1)
    : '0'

  return (
    <div className={`dashboard-wrapper ${mounted ? 'mounted' : ''}`}>
      {/* Animated background elements */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="container">
        {/* HEADER */}
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-badge">Analytics Hub</div>
            <h1 className="header-title">
              Marketing Campaign
              <span className="title-highlight"> Dashboard</span>
            </h1>
            <p className="header-subtitle">
              Real-time insights and performance metrics at your fingertips
            </p>
          </div>
          <div className="header-decoration">
            <div className="deco-circle"></div>
            <div className="deco-line"></div>
          </div>
        </header>

        {/* NAVIGATION */}
        <nav className="nav-pills">
          <Link href="/" className={`nav-pill ${pathname === '/' ? 'active' : ''}`}>
            <span className="pill-icon">📋</span>
            <span>Campaigns</span>
          </Link>
          <Link href="/dashboard" className={`nav-pill ${pathname === '/dashboard' ? 'active' : ''}`}>
            <span className="pill-icon">📊</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/campaigns/new" className={`nav-pill ${pathname === '/campaigns/new' ? 'active' : ''}`}>
            <span className="pill-icon">✨</span>
            <span>New Campaign</span>
          </Link>
        </nav>

        {/* ERROR */}
        {error && (
          <div className="alert alert-error">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <div className="alert-title">Connection Error</div>
              <div className="alert-message">{error}</div>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <p className="loading-text">Gathering insights...</p>
          </div>
        )}

        {/* DASHBOARD CONTENT */}
        {!loading && stats && (
          <div className="dashboard-content">
            {/* STAT CARDS */}
            <div className="metrics-grid">
              <div className="metric-card card-1">
                <div className="metric-icon-wrapper">
                  <div className="metric-icon">📊</div>
                </div>
                <div className="metric-info">
                  <div className="metric-label">Total Campaigns</div>
                  <div className="metric-value">{stats.total_campaigns.toLocaleString()}</div>
                  <div className="metric-trend">
                    <span className="trend-indicator positive">↗</span>
                    <span className="trend-text">All time</span>
                  </div>
                </div>
                <div className="card-shine"></div>
              </div>

              <div className="metric-card card-2">
                <div className="metric-icon-wrapper">
                  <div className="metric-icon">💰</div>
                </div>
                <div className="metric-info">
                  <div className="metric-label">Total Budget</div>
                  <div className="metric-value">{formatCurrency(stats.total_budget)}</div>
                  <div className="metric-trend">
                    <span className="trend-indicator positive">+12%</span>
                    <span className="trend-text">vs last month</span>
                  </div>
                </div>
                <div className="card-shine"></div>
              </div>

              <div className="metric-card card-3">
                <div className="metric-icon-wrapper">
                  <div className="metric-icon">🚀</div>
                </div>
                <div className="metric-info">
                  <div className="metric-label">Active Campaigns</div>
                  <div className="metric-value">{(stats.status_counts.Active || 0).toLocaleString()}</div>
                  <div className="metric-trend">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: `${activePercentage}%`}}></div>
                    </div>
                    <span className="trend-text">{activePercentage}% active</span>
                  </div>
                </div>
                <div className="card-shine"></div>
              </div>

              <div className="metric-card card-4">
                <div className="metric-icon-wrapper">
                  <div className="metric-icon">🌐</div>
                </div>
                <div className="metric-info">
                  <div className="metric-label">Active Platforms</div>
                  <div className="metric-value">{Object.keys(stats.platform_budgets).length}</div>
                  <div className="metric-trend">
                    <div className="platform-dots">
                      {Object.keys(stats.platform_budgets).slice(0, 4).map((_, i) => (
                        <span key={i} className="platform-dot"></span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="card-shine"></div>
              </div>
            </div>

            {/* CHARTS SECTION */}
            <div className="charts-grid">
              {/* PIE CHART */}
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Campaign Status</h2>
                    <p className="chart-subtitle">Distribution across all campaigns</p>
                  </div>
                  <div className="chart-badge">Live Data</div>
                </div>
                
                {statusData.length ? (
                  <div className="chart-content">
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart>
                        <Pie
                          data={statusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={110}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {statusData.map((_, index) => (
                            <Cell 
                              key={index} 
                              fill={COLORS[index % COLORS.length]}
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    
                    <div className="chart-legend">
                      {statusData.map((item, index) => (
                        <div key={item.name} className="legend-item">
                          <span 
                            className="legend-dot" 
                            style={{background: COLORS[index % COLORS.length]}}
                          ></span>
                          <span className="legend-label">{item.name}</span>
                          <span className="legend-value">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">📊</div>
                    <p>No status data available</p>
                  </div>
                )}
              </div>

              {/* BAR CHART */}
              <div className="chart-card">
                <div className="chart-header">
                  <div>
                    <h2 className="chart-title">Platform Investment</h2>
                    <p className="chart-subtitle">Budget allocation breakdown</p>
                  </div>
                  <div className="chart-badge">USD</div>
                </div>
                
                {platformData.length ? (
                  <div className="chart-content">
                    <ResponsiveContainer width="100%" height={320}>
                      <BarChart data={platformData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                        <defs>
                          <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#FF6B9D" stopOpacity={0.8}/>
                            <stop offset="100%" stopColor="#C44569" stopOpacity={0.95}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                          axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <YAxis 
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          tick={{ fill: '#6B7280', fontSize: 12 }}
                          axisLine={{ stroke: '#E5E7EB' }}
                        />
                        <Tooltip 
                          formatter={(v: number) => formatCurrency(v)}
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                          }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="url(#barGradient)" 
                          radius={[8, 8, 0, 0]}
                          name="Budget"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="empty-state">
                    <div className="empty-icon">💰</div>
                    <p>No platform data available</p>
                  </div>
                )}
              </div>
            </div>

            {/* INSIGHTS SECTION */}
            <div className="insights-section">
              <h2 className="section-title">Quick Insights</h2>
              <div className="insights-grid">
                <div className="insight-card">
                  <div className="insight-icon">🎯</div>
                  <div className="insight-text">
                    <strong>Top Performing:</strong> Your campaigns show strong engagement
                    across {Object.keys(stats.platform_budgets).length} platforms
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">💡</div>
                  <div className="insight-text">
                    <strong>Recommendation:</strong> Consider reallocating budget from
                    lower-performing platforms
                  </div>
                </div>
                <div className="insight-card">
                  <div className="insight-icon">📈</div>
                  <div className="insight-text">
                    <strong>Growth Trend:</strong> Campaign activity is up compared to
                    previous periods
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !stats && (
          <div className="empty-dashboard">
            <div className="empty-icon-large">📊</div>
            <h3>No Data Available</h3>
            <p>Start creating campaigns to see your dashboard come to life</p>
            <Link href="/campaigns/new" className="cta-button">
              Create Your First Campaign
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}