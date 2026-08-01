import { json, clearAuthCookie } from './_lib/http.js'

export function POST() {
  return json({ ok: true }, 200, { 'Set-Cookie': clearAuthCookie() })
}
