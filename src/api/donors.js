// src/api/donors.js
import { API_BASE } from './config'

export async function getDonors(filters = {}) {
  const params = new URLSearchParams()
  if (filters.blood)  params.set('blood',  filters.blood)
  if (filters.union)  params.set('union',  filters.union)
  if (filters.search) params.set('search', filters.search)

  const res = await fetch(`${API_BASE}/donors.php?${params}`)
  if (!res.ok) throw new Error('ডোনার লোড ব্যর্থ')
  return res.json()
}

export async function addDonor(data) {
  const res = await fetch(`${API_BASE}/donors.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'নিবন্ধন ব্যর্থ')
  return json
}
