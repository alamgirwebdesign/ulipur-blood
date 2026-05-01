// src/components/DonorCard.jsx
import { canDonate } from '../constants'

export default function DonorCard({ donor, onCopy }) {
  const avail = donor.available && canDonate(donor.lastDonation)

  return (
    <div className={`donor-card ${avail ? '' : 'unavailable'}`}>
      <span className={`avail-badge ${avail ? 'yes' : 'no'}`}>
        {avail ? '✅ উপলব্ধ' : '⏸ অনুপলব্ধ'}
      </span>
      <div className="blood-badge">{donor.blood}</div>
      <div className="donor-name">{donor.name}</div>
      <div className="donor-meta">
        <span>📍 {donor.union}</span>
        <span>📅 শেষ ডোনেশন: {donor.lastDonation || 'নেই'}</span>
      </div>
      <div className="donor-actions">
        <a href={`tel:${donor.phone}`} className="btn btn-red btn-sm">
          📞 কল করুন
        </a>
        <button
          className="btn btn-outline btn-sm"
          onClick={() => onCopy(donor.phone)}
        >
          কপি
        </button>
      </div>
    </div>
  )
}
