// src/pages/Home.jsx
import { useState, useEffect } from 'react'
import Hero from '../components/Hero'
import DonorCard from '../components/DonorCard'
import RequestCard from '../components/RequestCard'
import RegisterModal from '../components/RegisterModal'
import RequestModal from '../components/RequestModal'
import { BLOOD_GROUPS, UNIONS } from '../constants'
import { getDonors, addDonor } from '../api/donors'
import { getRequests, addRequest } from '../api/requests'

export default function Home({ showToast }) {
  const [donors,   setDonors]   = useState([])
  const [requests, setRequests] = useState([])
  const [tab,      setTab]      = useState('donors')
  const [modal,    setModal]    = useState(null)
  const [filter,   setFilter]   = useState({ blood: '', union: '' })
  const [search,   setSearch]   = useState('')
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([getDonors(), getRequests()])
      .then(([d, r]) => { setDonors(d); setRequests(r) })
      .catch(() => showToast('ডেটা লোড করতে সমস্যা হয়েছে', 'error'))
      .finally(() => setLoading(false))
  }, [])

  const filteredDonors = donors.filter(d => {
    if (filter.blood && d.blood !== filter.blood) return false
    if (filter.union && d.union_name !== filter.union) return false
    if (search && !d.name.includes(search) && !d.phone.includes(search)) return false
    return true
  })

  const handleCopy = (phone) => {
    navigator.clipboard?.writeText(phone)
    showToast('নম্বর কপি হয়েছে: ' + phone)
  }

  const handleRegister = async (form) => {
    try {
      await addDonor({ ...form, union_name: form.union })
      const updated = await getDonors()
      setDonors(updated)
      setModal(null)
      showToast('✅ সফলভাবে নিবন্ধিত হয়েছেন!')
    } catch (e) {
      showToast(e.message || 'নিবন্ধন ব্যর্থ হয়েছে', 'error')
    }
  }

  const handleRequest = async (form) => {
    try {
      await addRequest({ ...form, req_date: form.date })
      const updated = await getRequests()
      setRequests(updated)
      setModal(null)
      showToast('✅ অনুরোধ পোস্ট করা হয়েছে!')
    } catch (e) {
      showToast(e.message || 'অনুরোধ পাঠাতে সমস্যা হয়েছে', 'error')
    }
  }

  return (
    <>
      <Hero donors={donors} requests={requests} />

      <div className="main-content">
        <div className="tabs">
          <button className={`tab ${tab === 'donors' ? 'active' : ''}`}
            onClick={() => setTab('donors')}>
            🩸 ডোনার তালিকা
          </button>
          <button className={`tab ${tab === 'requests' ? 'active' : ''}`}
            onClick={() => setTab('requests')}>
            🚨 রক্তের অনুরোধ
          </button>
        </div>

        {tab === 'donors' && (
          <div>
            <div className="search-box">
              <div className="form-group">
                <label>রক্তের গ্রুপ</label>
                <select value={filter.blood} onChange={e => setFilter(f => ({ ...f, blood: e.target.value }))}>
                  <option value="">সব গ্রুপ</option>
                  {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>এলাকা/ইউনিয়ন</label>
                <select value={filter.union} onChange={e => setFilter(f => ({ ...f, union: e.target.value }))}>
                  <option value="">সব এলাকা</option>
                  {UNIONS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>নাম / ফোন</label>
                <input type="text" placeholder="খুঁজুন..."
                  value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              <button className="btn btn-red" onClick={() => setModal('register')}>
                + নতুন ডোনার
              </button>
            </div>

            {loading ? (
              <div className="loading"><div className="spinner" /> লোড হচ্ছে...</div>
            ) : filteredDonors.length === 0 ? (
              <div className="empty">
                <div className="icon">😔</div>
                <p>কোনো ডোনার পাওয়া যায়নি</p>
              </div>
            ) : (
              <div className="donor-grid">
                {filteredDonors.map(d => (
                  <DonorCard key={d.id} donor={{ ...d, union: d.union_name }} onCopy={handleCopy} />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'requests' && (
          <div>
            <div className="section-row">
              <div className="section-title">🚨 রক্তের অনুরোধ</div>
              <button className="btn btn-red" onClick={() => setModal('request')}>
                + অনুরোধ করুন
              </button>
            </div>

            {loading ? (
              <div className="loading"><div className="spinner" /> লোড হচ্ছে...</div>
            ) : requests.length === 0 ? (
              <div className="empty">
                <div className="icon">✅</div>
                <p>এই মুহূর্তে কোনো অনুরোধ নেই</p>
              </div>
            ) : (
              <div className="request-list">
                {requests.map(r => (
                  <RequestCard key={r.id} request={{ ...r, date: r.req_date }} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {modal === 'register' && (
        <RegisterModal onClose={() => setModal(null)} onSubmit={handleRegister} />
      )}
      {modal === 'request' && (
        <RequestModal onClose={() => setModal(null)} onSubmit={handleRequest} />
      )}
    </>
  )
}
