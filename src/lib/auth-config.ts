import crypto from 'node:crypto';

// ============================================================================
// CONFIGURAÇÃO DE ACESSO DO APP (SENHA SEMANAL DA KIWIFY)
// ============================================================================

// E-mail oficial de acesso informado aos alunos na Kiwify:
export const APP_EMAIL = (process.env.APP_EMAIL || 'acesso@acesso.com').trim().toLowerCase();

// Senha da semana:
// Você pode trocar aqui diretamente ou na variável APP_PASSWORD no painel da Vercel / .env.
// Ao alterar essa senha no domingo, o acesso de quem pediu reembolso é cortado automaticamente
// e todos os alunos ativos só precisam pegar a nova senha na Kiwify!
export const CURRENT_WEEK_PASSWORD = (process.env.APP_PASSWORD || '6SLPrsM7jkXL').trim();

// Segredo interno para gerar o cookie seguro da semana
const SECRET = process.env.SESSION_SECRET || 'segredo-semanal-protocolo-2026';

/**
 * Gera o token de sessão vinculado à senha da semana.
 * Se a senha mudar no domingo, o token muda e todos os cookies antigos deixam de funcionar.
 */
export function getExpectedSessionToken(): string {
  return crypto.createHash('sha256').update(CURRENT_WEEK_PASSWORD + SECRET).digest('hex');
}

/**
 * Valida se o cookie do usuário corresponde à senha da semana atual.
 */
export function isValidSession(cookieValue: string | undefined | null): boolean {
  if (!cookieValue) return false;
  return cookieValue === getExpectedSessionToken();
}
