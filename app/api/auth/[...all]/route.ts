import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/lib/auth'
import { demoMode } from '@/lib/session'

const handlers = toNextJsHandler(auth)
const unavailable = () => Response.json({ error: 'Authentication database is not configured' }, { status: 503 })

export async function GET(request: Request) { return demoMode ? unavailable() : handlers.GET(request) }
export async function POST(request: Request) { return demoMode ? unavailable() : handlers.POST(request) }
