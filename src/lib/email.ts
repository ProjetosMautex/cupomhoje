/**
 * Serviço de envio de e-mails transacionais (Boas-vindas / Senha e Recuperação de Senha)
 * Suporta Resend (API Oficial) ou logs automáticos em ambiente local de desenvolvimento.
 */

interface AccessEmailParams {
  email: string;
  password: string;
  loginUrl: string;
}

interface ResetEmailParams {
  email: string;
  resetUrl: string;
}

export async function sendAccessEmail({ email, password, loginUrl }: AccessEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.EMAIL_FROM || 'suporte@fimdascobrancas.com.br';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #10b981; font-size: 24px; margin-bottom: 16px;">Seu acesso ao App Oficial foi liberado! 🎉</h1>
      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Parabéns pela decisão de assumir o controle das suas finanças e se blindar contra os juros abusivos.
      </p>
      
      <div style="background-color: #1e293b; border: 1px solid #334155; border-radius: 8px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 10px 0; color: #94a3b8; font-size: 13px; text-transform: uppercase; font-weight: bold;">Seus Dados de Acesso:</p>
        <p style="margin: 0 0 8px 0; font-size: 16px;"><strong>E-mail:</strong> <span style="color: #38bdf8;">${email}</span></p>
        <p style="margin: 0; font-size: 16px;"><strong>Senha Temporária:</strong> <span style="color: #34d399; font-family: monospace; font-size: 18px; font-weight: bold;">${password}</span></p>
      </div>

      <p style="font-size: 14px; color: #94a3b8; line-height: 1.5;">
        O aplicativo funciona 100% direto na web sem precisar instalar nada no seu celular ou computador.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${loginUrl}" style="background-color: #10b981; color: #022c22; font-weight: bold; font-size: 16px; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block;">
          Acessar o App Oficial Agora &rarr;
        </a>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; pt: 16px;">
        💡 Caso esqueça sua senha futuramente, utilize o botão "Esqueci minha senha" na tela de login com este mesmo e-mail de compra.
      </p>
    </div>
  `;

  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Protocolo Fim das Cobranças <${senderEmail}>`,
          to: [email],
          subject: '🔑 Seu Acesso ao App Oficial - Protocolo Fim das Cobranças',
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Resend Error]', errorText);
        return false;
      }

      console.log(`[Email Sent] E-mail de acesso enviado com sucesso para ${email}`);
      return true;
    } catch (err) {
      console.error('[Email Dispatch Error]', err);
      return false;
    }
  } else {
    // Modo de Desenvolvimento / Sem Chave de E-mail configurada ainda
    console.log('========================================================');
    console.log('📧 [SIMULAÇÃO DE E-MAIL - BOAS VINDAS KIWIFY]');
    console.log(`Para: ${email}`);
    console.log(`Assunto: 🔑 Seu Acesso ao App Oficial - Protocolo Fim das Cobranças`);
    console.log(`Link de Login: ${loginUrl}`);
    console.log(`E-mail de Login: ${email}`);
    console.log(`Senha Gerada: ${password}`);
    console.log('(Dica: Para disparar e-mails reais, configure a variável RESEND_API_KEY no arquivo .env)');
    console.log('========================================================');
    return true;
  }
}

export async function sendPasswordResetEmail({ email, resetUrl }: ResetEmailParams): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const senderEmail = process.env.EMAIL_FROM || 'suporte@fimdascobrancas.com.br';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #38bdf8; font-size: 22px; margin-bottom: 16px;">Recuperação de Senha 🔒</h1>
      <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
        Recebemos uma solicitação para redefinir a senha de acesso ao seu App Oficial.
      </p>

      <p style="font-size: 14px; color: #94a3b8; line-height: 1.5; margin: 20px 0;">
        Clique no botão abaixo para criar sua nova senha. Este link é válido por <strong>1 hora</strong>:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" style="background-color: #38bdf8; color: #082f49; font-weight: bold; font-size: 16px; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block;">
          Criar Nova Senha &rarr;
        </a>
      </div>

      <p style="font-size: 12px; color: #64748b; margin-top: 30px; border-top: 1px solid #334155; pt: 16px;">
        Se você não solicitou a redefinição de senha, apenas ignore este e-mail. Seus dados continuam protegidos.
      </p>
    </div>
  `;

  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: `Protocolo Fim das Cobranças <${senderEmail}>`,
          to: [email],
          subject: '🔒 Recuperação de Senha - Protocolo Fim das Cobranças',
          html: htmlContent
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('[Resend Error]', errorText);
        return false;
      }

      console.log(`[Email Sent] E-mail de recuperação enviado com sucesso para ${email}`);
      return true;
    } catch (err) {
      console.error('[Email Dispatch Error]', err);
      return false;
    }
  } else {
    console.log('========================================================');
    console.log('📧 [SIMULAÇÃO DE E-MAIL - RECUPERAÇÃO DE SENHA]');
    console.log(`Para: ${email}`);
    console.log(`Assunto: 🔒 Recuperação de Senha - Protocolo Fim das Cobranças`);
    console.log(`Link para Criar Nova Senha: ${resetUrl}`);
    console.log('(Dica: Para disparar e-mails reais, configure a variável RESEND_API_KEY no arquivo .env)');
    console.log('========================================================');
    return true;
  }
}
