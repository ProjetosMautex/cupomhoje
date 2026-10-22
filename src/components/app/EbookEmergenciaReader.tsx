import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Flame,
  Clock,
  Utensils,
  CheckCircle2,
  Bookmark,
  Share2,
  Check,
  X,
  Sparkles,
  Zap,
  Timer,
  Layers,
  ShieldAlert,
  PartyPopper,
} from 'lucide-react';

export default function EbookEmergenciaReader() {
  const [receitasFeitas, setReceitasFeitas] = useState<Record<number, boolean>>({});
  const [showBookmarkTip, setShowBookmarkTip] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);
  const [activeCat, setActiveCat] = useState<string>('todas');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ebook_emergencia_15_feitas');
      if (saved) {
        setReceitasFeitas(JSON.parse(saved));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const toggleReceitaFeita = (num: number) => {
    setReceitasFeitas((prev) => {
      const next = { ...prev, [num]: !prev[num] };
      try {
        localStorage.setItem('ebook_emergencia_15_feitas', JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  const handleCopyPageLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const totalFeitas = Object.values(receitasFeitas).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* BANNER NO TOPO: SALVAR NOS FAVORITOS */}
      {!dismissedBanner && (
        <div className="mb-4 bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-2xl p-3.5 sm:px-5 shadow-lg relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-6 sm:pr-0">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
                <Bookmark className="w-4 h-4 fill-amber-400/30" />
              </div>
              <div className="text-xs sm:text-sm leading-snug">
                <strong className="text-amber-300 font-extrabold block sm:inline">
                  ⭐ Salve seu Plano de Emergência nos Favoritos:{' '}
                </strong>
                <span className="text-slate-200">
                  Esta página é de acesso exclusivo e oculto. Adicione aos seus <strong>Favoritos</strong> agora para abrir em segundos nos dias de correria!
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowBookmarkTip(!showBookmarkTip)}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer shadow"
              >
                {showBookmarkTip ? 'Ocultar Dica' : 'Como Salvar?'}
              </button>
              <button
                type="button"
                onClick={handleCopyPageLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs transition cursor-pointer"
                title="Copiar link para mandar no seu próprio WhatsApp"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Link Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => setDismissedBanner(true)}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer absolute top-2.5 right-2.5 sm:static"
                aria-label="Fechar aviso"
                title="Fechar aviso"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showBookmarkTip && (
            <div className="mt-3 pt-3 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-300">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
                <strong className="text-amber-300 block mb-0.5">📱 No Celular (Chrome / Safari):</strong>
                Toque nos <strong>3 pontinhos (⋮)</strong> ou no ícone de <strong>Compartilhar</strong> e selecione <em>"Adicionar aos Favoritos"</em> ou <em>"Adicionar à Tela de Início"</em>.
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
                <strong className="text-amber-300 block mb-0.5">💻 No Computador:</strong>
                Aperte as teclas <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-white font-mono">Ctrl + D</kbd> (Windows) ou <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-white font-mono">Cmd + D</kbd> (Mac) para favoritar em 1 segundo.
              </div>
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-2.5">
                <strong className="text-emerald-400 block mb-0.5">💬 Dica Extra (WhatsApp):</strong>
                Clique em <strong>"Copiar Link"</strong> acima e cole em uma conversa com você mesmo no WhatsApp para abrir rápido na cozinha!
              </div>
            </div>
          )}
        </div>
      )}

      {/* BARRA DE NAVEGAÇÃO RÁPIDA ENTRE CATEGORIAS */}
      <div className="sticky top-3 z-40 mb-8 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-400 px-2">
          <Zap className="w-4 h-4 shrink-0" />
          <span>Plano de Emergência (15 Receitas)</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <a
            href="#introducao"
            onClick={() => setActiveCat('todas')}
            className={`px-2.5 py-1.5 rounded-xl border transition ${
              activeCat === 'todas'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            3 Atalhos
          </a>
          <a
            href="#categoria-1"
            onClick={() => setActiveCat('cat1')}
            className={`px-2.5 py-1.5 rounded-xl border transition ${
              activeCat === 'cat1'
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-300 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            1. Frigideira (1–8)
          </a>
          <a
            href="#categoria-2"
            onClick={() => setActiveCat('cat2')}
            className={`px-2.5 py-1.5 rounded-xl border transition ${
              activeCat === 'cat2'
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            2. Pressão (9–12)
          </a>
          <a
            href="#categoria-3"
            onClick={() => setActiveCat('cat3')}
            className={`px-2.5 py-1.5 rounded-xl border transition ${
              activeCat === 'cat3'
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
            }`}
          >
            3. Montagem Fria (13–15)
          </a>
          <span className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-extrabold">
            ✓ {totalFeitas}/15 Prontas
          </span>
        </div>
      </div>

      {/* CAPA DO EBOOK */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 shadow-2xl mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-6 p-6 sm:p-10">
          <div className="md:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-extrabold uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" /> Guia Expresso Oficial • Projetos Mautex
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">
              O Plano de Emergência:{' '}
              <span className="text-amber-400">
                15 Marmitas em 15 Minutos
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              O seu botão de pânico contra o delivery. Receitas expressas de <strong>Uma Panela Só</strong> usando atalhos inteligentes para encher o freezer mesmo nos dias em que você está exausto.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                <Flame className="w-4 h-4 text-rose-400" /> 1 Panela Só
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                <Timer className="w-4 h-4 text-amber-400" /> Máximo 15 Minutos
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Produzido por: Projetos Mautex
              </span>
            </div>
          </div>

          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-64 sm:w-72 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-500/30 group">
              <img
                src="/ebook-emergencia/capa-emergencia.webp"
                alt="Capa do Guia O Plano de Emergência: 15 Marmitas em 15 Minutos (Uma Panela Só)"
                width={560}
                height={748}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CONTEÚDO PRINCIPAL */}
      <article className="bg-slate-900/60 border border-slate-800/90 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-16 text-slate-200 leading-relaxed text-base sm:text-lg">
        {/* INTRODUÇÃO E OS 3 ATALHOS */}
        <section id="introducao" className="space-y-8 border-b border-slate-800 pb-14">
          <div className="space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400">
              Introdução • Resgate Imediato
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              O Botão de Pânico Contra o Delivery
            </h2>
          </div>

          <p>
            Este é o seu material de resgate. Haverá domingos em que você simplesmente não terá 2 horas livres, ou chegará do trabalho exausto na segunda-feira à noite com a geladeira vazia. A tendência natural é pegar o celular e gastar caro em um aplicativo de comida.
          </p>

          <p>
            Este guia existe para barrar esse impulso. As <strong className="text-white">15 receitas abaixo</strong> foram desenhadas sob três regras estritas: <strong className="text-amber-300">sujar apenas uma panela</strong> (ou a panela de pressão), usar <strong className="text-emerald-300">atalhos inteligentes</strong> (como legumes pré-congelados e enlatados) e ir do fogão direto para a marmita em <strong className="text-white">15 minutos</strong>.
          </p>

          {/* OS 3 ATALHOS DA COZINHA EXPRESSA */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">
                  Regras do Jogo
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Os 3 Atalhos da Cozinha Expressa
                </h3>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-300">
              Para bater a marca de 15 minutos, você precisa roubar no jogo legalmente:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-black text-xs">
                  1
                </span>
                <h4 className="font-bold text-white text-base">Corte tudo em cubos minúsculos</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Quanto menor a carne ou o frango, mais rápido o calor penetra e cozinha.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs">
                  2
                </span>
                <h4 className="font-bold text-white text-base">O Poder do "Comprado Pronto"</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tenha sempre no congelador pacotes de brócolis, couve-flor e seleta de legumes congelados. Eles já vêm branqueados.
                </p>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-sky-500 text-slate-950 font-black text-xs">
                  3
                </span>
                <h4 className="font-bold text-white text-base">Grãos em Lata ou Sachê</h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Grão-de-bico, ervilha e milho em lata (ou sachê) já estão cozidos. É só escorrer, lavar para tirar o sódio e usar.
                </p>
              </div>
            </div>

            {/* Bloco de Destaque: Mini Processador Manual */}
            <div className="my-6 rounded-lg border border-green-100 bg-green-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧅</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Corte Tudo em 5 Segundos</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                O maior ladrão de tempo na cozinha é picar alho e cebola. Um <strong>mini processador manual de alimentos com cordinha</strong> é o utensílio mais barato e útil que você pode ter. Puxe a corda 3 vezes e você tem cebola triturada fininha sem chorar e sem sujar a tábua.
              </p>
              <a
                href="https://meli.la/1w9hN7T"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 shadow-sm"
              >
                🛒 Ver Mini Processador Manual Recomendado
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 1: FRIGIDEIRA QUENTE (RECEITAS 1 A 8)           */}
        {/* ========================================================= */}
        <section id="categoria-1" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-rose-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400 block">
                Categoria 1 • Receitas 01 a 08
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Frigideira Quente (De 5 a 10 Minutos)
              </h2>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-emergencia/cat1-frigideira.webp"
                alt="Frigideira funda antiaderente preparando frango oriental com brócolis e iscas de carne aceboladas em minutos"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-rose-400">Categoria 1:</strong> Cortes pequenos e fogo alto para selar proteínas e criar molhos protetores em menos de 10 minutos.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 1 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #01 • Uma Panela Só</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">1. Frango Oriental em Cubos com Brócolis</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(1)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[1] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[1] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> O brócolis de pacote congelado vai direto para a panela quente, sem precisar cozinhar antes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de peito de frango em cubinhos</li>
                  <li>1 pacote de brócolis congelado</li>
                  <li>3 colheres de sopa de shoyu</li>
                  <li>1 colher de sopa de mel</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Doure o frango na frigideira bem quente com um fio de óleo.</li>
                  <li>Jogue o brócolis congelado por cima.</li>
                  <li>Misture o shoyu com mel em um potinho e jogue na panela.</li>
                  <li>Deixe ferver por 2 minutos até o molho encorpar e envolver tudo.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Frigideira Wok Antiaderente */}
            <div className="my-6 rounded-lg border border-rose-100 bg-rose-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🍳</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">A Frigideira de 1 Panela Só</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Para fazer refeições expressas sem derrubar comida no fogão, você precisa de espaço. Uma <strong>frigideira wok funda antiaderente com tampa</strong> é alta e espaçosa, ideal para misturar frango, legumes e molhos em fogo alto de uma vez só sem grudar absolutamente nada no fundo.
              </p>
              <a
                href="https://meli.la/1NFwqK3"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 shadow-sm"
              >
                🛒 Ver Frigideira Wok Antiaderente Recomendada
              </a>
            </div>
          </div>

          {/* RECEITA 2 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #02</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">2. Carne Moída "Vapt-Vupt" com Seleta</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(2)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[2] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[2] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> Usar carne moída sem gordura (patinho) para não precisar escorrer o óleo no meio do processo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de patinho moído</li>
                  <li>1 sachê de seleta de legumes (milho, ervilha, cenoura)</li>
                  <li>2 dentes de alho amassados</li>
                  <li>1 colher de azeite, sal e pimenta</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Refogue a carne no azeite com o alho até perder totalmente a cor vermelha.</li>
                  <li>Adicione a seleta lavada e escorrida.</li>
                  <li>Tempere com sal e pimenta, mexa por mais 2 minutos e transfira para os potes.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 3 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #03</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">3. Iscas de Patinho Aceboladas ao Shoyu</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 8 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(3)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[3] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[3] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> O shoyu cria um molho escuro instantâneo que protege as fibras da carne no freezer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de carne em tiras muito finas</li>
                  <li>1 cebola grande fatiada em rodelas</li>
                  <li>2 colheres de sopa de shoyu</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Deixe a frigideira trincando de quente e jogue as iscas aos poucos.</li>
                  <li>Quando dourarem, adicione a cebola e o shoyu.</li>
                  <li>Refogue rapidamente até a cebola amolecer e caramelizar no shoyu.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 4 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #04</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">4. Frango Rápido ao Creme de Milho</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(4)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[4] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[4] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> O liquidificador faz o molho base da refeição em apenas 30 segundos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de frango em cubos</li>
                  <li>1 lata de milho verde</li>
                  <li>1 xícara de leite</li>
                  <li>Sal e temperos a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Bata metade da lata de milho com o leite no liquidificador.</li>
                  <li>Doure o frango na panela.</li>
                  <li>Jogue o creme batido e o resto do milho inteiro na panela com o frango. Ferva até engrossar (cerca de 3 min).</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 5 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #05</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">5. Lombo Suíno em Iscas com Limão</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 8 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(5)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[5] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[5] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> A carne de porco absorve o limão instantaneamente na frigideira quente.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de lombo suíno fatiado bem fino</li>
                  <li>Suco de 2 limões</li>
                  <li>Alho amassado e sal</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Refogue a carne com o alho em fogo bem alto.</li>
                  <li>Quando a carne começar a grudar no fundo, jogue o suco de limão para soltar os sucos da panela (deglacear) e criar um molho rápido e cítrico.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 6 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #06</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">6. Estrogonofe de Emergência (Requeijão)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(6)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[6] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[6] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> Não usar creme de leite dispensa o cuidado chato com a fervura e evita o talhamento no congelador.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de frango ou carne em cubos</li>
                  <li>2 colheres de ketchup e 1 de mostarda</li>
                  <li>1 pote de requeijão</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Refogue a proteína até dourar completamente.</li>
                  <li>Misture o ketchup e a mostarda.</li>
                  <li>Desligue o fogo e incorpore o requeijão mexendo bem.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 7 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #07</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">7. Hambúrguer Rústico de Marmita</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 8 min (Frigideira)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(7)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[7] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[7] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> Moldar e selar uma carne espessa leva menos de 10 minutos e dispensa picar ingredientes.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>600g de carne moída</li>
                  <li>Sal e pimenta apenas por fora</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Molde discos grossos com as mãos (sem frescura, formato rústico).</li>
                  <li>Sele em frigideira muito quente por 3 a 4 minutos de cada lado. O miolo se mantém suculento e congela perfeitamente.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 8 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #08 • Zero Louça</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">8. Peixe Branco Caiçara no Papelote</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 5 a 8 min (Sem Fogão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(8)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[8] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[8] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> Cozimento no vapor fechado dentro do micro-ondas ou fritadeira elétrica. Nenhuma panela suja.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Filés de tilápia ou merluza</li>
                  <li>Azeite, tomates cereja, cebola fatiada, sal e limão</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Embrulhe o peixe com os temperos, o tomate e a cebola em um pedaço de papel manteiga ou alumínio (papelote bem fechado).</li>
                  <li>Leve ao micro-ondas por 5 minutos (ou fritadeira elétrica por 8 min). Transfira para o pote de vidro com o caldinho que se formou dentro do papelote.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Fritadeira Elétrica Sem Óleo (Airfryer) */}
            <div className="my-6 rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌪️</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Marmitas Prontas Sem Fogão</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Para quem realmente não quer sujar fogão nos dias de cansaço, uma <strong>fritadeira elétrica sem óleo (Airfryer)</strong> é indispensável. Enquanto você toma banho, ela assa papelotes de peixe, legumes ou sobrecoxas sozinha, com timer automático e sem engordurar a cozinha.
              </p>
              <a
                href="https://meli.la/1vSQnRs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-sm"
              >
                🛒 Ver Fritadeira Elétrica Airfryer Recomendada
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 2: PRESSÃO EXPRESSA (RECEITAS 9 A 12)           */}
        {/* ========================================================= */}
        <section id="categoria-2" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-amber-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
                Categoria 2 • Receitas 09 a 12
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Pressão Expressa (Tudo Junto e Misturado)
              </h2>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-emergencia/cat2-pressao.webp"
                alt="Galinhada dourada na panela de pressão e sopa cremosa de ervilha com bacon"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-amber-400">Categoria 2:</strong> Carboidrato e proteína cozinhando juntos no mesmo ciclo de pressão em apenas 4 a 15 minutos.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 9 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #09 • Refeição Completa</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">9. Arroz Carreteiro de 10 Minutos</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min (Pressão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(9)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[9] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[9] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> A panela de pressão cozinha o arroz na metade do tempo normal, misturando os sabores.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>200g de charque moída ou linguiça calabresa fina</li>
                  <li>1 xícara de arroz branco</li>
                  <li>2 xícaras de água quente</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Refogue a carne ou linguiça rapidamente na panela de pressão destampada.</li>
                  <li>Junte o arroz e a água quente. Tampe a panela.</li>
                  <li>Quando pegar pressão (chiar), conte exatos 4 minutos. Desligue e deixe a pressão sair sozinha antes de abrir.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 10 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #10</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">10. Galinhada Amarela de Uma Panela</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min (Pressão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(10)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[10] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[10] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> Arroz e proteína prontos no mesmo ciclo de fogo em tempo recorde.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>300g de frango em cubinhos</li>
                  <li>1 xícara de arroz</li>
                  <li>1 colher de chá de açafrão</li>
                  <li>Água fervente</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Doure o frango no azeite com o açafrão na panela de pressão.</li>
                  <li>Adicione o arroz e a água (dois dedos acima do arroz).</li>
                  <li>Feche a panela, aguarde pegar pressão, marque 4 minutos e desligue.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 11 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #11 • Sem Liquidificador</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">11. Sopa de Ervilha com Bacon (Creme)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 15 min (Pressão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(11)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[11] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[11] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> A ervilha partida seca desmancha sob pressão, virando um creme automático sem precisar sujar liquidificador.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>1 pacote de ervilha partida (seca)</li>
                  <li>100g de bacon em cubos</li>
                  <li>Água, alho e sal</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Frite o bacon com o alho na panela de pressão.</li>
                  <li>Jogue a ervilha, cubra com muita água (uns 4 dedos acima dos grãos).</li>
                  <li>Feche e deixe na pressão por 15 minutos. Abra e mexa vigorosamente com uma concha para a ervilha desmanchar e formar o creme.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 12 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #12</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">12. Grão-de-Bico com Calabresa</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 8 min (Panela)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(12)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[12] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[12] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-amber-300">A Tática:</strong> Usar a calabresa para transferir um sabor defumado rapidamente ao grão-de-bico que já vem cozido no sachê.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>1 sachê de grão-de-bico cozido (lavado e escorrido)</li>
                  <li>1 gomo de calabresa picada</li>
                  <li>1 sachê de molho de tomate</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Na frigideira ou panela, frite a calabresa até dourar.</li>
                  <li>Jogue o grão-de-bico escorrido e o molho de tomate. Ferva por 5 minutos.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 3: MONTAGEM FRIA E FORNO INSTANTÂNEO (13 A 15)  */}
        {/* ========================================================= */}
        <section id="categoria-3" className="space-y-12">
          <div>
            <div className="border-l-4 border-emerald-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
                Categoria 3 • Receitas 13 a 15
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Montagem Fria e Forno Instantâneo
              </h2>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-emergencia/cat3-montagem.webp"
                alt="Marmitas montadas rapidamente com panquecas de tortilha ao molho vermelho, escondidinho rápido e arroz de forno"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-emerald-400">Categoria 3:</strong> Zero fogão demorado — montagem direta nos potes reaproveitando bases prontas com perfeição no descongelamento.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 13 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #13 • Pronto em 3 Minutos</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">13. Escondidinho com Purê de Flocos</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 5 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(13)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[13] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[13] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-emerald-300">A Tática:</strong> O purê de batata instantâneo (de caixinha/pacote) fica pronto misturando leite quente em 1 minuto e, incrivelmente, tem um descongelamento perfeito.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>1 pacote de purê de batata instantâneo</li>
                  <li>Sobras de frango desfiado ou carne moída (do fim de semana)</li>
                  <li>Leite (para fazer o purê)</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Faça o purê conforme as instruções da embalagem (geralmente só adicionar leite/água quente e mexer).</li>
                  <li>Forre a marmita com o purê, coloque o recheio de carne e feche com mais purê.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 14 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #14 • Zero Desperdício</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">14. Arroz de Forno (Mix de Sobras)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(14)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[14] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[14] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-emerald-300">A Tática:</strong> Reaproveitar o arroz esquecido da semana passada em uma refeição nova.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Sobras de arroz</li>
                  <li>1 sachê de seleta de legumes</li>
                  <li>Cubos de queijo muçarela e presunto (opcional)</li>
                  <li>1 sachê de molho de tomate</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Em uma travessa, misture todos os ingredientes, usando o molho de tomate para umedecer bem a mistura.</li>
                  <li>Leve ao forno ou micro-ondas apenas até o queijo derreter. Porcione em seguida.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 15 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #15 • Montagem Fria</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">15. Panqueca Expressa de Tortilha</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 5 min (Sem Fogão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(15)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[15] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[15] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-emerald-300">A Tática:</strong> Usar discos de massa pronta de supermercado como base rápida para recheios, pulando a etapa de bater e fritar massa de panqueca.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Discos de tortilha de trigo macia (massa pronta de supermercado)</li>
                  <li>Recheio pronto de carne moída ou frango</li>
                  <li>Molho de tomate</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Coloque uma porção de recheio no centro do disco de tortilha e enrole apertado como um charuto.</li>
                  <li>Acomode as panquecas na marmita.</li>
                  <li>Jogue bastante molho de tomate por cima (o molho hidrata a tortilha e impede que a massa resseque no freezer). Congele.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* ENCERRAMENTO MOTIVACIONAL */}
          <div className="bg-gradient-to-br from-amber-950/60 via-slate-900 to-rose-950/40 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">
              Blindagem Anti-Delivery Ativada
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Nunca Mais Fique Refém do Cansaço!
            </h3>
            <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Com estas <strong>15 marmitas de 15 minutos</strong>, até mesmo a segunda-feira mais corrida vira dia de freezer cheio em uma única panela. Escolha uma receita acima, acione seus 3 atalhos e economize tempo e dinheiro toda semana!
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
