import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Simple validation - replace with real auth later
    if (username === 'admin' && password === 'admin123') {
      return NextResponse.json({
        success: true,
        user: {
          username,
          role: 'admin'
        },
        token: 'mock_token_' + Date.now()
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid credentials' },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
