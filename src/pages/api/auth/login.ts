import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const email = data.get('email')?.toString();
    const password = data.get('password')?.toString();

    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Preencha todos os campos' }), { status: 400 });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (!user || user.status !== 'active') {
      return new Response(JSON.stringify({ error: 'Usuário não encontrado ou inativo' }), { status: 401 });
    }

    const inputHash = crypto.createHash('sha256').update(password).digest('hex');
    
    if (inputHash === user.password_hash) {
      // Set simple cookie
      cookies.set('session', user.id.toString(), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      
      // Redirect to /app
      return new Response(null, {
        status: 302,
        headers: { Location: '/app' }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Senha incorreta' }), { status: 401 });
    }

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
