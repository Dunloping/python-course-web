import { verifyToken, type AuthTokenPayload } from './jwt.js'

export const AUTH_COOKIE = 'auth_token'
const WEEK_SECONDS = 60 * 60 * 24 * 7

export function json(data: unknown, status = 200, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

export function error(message: string, status = 400): Response {
  return json({ error: message }, status)
}

export async function readBody<T>(req: Request): Promise<T | null> {
  try {
    return (await req.json()) as T
  } catch {
    return null
  }
}

export function getCookie(req: Request, name: string): string | null {
  const header = req.headers.get('cookie')
  if (!header) return null
  for (const part of header.split(';')) {
    const idx = part.indexOf('=')
    if (idx < 0) continue
    const key = part.slice(0, idx).trim()
    if (key === name) {
      try {
        return decodeURIComponent(part.slice(idx + 1).trim())
      } catch {
        return part.slice(idx + 1).trim()
      }
    }
  }
  return null
}

export function authCookie(token: string): string {
  return `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${WEEK_SECONDS}`
}

export function clearAuthCookie(): string {
  return `${AUTH_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`
}

export async function getAuthUser(req: Request): Promise<AuthTokenPayload | null> {
  const token = getCookie(req, AUTH_COOKIE)
  if (!token) return null
  return verifyToken(token)
}
