// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import Home from './pages/Home'
import { useToast } from './hooks/useToast'

export default function App() {
  const { toast, showToast } = useToast()

  return (
    <>
      <Navbar adminLoggedIn={false} />

      <Routes>
        <Route path="/" element={<Home showToast={showToast} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer>
        © ২০২৫ উলিপুর রক্তদান | ❤ তৈরি করেছেন <span>উলিপুর উপজেলাবাসী</span>
      </footer>

      <Toast toast={toast} />
    </>
  )
}
