import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development',
    version: process.version,
  }

  return NextResponse.json(healthCheck, {
    status: 200,
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Content-Type': 'application/json',
    }
  })
}

export async function HEAD(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}