// src/components/RequestModal.jsx
import { useState } from 'react'
import { BLOOD_GROUPS } from '../constants'

export default function RequestModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    patient: '', blood: '', bags: 1, hospital: '', phone: '', date: '', urgent: true
  })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    if (!form.patient || !form.blood || !form.hospital || !form.phone) {
      alert('সব তথ্য পূরণ করুন')
      return
    }
    setLoading(true)
    await onSubmit({
      ...form,
      date: form.date || new Date().toISOString().slice(0, 10),
    })
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <h2>🚨 রক্তের অনুরোধ করুন</h2>

        <div className="form-group">
          <label>রোগীর নাম</label>
          <input type="text" placeholder="রোগীর নাম"
            value={form.patient} onChange={e => set('patient', e.target.value)} />
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
            <label>কত ব্যাগ</label>
            <input type="number" placeholder="১" min="1"
              value={form.bags} onChange={e => set('bags', parseInt(e.target.value) || 1)} />
          </div>
        </div>

        <div className="form-group">
          <label>হাসপাতালের নাম</label>
          <input type="text" placeholder="হাসপাতাল"
            value={form.hospital} onChange={e => set('hospital', e.target.value)} />
        </div>

        <div className="form-group">
          <label>যোগাযোগের নম্বর</label>
          <input type="tel" placeholder="01XXXXXXXXX"
            value={form.phone} onChange={e => set('phone', e.target.value)} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>তারিখ</label>
            <input type="date"
              value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
          <div className="form-group">
            <label>ধরন</label>
            <select value={form.urgent} onChange={e => set('urgent', e.target.value === 'true')}>
              <option value="true">🚨 জরুরি</option>
              <option value="false">সাধারণ</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onClose}>বাতিল</button>
          <button className="btn btn-red" onClick={handleSubmit} disabled={loading}>
            {loading ? 'পাঠানো হচ্ছে...' : 'অনুরোধ পাঠান'}
          </button>
        </div>
      </div>
    </div>
  )
}
