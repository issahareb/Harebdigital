/** Deterministic demonstration data only. Never represents a real team's availability. */
export const trades = [
  { value: 'sanitaer', label: 'Sanitär & Bad', hint: 'Armaturen, Leitungen und Bad', services: [
    { value: 'armatur', label: 'Armatur austauschen', duration: 60 }, { value: 'abfluss', label: 'Abfluss prüfen', duration: 60 }, { value: 'bad', label: 'Badmodernisierung besprechen', duration: 90 },
  ] },
  { value: 'heizung', label: 'Heizung & Klima', hint: 'Wartung, Wärme und Raumklima', services: [
    { value: 'wartung', label: 'Heizungswartung', duration: 90 }, { value: 'heizkoerper', label: 'Heizkörper prüfen', duration: 60 }, { value: 'waermepumpe', label: 'Wärmepumpen-Beratung', duration: 120 },
  ] },
  { value: 'elektro', label: 'Elektro & Licht', hint: 'Anschlüsse, Beleuchtung und Prüfung', services: [
    { value: 'steckdose', label: 'Steckdose installieren', duration: 60 }, { value: 'leuchte', label: 'Leuchte montieren', duration: 60 }, { value: 'pruefung', label: 'Elektroinstallation prüfen', duration: 120 },
  ] },
  { value: 'maler', label: 'Maler & Ausbau', hint: 'Wände, Oberflächen und Räume', services: [
    { value: 'raum', label: 'Raumgestaltung besprechen', duration: 60 }, { value: 'flaeche', label: 'Flächen vor Ort aufnehmen', duration: 90 }, { value: 'renovierung', label: 'Renovierung planen', duration: 120 },
  ] },
]
export function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
export function parseDate(value: string) { return new Date(`${value}T12:00:00`) }
export function addDays(date: Date, count: number) { const next = new Date(date); next.setDate(next.getDate() + count); return next }
export function isBookable(value: string, today: Date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const date = parseDate(value)
  return dateKey(date) === value && value > dateKey(today) && value <= dateKey(addDays(today, 60)) && date.getDay() !== 0 && date.getDay() !== 6
}
export function demoSlots(value: string, duration: number) {
  if (!value) return []
  const seed = parseDate(value).getDate()
  return ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00'].map((time, index) => ({
    value: time, label: `${time} Uhr`, hint: (index + seed) % 4 === 0 ? 'In dieser Demo belegt' : Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) + duration > 17 * 60 ? 'Zu spät für diese Leistungsdauer' : `${duration} Minuten eingeplant`,
    disabled: (index + seed) % 4 === 0 || Number(time.slice(0, 2)) * 60 + Number(time.slice(3)) + duration > 17 * 60,
  }))
}
