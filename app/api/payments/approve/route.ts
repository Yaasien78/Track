import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { paymentId } = await req.json()
  console.log("Opsi 10 - Approve:", paymentId)

  const API_KEY = process.env.PI_NETWORK_API_KEY
  if (!API_KEY) return NextResponse.json({ error: "PI_NETWORK_API_KEY missing" }, { status: 500 })

  const res = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
    method: "POST",
    headers: {
      "Authorization": `Key ${API_KEY}`,
      "Content-Type": "application/json"
    }
  })

  if (!res.ok) return NextResponse.json({ error: "Approve failed" }, { status: res.status })
  return NextResponse.json({ success: true })
    }
