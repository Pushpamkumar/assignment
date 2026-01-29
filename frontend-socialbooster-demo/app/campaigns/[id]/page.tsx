'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getCampaign, convertBudget } from '@/lib/api'
import { Campaign } from '@/types'

interface CurrencyConversion {
  campaign_id: number
  campaign_name: string
  original_budget: number
  currency: string
  conversions: Record<string, number>
  exchange_rates: Record<string, number>
}

export default function CampaignDetail() {
  const params = useParams()
  const router = useRouter()
  const [campaign, setCampaign] = useState<Campaign | null>(null)
  const [conversion, setConversion] = useState<CurrencyConversion | null>(null)
  const [loading, setLoading] = useState(true)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      loadCampaign()
    }
  }, [params.id])

  const loadCampaign = async () => {
    try {
      setLoading(true)
      const data = await getCampaign(Number(params.id))
      setCampaign(data)
      setError(null)
    } catch (err) {
      setError('Failed to load campaign')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleConvertBudget = async () => {
    try {
      setConverting(true)
      const data = await convertBudget(Number(params.id))
      setConversion(data)
    } catch (err: any) {
      setError(err.message || 'Failed to convert budget')
    } finally {
      setConverting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading campaign...</div>
      </div>
    )
  }

  if (!campaign) {
    return (
      <div className="container">
        <div className="error">Campaign not found</div>
        <Link href="/">
          <button className="button">Back to Campaigns</button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>{campaign.name}</h1>
        <p>Campaign Details</p>
      </div>

      <nav className="nav">
        <Link href="/">Campaigns</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/campaigns/new">New Campaign</Link>
      </nav>

      {error && <div className="error">{error}</div>}

      <div className="card">
        <h2>Campaign Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
          <div>
            <strong>Platform:</strong>
            <p>{campaign.platform}</p>
          </div>
          <div>
            <strong>Budget:</strong>
            <p>{formatCurrency(typeof campaign.budget === 'string' ? parseFloat(campaign.budget) : campaign.budget)}</p>
          </div>
          <div>
            <strong>Status:</strong>
            <p>
              <span className={`badge ${campaign.status.toLowerCase()}`}>
                {campaign.status}
              </span>
            </p>
          </div>
          <div>
            <strong>Start Date:</strong>
            <p>{formatDate(campaign.start_date)}</p>
          </div>
          <div>
            <strong>End Date:</strong>
            <p>{formatDate(campaign.end_date)}</p>
          </div>
          <div>
            <strong>Created:</strong>
            <p>{formatDate(campaign.created_at)}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Currency Conversion</h2>
        <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
          Convert this campaign's budget to different currencies using live exchange rates.
        </p>
        <button
          className="button"
          onClick={handleConvertBudget}
          disabled={converting}
        >
          {converting ? 'Converting...' : 'Convert Budget'}
        </button>

        {conversion && (
          <div className="currency-converter">
            <h3>Budget Conversions</h3>
            <p style={{ marginBottom: '1rem' }}>
              Original Budget: <strong>{formatCurrency(conversion.original_budget)}</strong>
            </p>
            <div className="currency-grid">
              {Object.entries(conversion.conversions).map(([currency, amount]) => (
                <div key={currency} className="currency-item">
                  <div className="currency-label">{currency}</div>
                  <div className="currency-value">{formatCurrency(amount)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <Link href={`/campaigns/${campaign.id}/edit`}>
          <button className="button">Edit Campaign</button>
        </Link>
        <Link href="/">
          <button className="button secondary">Back to Campaigns</button>
        </Link>
      </div>
    </div>
  )
}
