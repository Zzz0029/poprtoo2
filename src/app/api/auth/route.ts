import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Hardcoded credentials based on user request
        if (username === 'wony' && password === 'wonyoung69') {
            // Set an HTTP-only cookie indicating they are logged in.
            // In a production app you'd use iron-session or JWTs here.
            const response = NextResponse.json({ success: true });

            response.cookies.set({
                name: 'admin_session',
                value: 'true',
                httpOnly: true,
                path: '/',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7 // 1 week
            });

            return response;
        }

        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE() {
    const response = NextResponse.json({ success: true });
    // Clear the session cookie
    response.cookies.delete('admin_session');
    return response;
}
