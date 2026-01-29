'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getCampaign, updateCampaign } from '@/lib/api'
import { Campaign } from '@/types'

export default function EditCampaign() {
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Google Ads',
    budget: '',
    status: 'Active',
    start_date: '',
    end_date: ''
  })

  useEffect(() => {
    if (params.id) {
      loadCampaign()
    }
  }, [params.id])

  const loadCampaign = async () => {
    try {
      setLoading(true)
      const campaign = await getCampaign(Number(params.id))
      setFormData({
        name: campaign.name,
        platform: campaign.platform,
        budget: campaign.budget.toString(),
        status: campaign.status,
        start_date: campaign.start_date,
        end_date: campaign.end_date
      })
      setError(null)
    } catch (err) {
      setError('Failed to load campaign')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      await updateCampaign(Number(params.id), {
        ...formData,
        budget: parseFloat(formData.budget),
        status: formData.status as 'Active' | 'Paused' | 'Completed'
      })
      router.push(`/campaigns/${params.id}`)
    } catch (err: any) {
      setError(err.message || 'Failed to update campaign')
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Loading campaign...</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Edit Campaign</h1>
        <p>Update campaign information</p>
      </div>

      <nav className="nav">
        <Link href="/">Campaigns</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/campaigns/new">New Campaign</Link>
      </nav>

      {error && <div className="error">{error}</div>}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Campaign Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="platform">Platform *</label>
          <select
            id="platform"
            name="platform"
            value={formData.platform}
            onChange={handleChange}
            required
          >
            <option value="Google Ads">Google Ads</option>
            <option value="Meta">Meta</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Twitter">Twitter</option>
            <option value="TikTok">TikTok</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="budget">Budget (USD) *</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date *</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date *</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <Link href={`/campaigns/${params.id}`}>
            <button type="button" className="button secondary">Cancel</button>
          </Link>
          <button type="submit" className="button" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
}
