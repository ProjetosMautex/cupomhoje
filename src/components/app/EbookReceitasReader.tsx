import React, { useState } from 'react';
import {
  X,
  Check,
  Clock,
  Flame,
  Utensils,
  Award,
  ChefHat,
  Bookmark,
  Share2,
  Sparkles,
  Beef,
  Layers,
  Wheat,
  Soup,
  PartyPopper
} from 'lucide-react';

export default function EbookReceitasReader() {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showBookmarkTip, setShowBookmarkTip] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [dismissedBanner, setDismissedBanner] = useState<boolean>(false);

  // Estado para marcar receitas já testadas/favoritas pelo leitor (1 a 30)
  const [receitasFeitas, setReceitasFeitas] = useState<Record<number, boolean>>({});

  const toggleReceitaFeita = (num: number) => {
    setReceitasFeitas((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const handleCopyPageLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                  ⭐ Salve seu Livro de Receitas nos Favoritos:{" "}
                </strong>
                <span className="text-slate-200">
                  Esta página é de acesso exclusivo e oculto. Adicione aos seus <strong>Favoritos</strong> agora para nunca perder o link quando for cozinhar!
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

      {/* BARRA SUPERIOR DE NAVEGAÇÃO FIXA */}
      <div className="sticky top-2 z-30 mb-8 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full text-xs font-bold scrollbar-none">
          <button
            onClick={() => scrollToSection('capa')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0 cursor-pointer"
          >
            Capa
          </button>
          <button
            onClick={() => scrollToSection('introducao')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0 cursor-pointer"
          >
            Intro
          </button>
          <button
            onClick={() => scrollToSection('categoria-1')}
            className="px-2.5 py-1.5 rounded-xl bg-rose-950/80 text-rose-300 border border-rose-500/30 hover:bg-rose-900/80 transition shrink-0 cursor-pointer"
          >
            1. Proteínas (1-10)
          </button>
          <button
            onClick={() => scrollToSection('categoria-2')}
            className="px-2.5 py-1.5 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-500/30 hover:bg-amber-900/80 transition shrink-0 cursor-pointer"
          >
            2. Escondidinhos (11-20)
          </button>
          <button
            onClick={() => scrollToSection('categoria-3')}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/80 transition shrink-0 cursor-pointer"
          >
            3. Bases (21-27)
          </button>
          <button
            onClick={() => scrollToSection('categoria-4')}
            className="px-2.5 py-1.5 rounded-xl bg-purple-950/80 text-purple-300 border border-purple-500/30 hover:bg-purple-900/80 transition shrink-0 cursor-pointer"
          >
            4. Caldos (28-30)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
            ✅ {totalFeitas}/30
          </span>
          <button
            type="button"
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
            title="Alternar tamanho da letra"
          >
            {fontSize === 'normal' ? 'A+' : 'A-'}
          </button>
        </div>
      </div>

      {/* CORPO DO E-BOOK DE RECEITAS */}
      <article
        className={`bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-16 text-slate-200 font-sans ${
          fontSize === 'large' ? 'text-lg sm:text-xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'
        }`}
      >
        {/* ========================================================= */}
        {/* CAPA DO GUIA PRÁTICO DE RECEITAS                          */}
        {/* ========================================================= */}
        <section id="capa" className="text-center border-b border-slate-800 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-extrabold uppercase tracking-widest mb-6">
            <Award className="w-4 h-4" /> Guia Prático Oficial • 30 Receitas Completas
          </div>

          <div className="max-w-sm sm:max-w-md mx-auto mb-8 rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(245,158,11,0.25)] border-2 border-slate-800/90 group relative">
            <img
                src="/ebook-receitas/capa-receitas.webp"
                alt="Capa do E-book: Guia Prático 30 Receitas à Prova de Congelamento - Produzido por Projetos Mautex"
                width={560}
                height={748}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block mb-2">
            Produzido por: Projetos Mautex
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            GUIA PRÁTICO: 30 RECEITAS À PROVA DE CONGELAMENTO
          </h1>
          <p className="text-base sm:text-xl text-slate-300 mt-3 max-w-2xl mx-auto font-medium">
            Proteínas Suculentas, Assados Práticos, Acompanhamentos e Caldos Desenvolvidos para Manter a Textura Firme, a Cor Viva e Zero Água Após o Micro-ondas.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-emerald-400">
              <ChefHat className="w-4 h-4" /> 100% Testadas no Freezer
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-amber-400">
              <Utensils className="w-4 h-4" /> +200 Combinações de Marmitas
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-sky-400">
              <Sparkles className="w-4 h-4" /> Ingredientes Simples e Acessíveis
            </span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTRODUÇÃO                                                */}
        {/* ========================================================= */}
        <section id="introducao" className="space-y-6 border-b border-slate-800 pb-16">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
              Introdução
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
              O Cardápio Certo para o Congelamento Perfeito
            </h2>
          </div>

          <p>
            Você já sabe como congelar e descongelar. Agora, precisa do cardápio certo. Nem toda receita sobrevive ao freezer. Um estrogonofe com creme de leite fresco vai talhar. Uma batata inglesa vai virar esponja.
          </p>

          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-l-4 border-emerald-400 p-5 sm:p-6 rounded-r-2xl border-y border-r border-emerald-500/20 shadow-lg">
            <p className="text-slate-100 font-medium leading-relaxed">
              Neste guia, você tem <strong className="text-emerald-400 font-black">30 receitas desenvolvidas com um único objetivo: perfeição pós-congelamento</strong>. Elas foram divididas em proteínas, assados práticos, acompanhamentos e caldos. Todas mantêm a textura firme, a cor viva e não soltam água após passarem pelo micro-ondas.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 1: PROTEÍNAS SUCULENTAS (RECEITAS 1 A 10)       */}
        {/* ========================================================= */}
        <section id="categoria-1" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-rose-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-rose-400 block">
                Categoria 1 • Receitas 01 a 10
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Proteínas Suculentas (Carnes e Frangos)
              </h2>
            </div>

            <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-5 flex items-start gap-3.5 mb-8">
              <Beef className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-rose-300">Regra de Ouro da Categoria:</strong> O segredo das proteínas no freezer é sempre congelar com um pouco do próprio molho ou umidade natural para proteger as fibras da carne.
              </p>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-receitas/cat1-proteinas.webp"
                alt="Carnes e frangos suculentos preparados com molho encorpado para congelamento perfeito"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-rose-400">Categoria 1:</strong> Proteínas seladas e envolvidas em molhos e gorduras naturais protetoras que blindam a suculência no freezer.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 1 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #01</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">1. Carne de Panela Desfiada Curinga</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 40 min (Pressão)
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
              <strong className="text-white">O que é:</strong> Uma base suculenta e super temperada. O molho denso envolve a carne, impedindo totalmente o ressecamento no freezer. Pode ser comida pura ou usada como recheio de escondidinhos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>1kg de acém ou patinho cortado em cubos</li>
                  <li>2 cebolas picadas</li>
                  <li>4 dentes de alho amassados</li>
                  <li>1 lata de tomate pelado</li>
                  <li>Sal, azeite e pimenta-do-reino a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Aqueça o azeite e doure bem os cubos de carne (isso sela os sucos na carne).</li>
                  <li>Adicione a cebola, o alho e o tomate pelado.</li>
                  <li>Cubra com água quente até passar dois dedos do nível da carne.</li>
                  <li>Tampe e deixe na pressão por 40 minutos.</li>
                  <li>Abra a panela e desfie a carne dentro do próprio molho que se formou.</li>
                </ol>
              </div>
            </div>

            {/* Dica de Equipamento: Panela de Pressão Elétrica */}
            <div className="my-6 rounded-lg border border-orange-100 bg-orange-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">O Segredo da Carne que Desmancha</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Fazer carne de panela no fogão comum exige vigilância. Para que a carne fique no ponto de desfiar sem risco de queimar, uma <strong>panela de pressão elétrica</strong> é imbatível. Ela faz todo o processo sozinha, não chia e desliga automaticamente.
              </p>
              <a
                href="https://meli.la/12rafjT"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 shadow-sm"
              >
                🛒 Ver Panela de Pressão Elétrica Recomendada
              </a>
            </div>
          </div>

          {/* RECEITA 2 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #02</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">2. Frango Desfiado ao Molho Vermelho</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 25 min (Pressão)
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
              <strong className="text-white">O que é:</strong> O clássico das marmitas fitness. Feito para não ficar "farelento". O toque de páprica e o molho de tomate garantem a umidade exata após o descongelamento.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>1kg de peito de frango limpo</li>
                  <li>1 cebola picada</li>
                  <li>2 dentes de alho</li>
                  <li>1 colher de chá de páprica defumada</li>
                  <li>1 sachê de molho de tomate</li>
                  <li>Sal e azeite a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Refogue o frango com o azeite, cebola, alho, páprica e sal.</li>
                  <li>Coloque 1 xícara de água, tampe e deixe na pressão por 15 minutos.</li>
                  <li>Escorra o restinho de água, feche a panela sem pressão e sacuda vigorosamente para desfiar o frango em segundos.</li>
                  <li>Adicione o sachê de molho de tomate, ligue o fogo e ferva por 2 minutos para encorpar.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 3 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #03</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">3. Carne Moída Soltinha com Cenoura</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 20 min (Fogão)
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
              <strong className="text-white">O que é:</strong> Carne moída perfeita e sem água no fundo do pote. A cenoura ralada derrete durante o cozimento, criando uma textura aveludada que o freezer não consegue destruir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de patinho moído</li>
                  <li>1 cenoura grande ralada bem fina</li>
                  <li>1 cebola e 2 dentes de alho picados</li>
                  <li>Cheiro-verde, azeite e sal a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Coloque a carne na panela quente sem óleo. Mexa até toda a água que a carne solta secar completamente.</li>
                  <li>Adicione um fio de azeite, a cebola e o alho. Refogue.</li>
                  <li>Misture a cenoura ralada. Abaixe o fogo e mexa até a cenoura murchar totalmente. Finalize com cheiro-verde.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Ralador e Fatiador Multifuncional */}
            <div className="my-6 rounded-lg border border-green-100 bg-green-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥕</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Rale em Segundos</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Ralar cenoura na espessura certa para que ela derreta na carne dá trabalho no ralador comum. Para agilizar sua produção de domingo, recomendamos um <strong>ralador e fatiador de legumes multifuncional</strong>. Ele rala, fatia e corta legumes em segundos com precisão de restaurante.
              </p>
              <a
                href="https://meli.la/2bf6yHr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 shadow-sm"
              >
                🛒 Ver Ralador e Cortador Multifuncional
              </a>
            </div>
          </div>

          {/* RECEITA 4 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #04</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">4. Picadinho de Patinho com Vagem</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 30 min (Fogão)
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
              <strong className="text-white">O que é:</strong> Um ensopadinho rápido onde a carne e o legume cozinham juntos. A vagem congela muito bem quando preparada "al dente" (firme).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de patinho em cubos pequenos</li>
                  <li>1 xícara de vagem picada em rodelas médias</li>
                  <li>1 colher de sopa de shoyu</li>
                  <li>Alho, cebola e sal a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Sele os cubos de carne em fogo bem alto para não soltarem muita água.</li>
                  <li>Junte a cebola, o alho e o shoyu. Misture bem.</li>
                  <li>Adicione a vagem e meia xícara de água quente.</li>
                  <li>Abaixe o fogo, tampe a panela e deixe cozinhar até a vagem ficar cozida, mas ainda ligeiramente crocante.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 5 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #05</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">5. Almôndegas Assadas ao Sugo</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 35 min (Forno + Fogão)
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
              <strong className="text-white">O que é:</strong> Bolinhas de carne assadas de forma prática no forno e finalizadas no molho. A aveia na massa funciona como uma "esponja" interna que retém a umidade da carne no freezer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de carne moída</li>
                  <li>1 ovo</li>
                  <li>2 colheres de sopa de aveia em flocos finos</li>
                  <li>Sal, pimenta e temperos secos a gosto</li>
                  <li>1 sachê de molho de tomate</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Em uma tigela, misture a carne, o ovo, a aveia e os temperos com as mãos até dar liga.</li>
                  <li>Molde as bolinhas e coloque em uma assadeira levemente untada.</li>
                  <li>Asse a 200°C por 20 minutos.</li>
                  <li>Retire do forno e mergulhe as almôndegas no molho de tomate aquecido na panela.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Tapete de Silicone Culinário */}
            <div className="my-6 rounded-lg border border-rose-100 bg-rose-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🍳</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Adeus Assadeiras Grudadas</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Assar almôndegas ou legumes solta resíduos que grudam e são um pesadelo para lavar depois. Usar um <strong>tapete de silicone culinário</strong> no fundo da sua forma cria uma superfície 100% antiaderente. Nada gruda, vai direto ao forno e lava em 10 segundos.
              </p>
              <a
                href="https://meli.la/1uNBJwp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 shadow-sm"
              >
                🛒 Ver Tapete de Silicone Antiaderente para Forno
              </a>
            </div>
          </div>

          {/* RECEITA 6 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #06</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">6. Iscas de Frango Aceboladas</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 15 min (Fogão)
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
              <strong className="text-white">O que é:</strong> Tiras de frango ricas em sabor e cor, com a cebola caramelizada trazendo o toque doce que disfarça qualquer gosto de "comida requentada".
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>600g de peito de frango em tiras</li>
                  <li>2 cebolas fatiadas em meia-lua</li>
                  <li>1 colher de azeite</li>
                  <li>1 colher de chá de açafrão ou cúrcuma</li>
                  <li>Sal a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Aqueça bem a frigideira. Grelhe as iscas aos poucos (se jogar tudo de uma vez, vira uma sopa).</li>
                  <li>Quando as tiras estiverem bem douradas, adicione as cebolas fatiadas e o açafrão.</li>
                  <li>Mexa constantemente até a cebola murchar e caramelizar nos sucos do frango.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 7 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #07 • Adaptação Inteligente</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">7. Estrogonofe à Prova de Freezer (Sem Creme de Leite)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 20 min (Fogão)
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
              <strong className="text-white">O que é:</strong> Uma adaptação inteligente do prato mais amado do Brasil. Creme de leite de caixinha talha e separa a gordura no freezer. Usar requeijão resolve esse problema e garante um creme homogêneo e aveludado.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de peito de frango ou carne em cubos</li>
                  <li>2 colheres de sopa de ketchup</li>
                  <li>1 colher de sopa de mostarda</li>
                  <li>200g de requeijão cremoso tradicional ou de bisnaga</li>
                  <li>Sal e alho a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Refogue o frango com alho e sal até cozinhar completamente.</li>
                  <li>Misture o ketchup e a mostarda e deixe ferver por 1 minuto.</li>
                  <li>Desligue o fogo. Imediatamente após desligar, incorpore o requeijão cremoso e misture até virar um creme uniforme.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 8 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #08</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">8. Lombo Suíno em Cubos com Limão</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 25 min (Fogão)
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
              <strong className="text-white">O que é:</strong> Carne de porco macia, selada na frigideira com uma crosta dourada e o frescor cítrico do limão que penetra nas fibras.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de lombo suíno cortado em cubos</li>
                  <li>Suco de 2 limões espremidos</li>
                  <li>3 dentes de alho picados</li>
                  <li>Sal a gosto e 1 fio de óleo/azeite</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Tempere os cubos de lombo com o limão, o alho e o sal. Deixe descansar por 15 minutos para absorver o sabor.</li>
                  <li>Aqueça a frigideira ao máximo com o óleo.</li>
                  <li>Sele os cubos até dourar todos os lados, aproveitando o caldinho da marinada no final para desgrudar o fundo da panela e criar um molho rápido.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Kit de Facas em Aço Inox */}
            <div className="my-6 rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🔪</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Cortes Precisos, Sem Esforço</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                O segredo para um cozimento rápido é cortar carnes e legumes no tamanho exato. Uma faca cega amassa as fibras da carne e atrasa sua vida. Recomendamos um <strong>kit de facas em aço inox</strong> bem afiadas. Elas deslizam na carne como se fosse manteiga, reduzindo seu tempo de preparo pela metade.
              </p>
              <a
                href="https://meli.la/1tbt4dJ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 shadow-sm"
              >
                🛒 Ver Kit de Facas em Aço Inox Recomendado
              </a>
            </div>
          </div>

          {/* RECEITA 9 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #09</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">9. Sobrecoxas Desossadas Assadas</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 45 min (Forno)
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
              <strong className="text-white">O que é:</strong> A parte mais suculenta do frango temperada de forma rústica. Assar a carne sem osso acelera o tempo de forno e facilita o encaixe nas marmitas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>1kg de sobrecoxa sem osso e sem pele</li>
                  <li>2 colheres de sopa de mostarda</li>
                  <li>1 colher de azeite</li>
                  <li>Sal, pimenta e orégano a gosto</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Em uma vasilha, envolva as sobrecoxas na mostarda, azeite e temperos.</li>
                  <li>Coloque em uma assadeira forrada com papel alumínio (para manter a umidade do fundo).</li>
                  <li>Asse em forno pré-aquecido a 200°C por cerca de 45 minutos ou até as bordas ficarem bem douradas.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 10 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #10 • Clássico Regional</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">10. Carne de Sol Desfiada na Manteiga</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 40 min (Pressão)
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
              <strong className="text-white">O que é:</strong> Um prato regional incrivelmente resistente ao congelamento. A manteiga da terra (ou de garrafa) cria uma camada protetora sobre a carne que impede a formação de cristais de gelo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de carne de sol já dessalgada</li>
                  <li>1 cebola roxa cortada em tiras finas</li>
                  <li>1 colher de sopa de manteiga (preferencialmente de garrafa)</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Coloque a carne de sol na panela de pressão com água e cozinhe por cerca de 30 minutos até ficar macia.</li>
                  <li>Escorra a água, espere amornar e desfie bem a carne.</li>
                  <li>Em uma frigideira grande, derreta a manteiga e refogue a cebola roxa.</li>
                  <li>Adicione a carne desfiada e mexa por 3 minutos para absorver toda a gordura da manteiga.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 2: ESCONDIDINHOS E ASSADOS (RECEITAS 11 A 20)   */}
        {/* ========================================================= */}
        <section id="categoria-2" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-amber-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
                Categoria 2 • Receitas 11 a 20
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Escondidinhos e Assados (As Marmitas de Ouro)
              </h2>
            </div>

            <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 flex items-start gap-3.5 mb-8">
              <Layers className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-amber-300">Por que são as Marmitas de Ouro:</strong> Essas são as melhores opções para congelar. A massa protege o recheio e o prato sai do micro-ondas com textura de feito na hora.
              </p>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-receitas/cat2-escondidinhos.webp"
                alt="Escondidinho de macaxeira com carne de sol gratinado com queijo de manteiga e assados em potes de vidro"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-amber-400">Categoria 2:</strong> Camadas protetoras de raízes brasileiras e massas estruturadas que blindam o recheio contra o frio extremo.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 11 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #11 • Campeão de Durabilidade</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">11. Escondidinho Clássico de Macaxeira com Carne de Sol</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 50 min (Fogão + Forno)
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
              <strong className="text-white">O que é:</strong> O campeão de durabilidade no freezer. A macaxeira cria uma barreira densa que protege a carne de sol, garantindo um prato suculento após dias congelado.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de purê de macaxeira cozida e amassada</li>
                  <li>300g de carne de sol desfiada</li>
                  <li>Fatias de queijo de manteiga light</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Forre o fundo do pote de vidro com metade do purê de macaxeira.</li>
                  <li>Recheie com a carne de sol desfiada.</li>
                  <li>Cubra com o restante do purê.</li>
                  <li>Coloque uma fatia fina de queijo de manteiga light por cima. <strong>Nota:</strong> Não precisa ir ao forno agora, o queijo derrete lindamente quando a marmita for aquecida no micro-ondas.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 12 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #12</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">12. Escondidinho Maromba (Batata-Doce e Frango)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 40 min
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
              <strong className="text-white">O que é:</strong> A marmita preferida de quem treina. A batata-doce tem baixíssima água livre (pouca umidade solta), o que significa que o descongelamento é impecável e nunca fica aguado.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de purê de batata-doce</li>
                  <li>300g de frango desfiado com molho de tomate</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Amasse bem a batata-doce até virar um purê rústico.</li>
                  <li>Faça a montagem intercalando purê, recheio de frango e purê.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 13 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #13</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">13. Escondidinho de Cará com Carne Moída</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 40 min
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
              <strong className="text-white">O que é:</strong> Uma alternativa regional riquíssima. O cará forma um purê estruturado e muito firme que sustenta perfeitamente recheios mais molhadinhos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>500g de cará cozido e amassado com um pingo de leite</li>
                  <li>300g de carne moída refogada ao sugo</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Misture o cará cozido com um toque mínimo de leite só para dar o ponto de purê.</li>
                  <li>Intercale na marmita com a carne moída refogada.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 14 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #14</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">14. Purê de Banana da Terra com Patinho</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 30 min
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
              <strong className="text-white">O que é:</strong> Uma explosão agridoce que quebra a rotina. A banana da terra cozida vira um purê denso que contrasta incrivelmente com carnes salgadas.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>3 bananas da terra bem maduras</li>
                  <li>300g de patinho desfiado ou moído bem temperado</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Cozinhe as bananas com a casca.</li>
                  <li>Descasque e amasse formando o purê.</li>
                  <li>Monte a marmita intercalando o purê de banana e a carne.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Amassador de Inox */}
            <div className="my-6 rounded-lg border border-orange-100 bg-orange-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥔</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Purê Perfeito em Segundos</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Amassar macaxeira e batata-doce com o garfo dói a mão e deixa pedaços duros. Para fazer os escondidinhos em tempo recorde, você precisa de um <strong>amassador de batatas reforçado em aço inox</strong>. Ele tritura as raízes de uma só vez, criando purês lisos e uniformes sem esforço.
              </p>
              <a
                href="https://meli.la/24CxTxb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700 shadow-sm"
              >
                🛒 Ver Amassador em Aço Inox Recomendado
              </a>
            </div>
          </div>

          {/* RECEITA 15 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #15</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">15. Quibe de Forno Recheado</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 45 min (Forno)
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
              <strong className="text-white">O que é:</strong> Praticidade em forma de assado. O trigo retém a umidade da carne por dentro, e a crosta assada protege o prato no congelador.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>250g de trigo para quibe (hidratado)</li>
                  <li>500g de carne moída crua</li>
                  <li>Hortelã picada, cebola e temperos</li>
                  <li>Fatias de queijo de manteiga light</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Misture a carne crua, o trigo hidratado (esprema bem nas mãos para tirar toda a água) e os temperos.</li>
                  <li>Em uma travessa, coloque metade da massa.</li>
                  <li>Recheie com as fatias de queijo e cubra com o resto da massa.</li>
                  <li>Asse a 200°C por 35 min. Deixe esfriar, corte em pedaços e coloque nas marmitas.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 16 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #16</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">16. Torta de Liquidificador Que Não Racha</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 45 min (Forno)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(16)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[16] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[16] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Uma torta salvadora onde o segredo é usar óleo na massa em vez de manteiga, pois massas à base de óleo não esfarelam nas temperaturas negativas do freezer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>3 ovos, 1 xícara de óleo, 2 xícaras de leite, 2 xícaras de farinha, 1 colher de fermento.</li>
                  <li>Recheio a gosto (frango desfiado, carne moída ou atum).</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Bata os líquidos no liquidificador, depois acrescente os sólidos.</li>
                  <li>Despeje metade da massa na assadeira, espalhe o recheio e cubra com o restante.</li>
                  <li>Asse, corte em quadrados e congele as porções.</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque: Liquidificador Potente */}
            <div className="my-6 rounded-lg border border-rose-100 bg-rose-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🌪️</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">O Motor da Sua Cozinha</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Para bater massas de torta, caldos encorpados e cremes de milho sem deixar o motor cheirando a queimado, um aparelho fraco não dá conta. Recomendamos usar um <strong>liquidificador potente com jarra grande</strong>. Ele tem força de sobra para triturar tudo rápido e capacidade para fazer as receitas da semana inteira de uma vez.
              </p>
              <a
                href="https://meli.la/1hTuacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 shadow-sm"
              >
                🛒 Ver Liquidificador Potente Recomendado
              </a>
            </div>
          </div>

          {/* RECEITA 17 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #17</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">17. Panquecas Integrais de Carne</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 30 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(17)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[17] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[17] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Refeição elegante e fácil de porcionar. A massa fina abraça o recheio, e o molho por cima sela o prato contra o frio.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li><strong>Massa:</strong> 1 ovo, 1 xícara de leite, 1 xícara de farinha integral, pitada de sal.</li>
                  <li><strong>Recheio:</strong> Carne moída refogada.</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Bata os ingredientes da massa e faça os discos finos em uma frigideira.</li>
                  <li>Enrole as panquecas com a carne moída.</li>
                  <li>Posicione nas marmitas e jogue um pouco de molho de tomate por cima (fundamental para a massa não ressecar no freezer).</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 18 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #18</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">18. Fricassê à Prova de Freezer</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 25 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(18)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[18] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[18] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> O clássico de domingo, adaptado para durar 30 dias. Substituímos o creme de leite por requeijão para evitar que o creme talhe ao descongelar.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Frango desfiado bem temperado</li>
                  <li>1 lata de milho verde</li>
                  <li>200g de requeijão cremoso</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Bata no liquidificador o milho (sem a água) com o requeijão.</li>
                  <li>Misture esse creme no frango desfiado ainda quente.</li>
                  <li>Coloque nos potes. (<strong>Atenção:</strong> Não coloque a batata palha no pote para congelar. Adicione-a apenas na hora que for comer).</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 19 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #19</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">19. Bolo de Carne Recheado</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 45 min (Forno)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(19)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[19] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[19] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Fatias grossas de carne que parecem ter saído de um restaurante. O recheio interno garante que a carne asse sem ficar seca.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Mesma massa das almôndegas (Receita 5)</li>
                  <li>Cenoura cortada em palitos e ovos de codorna cozidos para o recheio.</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Abra a massa de carne sobre um plástico filme como se fosse uma manta.</li>
                  <li>Posicione os palitos de cenoura e os ovos no centro e enrole como um rocambole.</li>
                  <li>Asse inteiro. Depois de frio, corte em fatias grossas para colocar nas marmitas.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 20 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400 block">Receita #20</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">20. Escondidinho de Abóbora</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 40 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(20)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[20] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[20] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Um purê leve e super saudável. Assar a abóbora no forno em vez de cozinhar na água é o segredo para que ela não solte água no freezer.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Purê de abóbora cabotiá (assada)</li>
                  <li>Carne seca ou frango desfiado</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Asse a abóbora no forno até a polpa ficar macia.</li>
                  <li>Amasse bem e monte a marmita seguindo a proporção dos demais escondidinhos.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 3: BASES E ACOMPANHAMENTOS (RECEITAS 21 A 27)   */}
        {/* ========================================================= */}
        <section id="categoria-3" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-emerald-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
                Categoria 3 • Receitas 21 a 27
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Bases e Acompanhamentos
              </h2>
            </div>

            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-5 flex items-start gap-3.5 mb-8">
              <Wheat className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-emerald-300">O Segredo dos Acompanhamentos:</strong> Cozinhe os vegetais sempre <strong>"al dente" (durinhos)</strong>, pois o micro-ondas terminará o cozimento na hora de aquecer.
              </p>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-receitas/cat3-acompanhamentos.webp"
                alt="Arroz branco soltinho, feijão de caldo grosso, mix de raízes assadas com alecrim e brócolis branqueado na manteiga"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-emerald-400">Categoria 3:</strong> Grãos soltinhos, feijão encorpado, raízes assadas e vegetais vibrantes que completam 75% da sua marmita.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 21 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #21</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">21. Arroz Branco Soltinho Infalível</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 20 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(21)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[21] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[21] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> A base da nossa alimentação, feita com a técnica correta para não virar um bloco de pedra empapado no gelo.
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Arroz branco, alho, óleo e sal.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Lave o arroz em uma peneira até a água sair transparente (isso tira o excesso de amido que empedra no freezer). Refogue com bastante alho e apenas um fio bem leve de óleo. Adicione água fervente e cozinhe até secar.</p>
            </div>
          </div>

          {/* RECEITA 22 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #22</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">22. Arroz Integral com Cenoura</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 35 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(22)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[22] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[22] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Uma base riquíssima em fibras. O arroz integral suporta o congelamento ainda melhor que o branco por ter a casca rígida.
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Arroz integral, cenoura ralada, cebola e azeite.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Refogue a cebola e a cenoura ralada. Adicione o arroz integral (não precisa lavar) e a água. A cenoura derrete e confere uma umidade natural perfeita ao grão.</p>
            </div>
          </div>

          {/* RECEITA 23 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #23</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">23. Feijão de Caldo Grosso</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 45 min (Pressão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(23)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[23] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[23] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Feijão caseiro com caldo espesso. Caldos muito ralos cristalizam e separam a água da massa do feijão no freezer.
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Feijão, louro, alho e azeite.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Cozinhe na pressão. O segredo para congelar: após cozido e temperado, pegue duas conchas cheias de feijão, amasse com o garfo e devolva para a panela. Ferva por 5 minutos para o caldo engrossar bastante.</p>
            </div>
          </div>

          {/* RECEITA 24 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #24</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">24. Purê de Macaxeira Rústico</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 30 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(24)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[24] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[24] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> O melhor substituto para o purê de batata inglesa (que fica aguado).
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Macaxeira, sal e a água do próprio cozimento.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Cozinhe a macaxeira com sal até desmanchar. Amasse vigorosamente. Adicione apenas um pouquinho do caldo do próprio cozimento (em vez de leite) para dar a liga. Congela de forma perfeita.</p>
            </div>
          </div>

          {/* RECEITA 25 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #25</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">25. Mix de Raízes Assadas</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 35 min (Forno)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(25)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[25] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[25] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> O acompanhamento mais prático e com a melhor textura pós-congelamento.
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Batata-doce, cará, cenoura, azeite, sal e alecrim.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Corte tudo em cubos médios. Coloque na assadeira, regue com azeite, sal e alecrim. Asse a 200°C por 30 min.</p>
            </div>
          </div>

          {/* RECEITA 26 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #26</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">26. Vegetais Branqueados na Manteiga</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 10 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(26)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[26] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[26] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Brócolis e couve-flor que continuam verdes e crocantes após semanas no gelo.
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Buquês de brócolis e couve-flor, água, gelo, manteiga e sal.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Faça o choque térmico (Branqueamento): água fervente por 2 minutos e direto para uma bacia de água com gelo. Escorra bem e passe rapidamente em uma frigideira com manteiga só para pegar sabor.</p>
            </div>

            {/* Bloco de Destaque: Escumadeira de Inox */}
            <div className="my-6 rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥦</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Branqueamento sem Queimar as Mãos</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Para fazer o choque térmico correto, você precisa tirar os vegetais da água fervente todos de uma vez em questão de segundos. Uma <strong>escumadeira aranha larga em aço inox</strong> permite retirar os vegetais rapidamente, parando o cozimento na hora certa e garantindo a crocância.
              </p>
              <a
                href="https://meli.la/2dXmj4J"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-sm"
              >
                🛒 Ver Escumadeira Larga em Aço Inox
              </a>
            </div>
          </div>

          {/* RECEITA 27 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">Receita #27</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">27. Grão-de-Bico Refogado</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 25 min (Pressão)
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(27)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[27] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[27] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Um substituto incrível para o feijão, com uma textura muito estável que não desmancha no frio.
            </p>
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-2 text-sm text-slate-200">
              <p><strong className="text-emerald-400">Ingredientes:</strong> Grão-de-bico (deixado de molho), azeite, alho e páprica.</p>
              <p><strong className="text-amber-400">Modo de Preparo:</strong> Cozinhe na pressão por 15 min. Escorra a água e refogue bem na frigideira com azeite, alho picado e páprica para ganhar uma cor dourada e sabor intenso.</p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CATEGORIA 4: CALDOS E SOPAS (RECEITAS 28 A 30)            */}
        {/* ========================================================= */}
        <section id="categoria-4" className="space-y-12">
          <div>
            <div className="border-l-4 border-purple-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 block">
                Categoria 4 • Receitas 28 a 30
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                Caldos e Sopas (Jantares de 3 Minutos)
              </h2>
            </div>

            <div className="bg-purple-950/20 border border-purple-500/30 rounded-2xl p-5 flex items-start gap-3.5 mb-8">
              <Soup className="w-6 h-6 text-purple-400 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                <strong className="text-purple-300">Praticidade Noturna:</strong> Caldos são as refeições que mais rápido descongelam no micro-ondas. Ideais para a noite!
              </p>
            </div>

            <figure className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 mb-8">
              <img
                src="/ebook-receitas/cat4-caldos.webp"
                alt="Caldo verde de macaxeira com linguiça e couve, caldo de abóbora com gengibre e frango, e caldo de feijão encorpado com bacon"
                width={640}
                height={360}
                loading="lazy"
                decoding="async"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-5 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-purple-400">Categoria 4:</strong> Cremes densos e aveludados que não separam água ao descongelar e ficam prontos em 3 minutos no micro-ondas.
              </figcaption>
            </figure>
          </div>

          {/* RECEITA 28 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 block">Receita #28</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">28. Caldo Verde de Macaxeira (O Fim da Batata Esponjosa)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 25 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(28)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[28] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[28] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> A versão inteligente do caldo verde. Ao usar macaxeira em vez de batata inglesa, você zera o risco do creme ficar talhado e aguado após o descongelamento.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Macaxeira cozida</li>
                  <li>Água do próprio cozimento</li>
                  <li>Linguiça fininha refogada</li>
                  <li>Couve fatiada</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Bata a macaxeira no liquidificador com a água do próprio cozimento até virar um creme homogêneo.</li>
                  <li>Despeje na panela, ferva e adicione a linguiça refogada.</li>
                  <li>Desligue o fogo e jogue a couve fatiada. A couve deve murchar apenas com o calor residual para não amargar.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 29 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 block">Receita #29</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">29. Caldo de Abóbora com Gengibre e Frango</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 30 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(29)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[29] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[29] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> Um jantar leve, termogênico e reconfortante. A abóbora bate maravilhosamente bem e vira um creme liso.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Abóbora cabotiá</li>
                  <li>1 lasca de gengibre</li>
                  <li>Frango desfiado</li>
                  <li>Cebola e alho</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Cozinhe a abóbora em pedaços com o gengibre e os temperos.</li>
                  <li>Bata tudo no liquidificador até virar creme.</li>
                  <li>Volte para a panela e incorpore o frango desfiado já pronto.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* RECEITA 30 */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-400 block">Receita #30</span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">30. Caldo de Feijão Encorpado</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-bold">
                  <Clock className="w-3.5 h-3.5" /> 15 min
                </span>
                <button
                  type="button"
                  onClick={() => toggleReceitaFeita(30)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    receitasFeitas[30] ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 border border-slate-700 text-slate-400 hover:text-white'
                  }`}
                >
                  {receitasFeitas[30] ? '✓ Feita' : 'Marcar Feita'}
                </button>
              </div>
            </div>
            <p className="text-slate-300 text-sm sm:text-base">
              <strong className="text-white">O que é:</strong> O jeito mais inteligente de aproveitar as sobras de feijão da semana sem desperdício.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Utensils className="w-4 h-4" /> Ingredientes
                </h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  <li>Sobras de feijão cozido</li>
                  <li>Alho picado</li>
                  <li>Bacon em cubinhos</li>
                </ul>
              </div>
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Modo de Preparo
                </h4>
                <ol className="space-y-2 text-sm text-slate-200 list-decimal pl-5">
                  <li>Bata o feijão que sobrou no liquidificador com um pouquinho de água.</li>
                  <li>Refogue bastante alho e os cubinhos de bacon em uma panela.</li>
                  <li>Jogue o creme de feijão na panela e deixe ferver até reduzir e engrossar bastante. Congele em potes menores (tipo cumbuca).</li>
                </ol>
              </div>
            </div>

            {/* Bloco de Destaque Final: Mixer de Mão Vertical */}
            <div className="my-6 rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥣</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Sopas Cremosas Diretamente na Panela</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Ficar transferindo sopa quente da panela para o liquidificador faz sujeira e é perigoso. Um <strong>mixer de mão vertical com haste em inox</strong> permite que você triture o caldo de feijão ou a abóbora direto na panela que está no fogo. Você suja menos louça e acelera o jantar.
              </p>
              <a
                href="https://meli.la/1AiBPPt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-sm"
              >
                🛒 Ver Mixer de Mão em Inox Recomendado
              </a>
            </div>
          </div>

          {/* ========================================================= */}
          {/* AVISO DE SUCESSO FINAL                                    */}
          {/* ========================================================= */}
          <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-amber-950/40 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8" />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
              Cardápio Completo Dominado
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Mais de 200 Combinações Diferentes na Sua Mão!
            </h3>
            <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
              <strong>Aviso de Sucesso:</strong> Com essas 30 opções, você tem mais de <strong>200 combinações diferentes de marmitas</strong> (Ex: <em>Arroz Integral + Frango ao Molho Vermelho + Brócolis Branqueado</em>). Monte seu cardápio, faça sua lista e aproveite a sua nova rotina!
            </p>
          </div>
        </section>
      </article>
    </div>
  );
}
