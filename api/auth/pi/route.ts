import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json()
    if (!accessToken) return NextResponse.json({ error: 'Missing token' }, { status: 400 })

    const piRes = await fetch('https://api.minepi.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })

    if (!piRes.ok) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

    const user = await piRes.json()
    return NextResponse.json({ user })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
