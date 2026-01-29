export interface Campaign {
  id: number
  name: string
  platform: string
  budget: string | number
  status: 'Active' | 'Paused' | 'Completed'
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}
