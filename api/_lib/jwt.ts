import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.AUTH_SECRET ?? 'dev-secret-change-me')

export interface AuthTokenPayload {
  userId: string
  email: string
  role: 'admin' | 'student'
}

export async function signToken(payload: AuthTokenPayload): Promise<string> {
  return new SignJWT({ email: payload.email, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    if (!payload.sub) return null
    return {
      userId: payload.sub,
      email: String(payload.email ?? ''),
      role: payload.role === 'admin' ? 'admin' : 'student',
    }
  } catch {
    return null
  }
}
