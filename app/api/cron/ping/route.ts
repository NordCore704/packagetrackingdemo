import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  // 1. Optional Security: Verify the request is coming from Vercel
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // 2. Perform a lightweight query to wake/keep alive the database
    await db.parcel.findFirst({
      select: { id: true }
    })
    
    return NextResponse.json({ success: true, message: 'Database ping successful.' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Database ping failed.' }, { status: 500 })
  }
}