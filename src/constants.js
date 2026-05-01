// src/constants.js
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export const UNIONS = [
  'উলিপুর পৌরসভা',
  'দূর্গাপুর',
  'বেগমগঞ্জ',
  'বুড়াবুড়ী',
  'বজরা',
  'দলদলিয়া',
  'ধামশ্রেণী',
  'ধরণীবাড়ী',
  'গুনাইগাছ',
  'হাতিয়া',
  'পান্ডুল',
  'সাহেবের আলগা',
  'তবকপুর',
  'থেতরাই',
]

export const MIN_DONATION_GAP_DAYS = 90

export function canDonate(lastDonation) {
  if (!lastDonation) return true
  const diff = (Date.now() - new Date(lastDonation)) / (1000 * 60 * 60 * 24)
  return diff >= MIN_DONATION_GAP_DAYS
}
