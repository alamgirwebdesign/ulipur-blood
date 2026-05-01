// src/components/Navbar.jsx
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar({ adminLoggedIn }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome  = location.pathname === '/'
  const isAdmin = location.pathname === '/admin'

  return (
    <nav className="navbar">
      <a className="nav-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <span className="drop">🩸</span>
        <span>উলিপুর রক্তদান</span>
      </a>
      <div className="nav-links">
        <button className={isHome ? 'active' : ''} onClick={() => navigate('/')}>
          হোম
        </button>
      </div>
    </nav>
  )
}
