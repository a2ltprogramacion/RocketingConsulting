
import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const rawBody = await request.text();
    
    if (!rawBody) {
        return new Response(JSON.stringify({ message: "Body vacío" }), { status: 400 });
    }

    let body;
    try {
        body = JSON.parse(rawBody);
    } catch (e) {
        return new Response(JSON.stringify({ message: "JSON inválido" }), { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Faltan datos' }), { status: 400 });
    }

    try {
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

    } catch (blobError: any) {
        console.error("Netlify Blobs Error:", blobError);
        return new Response(JSON.stringify({ message: 'Error en Blobs: ' + blobError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: 'Usuario creado' }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e: any) {
    console.error("General Register Error:", e);
    return new Response(JSON.stringify({ message: 'Error interno: ' + e.message }), { status: 500 });
  }
}
