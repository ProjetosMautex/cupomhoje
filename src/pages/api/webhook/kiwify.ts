import type { APIRoute } from 'astro';
import db from '../../../lib/db';
import crypto from 'node:crypto';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    // Check if the payload exists
    if (!data || !data.Customer || !data.order_status) {
      return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400 });
    }

    const email = data.Customer.email;
    const status = data.order_status; // 'approved', 'refunded', 'chargeback'

    if (status === 'approved' || status === 'paid') {
      // Check if user already exists
      const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      
      if (!existingUser) {
        // Generate random 8-character password
        const password = crypto.randomBytes(4).toString('hex'); // 8 characters
        
        // In a real app, hash the password. Here using plain for simplicity/demonstration, 
        // or a simple hash depending on requirements.
        // For actual production, import bcrypt and use it.
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        db.prepare('INSERT INTO users (email, password_hash, status) VALUES (?, ?, ?)')
          .run(email, passwordHash, 'active');

        console.log('----------------------------------------');
        console.log(`NOVO ACESSO LIBERADO:`);
        console.log(`Email: ${email}`);
        console.log(`Senha: ${password}`);
        console.log(`(Para integrar com n8n: pegar esses dados e disparar email)`);
        console.log('----------------------------------------');
      } else {
        // Just reactivate if it was revoked
        db.prepare("UPDATE users SET status = 'active' WHERE email = ?").run(email);
        console.log(`Acesso reativado para: ${email}`);
      }
    } else if (status === 'refunded' || status === 'chargeback') {
      db.prepare("UPDATE users SET status = 'revoked' WHERE email = ?").run(email);
      console.log(`Acesso bloqueado (Reembolso/Chargeback) para: ${email}`);
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error('Webhook Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
