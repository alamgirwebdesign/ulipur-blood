// src/components/Hero.jsx
import { canDonate } from '../constants'

export default function Hero({ donors, requests }) {
  const available = donors.filter(d => d.available && canDonate(d.lastDonation)).length

  return (
    <div className="hero">
      <h1>রক্ত দিন, জীবন বাঁচান</h1>
      <p>উলিপুর উপজেলার রক্তদাতাদের তালিকা — সহজে খুঁজুন, দ্রুত যোগাযোগ করুন</p>
      <div className="hero-stats">
        <div className="stat">
          <div className="num">{donors.length}</div>
          <div className="lbl">মোট ডোনার</div>
        </div>
        <div className="stat">
          <div className="num">{available}</div>
          <div className="lbl">এখন উপলব্ধ</div>
        </div>
        <div className="stat">
          <div className="num">{requests.length}</div>
          <div className="lbl">জরুরি অনুরোধ</div>
        </div>
      </div>
    </div>
  )
}
