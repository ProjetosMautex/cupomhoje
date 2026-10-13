import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();
    const token = (formData.get('token')?.toString() || '').trim();
    const password = (formData.get('password')?.toString() || '').trim();
    const confirmPassword = (formData.get('confirm_password')?.toString() || '').trim();

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/login?error=invalid_token' }
      });
    }

    if (!password || password.length < 6) {
      return new Response(null, {
        status: 302,
        headers: { Location: `/redefinir-senha?token=${token}&error=short_password` }
      });
    }

    if (password !== confirmPassword) {
      return new Response(null, {
        status: 302,
        headers: { Location: `/redefinir-senha?token=${token}&error=mismatch` }
      });
    }

    // Busca usuário pelo token
    const user = db.prepare('SELECT * FROM users WHERE reset_token = ?').get(token) as any;

    if (!user) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/recuperar-senha?error=expired' }
      });
    }

    // Verifica se expirou
    if (!user.reset_token_expires || new Date(user.reset_token_expires).getTime() < Date.now()) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/recuperar-senha?error=expired' }
      });
    }

    // Atualiza a nova senha e limpa o token
    const passwordHash = crypto.createHash('sha256').update(password).digest('hex');
    db.prepare('UPDATE users SET password_hash = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?')
      .run(passwordHash, user.id);

    console.log(`[Reset Password] Senha redefinida com sucesso para o usuário: ${user.email}`);

    return new Response(null, {
      status: 302,
      headers: { Location: '/login?status=password_updated' }
    });

  } catch (error) {
    console.error('[Redefinir Senha Error]:', error);
    return new Response(null, {
      status: 302,
      headers: { Location: '/login?error=server' }
    });
  }
};
