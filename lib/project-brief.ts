/** Only a short, explicit project brief travels to the real contact form. */
export const PROJECT_BRIEF_LIMIT = 1800
export function readProjectBrief(value: string | null) {
  if (!value) return ''
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, '').slice(0, PROJECT_BRIEF_LIMIT)
}
