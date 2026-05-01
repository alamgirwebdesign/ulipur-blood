// src/components/Toast.jsx
export default function Toast({ toast }) {
  if (!toast) return null
  return (
    <div className={`toast ${toast.type}`}>
      {toast.msg}
    </div>
  )
}
