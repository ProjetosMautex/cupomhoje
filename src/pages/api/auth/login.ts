import type { APIRoute } from 'astro';
import { CURRENT_WEEK_PASSWORD, getExpectedSessionToken } from '../../../lib/auth-config';

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const data = await request.formData();
    const email = (data.get('email')?.toString() || '').trim();
    const password = (data.get('password')?.toString() || '').trim();

    if (!password) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/login?error=empty' }
      });
    }

    // Validação da senha semanal
    if (password === CURRENT_WEEK_PASSWORD) {
      // Define o cookie de sessão com o hash da semana atual
      cookies.set('session', getExpectedSessionToken(), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 14 // 14 dias (ou até mudar a senha no domingo)
      });

      return new Response(null, {
        status: 302,
        headers: { Location: '/app' }
      });
    } else {
      return new Response(null, {
        status: 302,
        headers: { Location: '/login?error=wrong_password' }
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=server' }
    });
  }
};
