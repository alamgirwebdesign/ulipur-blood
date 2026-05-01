// src/constants.js
export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export const UNIONS = [
  'উলিপুর পৌরসভা',
  'বেগমগঞ্জ',
  'গুনাইগাছ',
  'হাতিয়া',
  'কাশিয়াবাড়ী',
  'ধামার',
  'মেখলিগঞ্জ',
  'পাঁচগাছী',
  'রাজারহাট',
  'সাহেবের আলগা',
  'তবকপুর',
  'থেতরাই',
  'ভেলাবাড়ী',
]

export const MIN_DONATION_GAP_DAYS = 90

export function canDonate(lastDonation) {
  if (!lastDonation) return true
  const diff = (Date.now() - new Date(lastDonation)) / (1000 * 60 * 60 * 24)
  return diff >= MIN_DONATION_GAP_DAYS
}
