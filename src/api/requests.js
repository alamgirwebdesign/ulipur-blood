// src/api/requests.js
import { API_BASE } from './config'

export async function getRequests() {
  const res = await fetch(`${API_BASE}/requests.php`)
  if (!res.ok) throw new Error('অনুরোধ লোড ব্যর্থ')
  return res.json()
}

export async function addRequest(data) {
  const res = await fetch(`${API_BASE}/requests.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'অনুরোধ পাঠাতে ব্যর্থ')
  return json
}
