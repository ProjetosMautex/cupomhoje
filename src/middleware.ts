import { defineMiddleware } from 'astro:middleware';
import { isValidSession } from './lib/auth-config';

export const onRequest = defineMiddleware((context, next) => {
  const { pathname } = context.url;

  // Rotas protegidas: qualquer rota que comece com /app
  if (pathname.startsWith('/app')) {
    const sessionCookie = context.cookies.get('session');

    // Se não tiver sessão ou se a senha da semana tiver mudado, redireciona para login
    if (!isValidSession(sessionCookie?.value)) {
      context.cookies.delete('session', { path: '/' });
      return context.redirect('/login');
    }

    // Usuário autenticado
    context.locals.user = { email: 'acesso@acesso.com', status: 'active' };
  }

  // Se já estiver logado com a senha atual da semana, pula a tela de login
  if (pathname === '/login') {
    const sessionCookie = context.cookies.get('session');
    if (isValidSession(sessionCookie?.value)) {
      return context.redirect('/app');
    }
  }

  return next();
});
