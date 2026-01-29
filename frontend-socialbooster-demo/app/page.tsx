'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Campaign } from '@/types'
import { getCampaigns, deleteCampaign } from '@/lib/api'

export default function Home() {
  const pathname = usePathname()
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadCampaigns()
  }, [])

  const loadCampaigns = async () => {
    try {
      setLoading(true)
      const data = await getCampaigns()
      setCampaigns(data)
      setError(null)
    } catch (err) {
      setError('Failed to load campaigns. Please check if the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return

    try {
      await deleteCampaign(id)
      await loadCampaigns()
    } catch (err) {
      setError('Failed to delete campaign')
      console.error(err)
    }
  }

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)

  return (
    
    <div className={`dashboard-wrapper ${mounted ? 'mounted' : ''}`}>
      {/* Animated background */}
      <div className="bg-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="container">
        {/* PAGE HEADER */}
        <header className="page-header">
          <div className="header-content">
            <div className="header-badge">Marketing Hub</div>
            <h1 className="header-title">
              Campaign <span className="title-highlight">Tracker</span>
            </h1>
            <p className="header-subtitle">
              Manage your marketing campaigns with ease
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

          <Link
            href="/campaigns/new"
            className={`nav-pill ${pathname === '/campaigns/new' ? 'active' : ''}`}
          >
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
            <p className="loading-text">Loading campaigns...</p>
          </div>
        )}

        {/* CAMPAIGNS LIST */}
        {!loading && campaigns.length > 0 && (
          <>
            <div className="campaigns-header">
              <h2 className="campaigns-title">Your Campaigns</h2>
              <div className="campaigns-actions">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input type="text" placeholder="Search campaigns..." />
                </div>
                <Link href="/campaigns/new" className="button">
                  ✨ Create Campaign
                </Link>
              </div>
            </div>

            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Platform</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((campaign) => (
                    <tr key={campaign.id}>
                      <td>
                        <Link
                          href={`/campaigns/${campaign.id}`}
                          style={{
                            color: 'var(--primary)',
                            textDecoration: 'none',
                            fontWeight: 600
                          }}
                        >
                          {campaign.name}
                        </Link>
                      </td>
                      <td>{campaign.platform}</td>
                      <td>
                        <strong>
                          {formatCurrency(
                            typeof campaign.budget === 'string'
                              ? parseFloat(campaign.budget)
                              : campaign.budget
                          )}
                        </strong>
                      </td>
                      <td>
                        <span className={`badge ${campaign.status.toLowerCase()}`}>
                          {campaign.status}
                        </span>
                      </td>
                      <td>{formatDate(campaign.start_date)}</td>
                      <td>{formatDate(campaign.end_date)}</td>
                      <td>
                        <div className="table-actions">
                          <Link href={`/campaigns/${campaign.id}`}>
                            <button className="button secondary">View</button>
                          </Link>
                          <Link href={`/campaigns/${campaign.id}/edit`}>
                            <button className="button">Edit</button>
                          </Link>
                          <button
                            className="button danger"
                            onClick={() => handleDelete(campaign.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* EMPTY STATE */}
        {!loading && campaigns.length === 0 && !error && (
          <div className="empty-campaigns">
            <div className="empty-icon-large">📋</div>
            <h3>No campaigns found</h3>
            <p>Get started by creating your first marketing campaign</p>
            <Link href="/campaigns/new" className="cta-button">
              Create your first campaign
            </Link>
          </div>
        )}
      </div>
      <style jsx>{`
  .page-header {
    position: relative;
    padding: 4rem 3rem;
    margin-bottom: 3rem;
    background: linear-gradient(135deg, #1A1D29 0%, #2D3142 100%);
    border-radius: 24px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.6);
    color: white;
  }

  .header-badge {
    display: inline-block;
    padding: 6px 14px;
    background: rgba(255,255,255,0.15);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 12px;
  }

  .header-title {
    font-size: 48px;
    font-weight: 800;
    margin: 0;
  }

  .title-highlight {
    background: linear-gradient(135deg, #ff6b9d, #ffa07a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .header-subtitle {
    color: rgba(255,255,255,0.7);
    margin-top: 10px;
  }

  .nav-pills {
    display: flex;
    gap: 12px;
    margin-bottom: 30px;
  }

  .nav-pill {
    padding: 10px 18px;
    background: #1a1d29;
    border-radius: 999px;
    color: white;
    text-decoration: none;
    transition: 0.3s;
  }

  .nav-pill.active {
    background: linear-gradient(135deg, #ff6b9d, #c44569);
  }
`}</style>

    </div>
  )
}
