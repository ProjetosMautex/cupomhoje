import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import { sendPasswordResetEmail } from '../../../lib/email';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const formData = await request.formData();
    const email = (formData.get('email')?.toString() || '').trim().toLowerCase();

    if (!email) {
      return new Response(null, {
        status: 302,
        headers: { Location: '/recuperar-senha?error=empty' }
      });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;

    if (user && user.status === 'active') {
      // Gera token seguro e tempo de expiração (1 hora)
      const token = crypto.randomBytes(24).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

      db.prepare('UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?')
        .run(token, expiresAt, user.id);

      const baseUrl = process.env.APP_URL || `${url.protocol}//${url.host}`;
      const resetUrl = `${baseUrl}/redefinir-senha?token=${token}`;

      await sendPasswordResetEmail({
        email,
        resetUrl
      });
    } else if (user && user.status === 'revoked') {
      return new Response(null, {
        status: 302,
        headers: { Location: '/recuperar-senha?error=revoked' }
      });
    }

    // Redireciona com status de sucesso (mesmo se o email não existir, por segurança)
    return new Response(null, {
      status: 302,
      headers: { Location: '/recuperar-senha?status=sent' }
    });

  } catch (error) {
    console.error('[Esqueci Senha Error]:', error);
    return new Response(null, {
      status: 302,
      headers: { Location: '/recuperar-senha?error=server' }
    });
  }
};
