
import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Faltan datos' }), { status: 400 });
    }

    // Connect to 'users' store
    // Note: Locally this requires `netlify dev` or NETLIFY_BLOBS_CONTEXT enviroment variable
    const users = getStore('users');
    
    // Check if user exists
    const existing = await users.get(username, { type: 'text' });
    if (existing) {
        return new Response(JSON.stringify({ message: 'El usuario ya existe' }), { status: 409 });
    }

    // Save user
    await users.set(username, JSON.stringify({ 
        username, 
        password, // In production, hash this!
        createdAt: new Date().toISOString() 
    }));

    return new Response(JSON.stringify({ message: 'Usuario creado' }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    console.error("Register Error:", e);
    return new Response(JSON.stringify({ message: 'Error interno: ' + e.message }), { status: 500 });
  }
}
