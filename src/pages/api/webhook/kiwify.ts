import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import { sendAccessEmail } from '../../../lib/email';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request, url }) => {
  try {
    const data = await request.json();
    
    // Check if the payload exists
    if (!data || !data.Customer || !data.order_status) {
      return new Response(JSON.stringify({ error: 'Payload inválido recebido da Kiwify' }), { status: 400 });
    }

    const email = (data.Customer.email || '').trim().toLowerCase();
    const status = (data.order_status || '').toLowerCase(); // 'paid', 'approved', 'refunded', 'chargeback', 'chargedback'

    if (!email) {
      return new Response(JSON.stringify({ error: 'E-mail do comprador não encontrado' }), { status: 400 });
    }

    // Determina a URL base para login
    const baseUrl = process.env.APP_URL || `${url.protocol}//${url.host}`;
    const loginUrl = `${baseUrl}/login`;

    // 1. CASO DE COMPRA APROVADA: CRIA CONTA, GERA SENHA E DISPARA E-MAIL
    if (status === 'approved' || status === 'paid') {
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
      
      if (!existingUser) {
        // Gera senha aleatória legível de 8 caracteres alfanuméricos
        const randomPassword = crypto.randomBytes(4).toString('hex').toLowerCase();
        const passwordHash = crypto.createHash('sha256').update(randomPassword).digest('hex');

        db.prepare('INSERT INTO users (email, password_hash, status) VALUES (?, ?, ?)')
          .run(email, passwordHash, 'active');

        // Dispara o e-mail oficial com dados de acesso
        await sendAccessEmail({
          email,
          password: randomPassword,
          loginUrl
        });

        console.log(`[Kiwify Webhook] Novo acesso criado e e-mail disparado para: ${email}`);
      } else {
        // Se já existia (ex: comprou de novo ou era inativo), reativa o acesso
        db.prepare("UPDATE users SET status = 'active' WHERE email = ?").run(email);
        console.log(`[Kiwify Webhook] Acesso reativado para usuário existente: ${email}`);
      }
    } 
    // 2. CASO DE REEMBOLSO OU CHARGEBACK: REVOGA IMEDIATAMENTE O ACESSO
    else if (status === 'refunded' || status === 'chargeback' || status === 'chargedback') {
      db.prepare("UPDATE users SET status = 'revoked' WHERE email = ?").run(email);
      console.log(`[Kiwify Webhook] ACESSO REVOGADO (Reembolso/Chargeback) para: ${email}`);
    }

    return new Response(JSON.stringify({ success: true, processed_status: status }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[Kiwify Webhook Error]:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
