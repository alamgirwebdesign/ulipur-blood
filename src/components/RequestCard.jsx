// src/components/RequestCard.jsx
export default function RequestCard({ request }) {
  return (
    <div className="request-card">
      <div className="req-blood">{request.blood}</div>
      <div className="req-info">
        <h3>{request.patient}</h3>
        <p>🏥 {request.hospital} • {request.bags} ব্যাগ দরকার</p>
        <p>📅 {request.date}</p>
      </div>
      <span className="req-badge">
        {request.urgent ? '🚨 জরুরি' : 'সাধারণ'}
      </span>
      <a href={`tel:${request.phone}`} className="btn btn-red btn-sm">
        📞 কল
      </a>
    </div>
  )
}
