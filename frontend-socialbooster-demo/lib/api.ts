import axios from 'axios'
import { Campaign } from '@/types'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get('/api/campaigns/')
  // Handle both paginated and non-paginated responses
  return Array.isArray(response.data) ? response.data : (response.data.results || [])
}

export const getCampaign = async (id: number): Promise<Campaign> => {
  const response = await api.get(`/api/campaigns/${id}/`)
  return response.data
}

export const createCampaign = async (campaign: Omit<Campaign, 'id' | 'created_at' | 'updated_at'>): Promise<Campaign> => {
  const response = await api.post('/api/campaigns/', campaign)
  return response.data
}

export const updateCampaign = async (id: number, campaign: Partial<Campaign>): Promise<Campaign> => {
  const response = await api.patch(`/api/campaigns/${id}/`, campaign)
  return response.data
}

export const deleteCampaign = async (id: number): Promise<void> => {
  await api.delete(`/api/campaigns/${id}/`)
}

export const getStats = async () => {
  const response = await api.get('/api/campaigns/stats/')
  return response.data
}

export const convertBudget = async (id: number) => {
  const response = await api.get(`/api/campaigns/${id}/convert_budget/`)
  return response.data
}
