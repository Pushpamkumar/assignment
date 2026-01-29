'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createCampaign } from '@/lib/api'

export default function NewCampaign() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    platform: 'Google Ads',
    budget: '',
    status: 'Active',
    start_date: '',
    end_date: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await createCampaign({
        ...formData,
        budget: parseFloat(formData.budget),
        status: formData.status as 'Active' | 'Paused' | 'Completed'
      })
      router.push('/')
    } catch (err: any) {
      setError(err.message || 'Failed to create campaign')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          background: #0f1419;
          position: relative;
        }

        .bg-orbs {
          position: fixed;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.08;
          animation: float 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #FF6B9D, #6C5CE7);
          top: -250px;
          right: -150px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #98D8C8, #FFA07A);
          bottom: -200px;
          left: -100px;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          position: relative;
          z-index: 1;
        }

        .page-header {
          position: relative;
          padding: 4rem 3rem;
          margin-bottom: 3rem;
          background: linear-gradient(135deg, #1A1D29 0%, #2D3142 100%);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.6);
        }

        .header-content {
          position: relative;
          z-index: 2;
        }

        .header-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 9999px;
          color: #b4bac7;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
        }

        .header-title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.75rem;
          line-height: 1.2;
          letter-spacing: -0.02em;
          animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
        }

        .title-highlight {
          background: linear-gradient(135deg, #ff7a9d, #ffb3c9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .header-subtitle {
          font-size: 1.125rem;
          color: #b4bac7;
          max-width: 700px;
          margin-bottom: 1.5rem;
          animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
        }

        .header-decoration {
          position: absolute;
          top: 50%;
          right: 3rem;
          transform: translateY(-50%);
          z-index: 1;
          opacity: 0.1;
        }

        .deco-circle {
          width: 200px;
          height: 200px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          position: relative;
          animation: rotate 20s linear infinite;
        }

        @keyframes rotate {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .nav-pills {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
          animation: slideInDown 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .nav-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: linear-gradient(135deg, #1e2741 0%, #252d47 100%);
          color: #e2e8f0;
          border-radius: 9999px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          border: 1.5px solid rgba(255, 255, 255, 0.08);
        }

        .nav-pill:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.12);
        }

        .nav-pill.active {
          background: linear-gradient(135deg, #ff7a9d, #ff8fa8);
          color: #ffffff;
          box-shadow: 0 8px 24px rgba(255, 122, 157, 0.5),
                      0 4px 12px rgba(255, 122, 157, 0.3);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .nav-pill.active:hover {
          box-shadow: 0 10px 30px rgba(255, 122, 157, 0.6),
                      0 6px 16px rgba(255, 122, 157, 0.4);
        }

        .pill-icon {
          font-size: 1.2rem;
        }

        @keyframes slideInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card {
          background: linear-gradient(135deg, #2c3447 0%, #3a4359 100%);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
          margin-bottom: 2rem;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.6s both;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .alert {
          display: flex;
          gap: 1rem;
          padding: 1.25rem;
          border-radius: 16px;
          margin-bottom: 2rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          animation: slideInDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .alert-icon {
          font-size: 1.5rem;
          flex-shrink: 0;
        }

        .alert-content {
          flex: 1;
        }

        .alert-title {
          font-weight: 700;
          color: #FF4757;
          margin-bottom: 0.25rem;
        }

        .alert-message {
          color: #fca5a5;
          font-size: 0.9rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .form-group {
          margin-bottom: 0;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-group label {
          display: block;
          font-weight: 600;
          color: #F9FAFB;
          margin-bottom: 0.5rem;
          font-size: 0.9375rem;
        }

        .form-group input,
        .form-group select {
          width: 100%;
          padding: 0.875rem 1rem;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.1);
          background: #1e2432;
          color: #F9FAFB;
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 1rem;
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #FF6B9D;
          box-shadow: 0 0 0 3px rgba(255, 107, 157, 0.15);
          background: #252c3d;
        }

        .form-group input::placeholder {
          color: #6B7280;
        }

        .form-group select {
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          padding-right: 2.5rem;
        }

        .form-group select option {
          background: #1e2432;
          color: #F9FAFB;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .button {
          padding: 0.875rem 1.75rem;
          border-radius: 9999px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-decoration: none;
        }

        .button.secondary {
          background: linear-gradient(135deg, #6B7280, #4B5563);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(107, 114, 128, 0.3);
        }

        .button.secondary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(107, 114, 128, 0.4);
        }

        .button.primary {
          background: linear-gradient(135deg, #FF6B9D, #C44569);
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(255, 107, 157, 0.3);
        }

        .button.primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255, 107, 157, 0.4);
        }

        .button.primary:active:not(:disabled) {
          transform: translateY(0);
        }

        .button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 768px) {
          .container {
            padding: 1rem;
          }

          .page-header {
            padding: 2.5rem 2rem;
          }

          .header-decoration {
            display: none;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }

          .nav-pills {
            flex-direction: column;
          }

          .nav-pill {
            justify-content: center;
          }
        }
      `}</style>

      <div className="page-wrapper">
        {/* ANIMATED BACKGROUND */}
        <div className="bg-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
        </div>

        <div className="container">
          {/* HEADER */}
          <div className="page-header">
            <div className="header-content">
              <div className="header-badge">MARKETING HUB</div>
              <h1 className="header-title">
                Create New <span className="title-highlight">Campaign</span>
              </h1>
              <p className="header-subtitle">
                Add a new marketing campaign to your portfolio
              </p>
            </div>
            <div className="header-decoration">
              <div className="deco-circle"></div>
            </div>
          </div>

          {/* NAV */}
          <nav className="nav-pills">
            <Link href="/" className="nav-pill">
              <span className="pill-icon">📋</span> Campaigns
            </Link>
            <Link href="/dashboard" className="nav-pill">
              <span className="pill-icon">📊</span> Dashboard
            </Link>
            <Link href="/campaigns/new" className="nav-pill active">
              <span className="pill-icon">✨</span> New Campaign
            </Link>
          </nav>

          {/* FORM */}
          <div className="card">
            {error && (
              <div className="alert">
                <span className="alert-icon">⚠️</span>
                <div className="alert-content">
                  <div className="alert-title">Error</div>
                  <div className="alert-message">{error}</div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="name">Campaign Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Summer Sale 2024"
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
                    placeholder="5000.00"
                    min="0"
                    step="0.01"
                    required
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
              </div>

              <div className="form-actions">
                <Link href="/" className="button secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="button primary"
                >
                  {loading ? '⏳ Creating...' : '✨ Create Campaign'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}