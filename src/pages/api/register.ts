
import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // 1. Debug Request Body
    const rawBody = await request.text();
    console.log("Register API Raw Body:", rawBody);
    
    if (!rawBody) {
        return new Response(JSON.stringify({ message: "Body vacío" }), { status: 400 });
    }

    let body;
    try {
        body = JSON.parse(rawBody);
    } catch (e) {
        console.error("JSON Parse Error:", e);
        return new Response(JSON.stringify({ message: "JSON inválido" }), { status: 400 });
    }

    const { username, password } = body;

    if (!username || !password) {
      return new Response(JSON.stringify({ message: 'Faltan datos' }), { status: 400 });
    }

    // 2. Debug Netlify Blobs
    try {
        const users = getStore('users');
        console.log("Connecting to store: users");
        
        // Check if user exists
        const existing = await users.get(username, { type: 'text' });
        console.log("Check existing:", existing);

        if (existing) {
            return new Response(JSON.stringify({ message: 'El usuario ya existe' }), { status: 409 });
        }

        // Save user
        await users.set(username, JSON.stringify({ 
            username, 
            password, // In production, hash this!
            createdAt: new Date().toISOString() 
        }));
        console.log("User saved successfully");

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
