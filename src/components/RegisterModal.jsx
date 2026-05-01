// src/components/RegisterModal.jsx
import { useState } from 'react'
import { BLOOD_GROUPS, UNIONS } from '../constants'

export default function RegisterModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '', blood: '', union: '', phone: '', lastDonation: ''
  })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.name || !form.blood || !form.union || !form.phone) {
      alert('সব তথ্য পূরণ করুন')
      return
    }
    setLoading(true)
    await onSubmit(form)
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>🩸 ডোনার হিসেবে নিবন্ধন</h2>

        <div className="form-group">
          <label>পূর্ণ নাম</label>
          <input type="text" placeholder="আপনার নাম লিখুন"
            value={form.name} onChange={e => set('name', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>রক্তের গ্রুপ</label>
            <select value={form.blood} onChange={e => set('blood', e.target.value)}>
              <option value="">বেছে নিন</option>
              {BLOOD_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>এলাকা/ইউনিয়ন</label>
            <select value={form.union} onChange={e => set('union', e.target.value)}>
              <option value="">বেছে নিন</option>
              {UNIONS.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>মোবাইল নম্বর</label>
          <input type="tel" placeholder="01XXXXXXXXX"
            value={form.phone} onChange={e => set('phone', e.target.value)} />
        </div>

        <div className="form-group">
          <label>শেষ রক্তদানের তারিখ (থাকলে)</label>
          <input type="date"
            value={form.lastDonation} onChange={e => set('lastDonation', e.target.value)} />
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>বাতিল</button>
          <button className="btn btn-red" onClick={handleSubmit} disabled={loading}>
            {loading ? 'সংরক্ষণ হচ্ছে...' : 'নিবন্ধন করুন'}
          </button>
        </div>
      </div>
    </div>
  )
}
