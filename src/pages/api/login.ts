
import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Connect to 'users' store
    const users = getStore('users');
    
    // Fetch user data
    const userJson = await users.get(username, { type: 'text' });
    
    if (!userJson) {
         return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), { status: 401 });
    }

    const user = JSON.parse(userJson);

    // Validate password (simple comparison for simulation)
    if (user.password === password) {
        // Set cookie
        cookies.set('auth_token', 'valid_session', { 
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return new Response(JSON.stringify({ message: 'Login exitoso' }), { status: 200 });
    }

    return new Response(JSON.stringify({ message: 'Credenciales inválidas' }), { status: 401 });
  } catch (e: any) {
    console.error("Login Error:", e);
    return new Response(JSON.stringify({ message: 'Error interno' }), { status: 500 });
  }
}
