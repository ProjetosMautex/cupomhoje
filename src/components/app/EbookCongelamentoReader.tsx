import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  X,
  CheckCircle2,
  ThermometerSnowflake,
  ShieldAlert,
  Clock,
  Tag,
  Sparkles,
  Check,
  Flame,
  Snowflake,
  PackageCheck,
  Utensils,
  Award,
  ThumbsUp,
  Ban,
  Search,
  Wheat,
  Beef,
  Salad,
  Soup,
  ChefHat,
  Timer,
  Layers,
  PieChart,
  Droplets,
  Zap,
  PartyPopper,
  Bookmark,
  Share2
} from 'lucide-react';

interface TermoInfo {
  titulo: string;
  resumo: string;
  detalhe: string;
}

const GLOSSARIO_CULINARIO: Record<string, TermoInfo> = {
  'Conservação Térmica': {
    titulo: 'Ciência da Conservação Térmica',
    resumo: 'O controle exato do frio para pausar o envelhecimento natural da comida sem destruir suas fibras.',
    detalhe:
      'Quando resfriamos e congelamos na velocidade correta e sem ar, os cristais de gelo formados são microscópicos. Isso preserva o sabor de comida fresca, os nutrientes e a textura original de carnes, grãos e legumes.'
  },
  'Banho-Maria Invertido': {
    titulo: 'Banho-Maria Invertido (Choque Térmico Frio)',
    resumo: 'Técnica profissional para esfriar alimentos rapidamente antes de levar à geladeira ou freezer.',
    detalhe:
      'Basta colocar a panela quente (ou os potes de vidro temperado) dentro de uma bacia maior com água fria e pedras de gelo. Isso derruba a temperatura em poucos minutos, evitando que a comida passe muito tempo na zona de risco de bactérias e impedindo a formação de vapor na tampa.'
  },
  'Queimaduras de Congelamento': {
    titulo: 'Queimadura de Congelamento (Freezer Burn)',
    resumo: 'Manchas esbranquiçadas ou acinzentadas causadas pelo contato direto do ar seco do freezer com o alimento.',
    detalhe:
      'Não significa que a comida estragou, mas o ar frio desidrata a superfície do alimento, deixando carnes secas como sola de sapato e alterando o gosto. O bloqueio total de ar (potes herméticos ou sacos bem vedados) elimina 100% esse problema.'
  },
  'Herméticos': {
    titulo: 'Potes Herméticos (Vedação Total)',
    resumo: 'Potes com anel de silicone na tampa e travas laterais que impedem a passagem de ar e líquidos.',
    detalhe:
      'Diferente dos potes comuns de sorvete ou margarina, os potes herméticos bloqueiam a entrada do ar seco do freezer e impedem que o cheiro de outros alimentos passe para a sua marmita.'
  },
  'Livre de BPA': {
    titulo: 'Plástico Livre de BPA (Bisfenol A)',
    resumo: 'Selo de segurança que garante que o pote plástico não libera substâncias tóxicas na comida.',
    detalhe:
      'O Bisfenol A (BPA) é um composto químico presente em plásticos comuns que se solta quando submetido ao calor do micro-ondas ou ao congelamento extremo. Sempre verifique no fundo do pote o símbolo "BPA Free" ou prefira potes de vidro borossilicato/temperado.'
  },
  'Espaço de Expansão': {
    titulo: 'Regra de 1 Dedo (Espaço de Expansão)',
    resumo: 'Folga de cerca de 1,5 a 2 cm entre a comida e a tampa do pote.',
    detalhe:
      'A água presente nos alimentos e molhos aumenta de volume em cerca de 9% quando vira gelo. Deixar um dedo de espaço livre evita que a tampa estufe, quebre as travas ou rache o pote de vidro dentro do freezer.'
  },
  'Contaminação Cruzada e Bacteriana': {
    titulo: 'Zona de Perigo (Proliferação Bacteriana)',
    resumo: 'O risco invisível de descongelar um alimento, usar só uma parte e recongelar o restante cru ou pronto.',
    detalhe:
      'Quando o alimento descongela, as bactérias que estavam "adormecidas" pelo frio voltam a se multiplicar rapidamente. Ao recongelar, você guarda uma carga muito maior de microrganismos que podem causar intoxicação alimentar.'
  },
  'Branqueamento': {
    titulo: 'Branqueamento de Vegetais',
    resumo: 'Técnica de restaurante que cozinha o legume por 2 minutos na água fervente e dá choque térmico no gelo.',
    detalhe:
      'Os vegetais crus possuem enzimas naturais que continuam agindo mesmo no freezer, deixando o legume murcho, escuro e com gosto amargo. O branqueamento desativa essas enzimas instantaneamente, fixa a clorofila (deixando o verde muito mais vivo) e preserva a crocância.'
  },
  'Cristais de Gelo Celulares': {
    titulo: 'A Água Dentro das Células dos Alimentos',
    resumo: 'Por que alguns alimentos ficam esponjosos (como a batata inglesa) enquanto raízes firmes ficam perfeitas.',
    detalhe:
      'Alimentos com muita água livre e pouca fibra densa sofrem quando a água congela e expande, rompendo as paredes celulares. Ao descongelar, a água escorre e sobra uma estrutura oca e esponjosa. Já a macaxeira, o cará e a batata-doce têm amido denso que segura a estrutura intacta.'
  },
  'Mise en Place': {
    titulo: 'Mise en Place ("Tudo no Lugar")',
    resumo: 'Expressão francesa usada por chefs que significa deixar todos os ingredientes picados e separados antes de ligar o fogo.',
    detalhe:
      'É o segredo número 1 para cozinhar em 2 horas sem estresse e sem queimar nada. Ao descascar raízes, cortar carnes e picar todo o alho e cebola de uma só vez no início, você suja a tábua e a faca apenas uma vez e abastece todas as panelas em minutos.'
  },
  'Regra da Proporção 50-25-25': {
    titulo: 'A Regra da Proporção (50% / 25% / 25%)',
    resumo: 'Divisão visual simples do pote para garantir saciedade, nutrição e equilíbrio calórico sem precisar de balança.',
    detalhe:
      'Preencha metade do pote (50%) com vegetais branqueados ricos em fibras, um quarto (25%) com proteínas suculentas (carne de panela ou frango) e o último quarto (25%) com carboidratos complexos de qualidade (arroz soltinho, macaxeira, cará ou batata-doce).'
  },
  'Descongelamento Programado': {
    titulo: 'Descongelamento Lento Sob Refrigeração',
    resumo: 'Passar a marmita do freezer para a prateleira de baixo da geladeira na noite anterior.',
    detalhe:
      'Quando o gelo derrete lentamente a 4 °C dentro da geladeira, as fibras da carne e dos grãos conseguem reabsorver a própria água gradualmente. Isso impede que a comida "sangre" água no fundo do pote e reduz o tempo de micro-ondas para apenas 2 minutos.'
  },
  'Estufa em Miniatura': {
    titulo: 'Truque da Estufa em Miniatura (Vapor Controlado)',
    resumo: 'Adicionar 1 colher de sopa de água filtrada e deixar a tampa semiaberta no micro-ondas.',
    detalhe:
      'As ondas do micro-ondas aquecem agitando as moléculas de água, o que resseca a superfície do arroz e das raízes. Com 1 colher de sopa de água extra e a tampa solta por cima, forma-se uma nuvem de vapor que hidrata os grãos por igual, devolvendo textura de comida recém-saída da panela.'
  },
  'Regra do 2x2': {
    titulo: 'Regra do 2x2 (Cardápio Inteligente sem Complicação)',
    resumo: 'Escolher apenas 2 bases de carboidrato e 2 opções de proteína para montar combinações variadas na primeira semana.',
    detalhe:
      'Tentar fazer 7 pratos diferentes no domingo gera cansaço e desistência. Com apenas 2 carboidratos (ex: arroz soltinho + purê de macaxeira) e 2 proteínas (ex: carne de panela + frango desfiado), você cria 4 combinações distintas usando metade do tempo e metade das panelas!'
  }
};

interface AlimentoGuia {
  nome: string;
  categoria: string;
  status: 'perfeito' | 'evitar';
  dica: string;
}

const BANCO_ALIMENTOS: AlimentoGuia[] = [
  { nome: 'Macaxeira / Mandioca (pedaços ou purê)', categoria: 'Carboidratos e Raízes', status: 'perfeito', dica: 'Campeã do freezer! Tem pouca água e muita massa, mantendo sabor e textura intactos.' },
  { nome: 'Batata-doce (assada ou cozida)', categoria: 'Carboidratos e Raízes', status: 'perfeito', dica: 'Congela super bem em rodelas, cubos ou purê sem ficar aguada.' },
  { nome: 'Cará / Inhame', categoria: 'Carboidratos e Raízes', status: 'perfeito', dica: 'Estrutura densa que resiste perfeitamente ao congelamento.' },
  { nome: 'Arroz branco ou integral', categoria: 'Carboidratos e Raízes', status: 'perfeito', dica: 'Faça bem soltinho e com pouco óleo para descongelar parecendo feito na hora.' },
  { nome: 'Batata inglesa cozida em pedaços', categoria: 'Carboidratos e Raízes', status: 'evitar', dica: 'Absorve muita água e, ao descongelar, fica farelenta e com textura de esponja.' },
  { nome: 'Macarrão cozido além do ponto', categoria: 'Carboidratos e Raízes', status: 'evitar', dica: 'Se passar do ponto al dente, vira uma massa disforme e quebradiça ao reaquecer.' },
  { nome: 'Carne de panela desfiada com molho', categoria: 'Proteínas e Laticínios', status: 'perfeito', dica: 'O molho protege as fibras da carne e mantém a suculência total.' },
  { nome: 'Peito de frango desfiado ou grelhado', categoria: 'Proteínas e Laticínios', status: 'perfeito', dica: 'Com temperos e umidade natural, mantém a maciez por até 30 dias.' },
  { nome: 'Carne moída e bifes com molho', categoria: 'Proteínas e Laticínios', status: 'perfeito', dica: 'Congelam excepcionalmente bem e pegam ainda mais sabor.' },
  { nome: 'Peixes sem espinhos', categoria: 'Proteínas e Laticínios', status: 'perfeito', dica: 'Ótima opção leve; prefira preparos ensopados ou assados com azeite.' },
  { nome: 'Queijo de manteiga light / Queijos firmes', categoria: 'Proteínas e Laticínios', status: 'perfeito', dica: 'Ralado ou em fatias, suporta bem o frio e derrete lindamente ao aquecer.' },
  { nome: 'Ovos cozidos inteiros', categoria: 'Proteínas e Laticínios', status: 'evitar', dica: 'A clara perde água no freezer e fica dura com textura de borracha.' },
  { nome: 'Carnes fritas à milanesa / Empanados', categoria: 'Proteínas e Laticínios', status: 'evitar', dica: 'A umidade interna amolece a casquinha e perde completamente a crocância.' },
  { nome: 'Arroz com leite fresco', categoria: 'Proteínas e Laticínios', status: 'evitar', dica: 'O leite fresco tende a talhar e separar a gordura da água quando reaquecido.' },
  { nome: 'Brócolis, Cenoura e Vagem', categoria: 'Vegetais', status: 'perfeito', dica: 'Ficam vibrantes e crocantes desde que passem por 2 minutos de Branqueamento antes!' },
  { nome: 'Alface, Rúcula, Tomate cru, Pepino e Rabanete', categoria: 'Vegetais', status: 'evitar', dica: 'Ricos em água livre; murcham completamente e soltam água na marmita.' },
  { nome: 'Banana da terra crua (para comer pura)', categoria: 'Vegetais', status: 'evitar', dica: 'Escurece e perde a firmeza. Congele bananas apenas para bolos ou vitaminas.' },
  { nome: 'Molho de tomate caseiro e Caldos (carne/frango)', categoria: 'Molhos e Temperos', status: 'perfeito', dica: 'Podem até ser congelados em forminhas de gelo para salvar qualquer prato do ressecamento.' },
  { nome: 'Temperos batidos (alho, cebola e azeite)', categoria: 'Molhos e Temperos', status: 'perfeito', dica: 'Praticidade pura na cozinha; o azeite conserva o aroma fresco.' },
  { nome: 'Maionese, Iogurte natural e Cremes com amido de milho', categoria: 'Molhos e Temperos', status: 'evitar', dica: 'Tendem a separar e talhar no descongelamento, deixando aspecto desagradável.' }
];

export default function EbookCongelamentoReader() {
  const [activeTermKey, setActiveTermKey] = useState<string | null>(null);
  const [showFullGlossary, setShowFullGlossary] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showBookmarkTip, setShowBookmarkTip] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [dismissedBanner, setDismissedBanner] = useState<boolean>(false);

  const handleCopyPageLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  // Checklist interativo das 4 Leis de Ouro (Cap 1)
  const [lei1Checked, setLei1Checked] = useState(false);
  const [lei2Checked, setLei2Checked] = useState(false);
  const [lei3Checked, setLei3Checked] = useState(false);
  const [lei4Checked, setLei4Checked] = useState(false);

  // Filtro interativo do Mapa dos Alimentos (Cap 2)
  const [buscaAlimento, setBuscaAlimento] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'perfeito' | 'evitar'>('todos');

  // Checklist da Linha de Produção de 2 Horas (Cap 3)
  const [etapa1Done, setEtapa1Done] = useState(false);
  const [etapa2Done, setEtapa2Done] = useState(false);
  const [etapa3Done, setEtapa3Done] = useState(false);
  const [etapa4Done, setEtapa4Done] = useState(false);

  // Checklist de Ação da Conclusão (Primeira Semana - 5 Passos)
  const [acao1, setAcao1] = useState(false);
  const [acao2, setAcao2] = useState(false);
  const [acao3, setAcao3] = useState(false);
  const [acao4, setAcao4] = useState(false);
  const [acao5, setAcao5] = useState(false);

  const totalChecked = [lei1Checked, lei2Checked, lei3Checked, lei4Checked].filter(Boolean).length;
  const totalEtapas = [etapa1Done, etapa2Done, etapa3Done, etapa4Done].filter(Boolean).length;
  const totalAcoes = [acao1, acao2, acao3, acao4, acao5].filter(Boolean).length;

  const alimentosFiltrados = BANCO_ALIMENTOS.filter((item) => {
    const matchBusca =
      item.nome.toLowerCase().includes(buscaAlimento.toLowerCase()) ||
      item.categoria.toLowerCase().includes(buscaAlimento.toLowerCase()) ||
      item.dica.toLowerCase().includes(buscaAlimento.toLowerCase());
    const matchStatus = filtroStatus === 'todos' ? true : item.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const TermoTooltip = ({ termo, label }: { termo: string; label?: string }) => {
    return (
      <button
        type="button"
        onClick={() => {
          setActiveTermKey(termo);
          setShowFullGlossary(false);
        }}
        title="Toque para ver a explicação técnica simplificada"
        className="inline-flex items-center gap-1 text-emerald-400 font-bold underline decoration-emerald-500/60 decoration-2 underline-offset-4 hover:text-emerald-300 hover:decoration-emerald-300 transition cursor-pointer mx-0.5 px-1.5 py-0.5 bg-emerald-950/40 rounded-md"
      >
        <span>{label || termo}</span>
        <HelpCircle className="w-3.5 h-3.5 text-emerald-400/90 shrink-0" />
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      {/* PEQUENO BANNER DE RECOMENDAÇÃO: SALVAR NOS FAVORITOS */}
      {!dismissedBanner && (
        <div className="mb-4 bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-950/60 border border-amber-500/40 rounded-2xl p-3.5 sm:px-5 shadow-lg relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pr-6 sm:pr-0">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
                <Bookmark className="w-4 h-4 fill-amber-400/30" />
              </div>
              <div className="text-xs sm:text-sm leading-snug">
                <strong className="text-amber-300 font-extrabold block sm:inline">
                  ⭐ Importante — Não perca seu acesso:{" "}
                </strong>
                <span className="text-slate-200">
                  Esta página é exclusiva e secreta. Salve-a nos seus <strong>Favoritos</strong> agora para consultar sempre que estiver na cozinha!
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
                Clique em <strong>"Copiar Link"</strong> acima e cole em uma conversa com você mesmo no WhatsApp para ter o e-book sempre à mão!
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
            onClick={() => scrollToSection('capitulo-1')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0 cursor-pointer"
          >
            Cap. 1: 4 Leis
          </button>
          <button
            onClick={() => scrollToSection('capitulo-2')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0 cursor-pointer"
          >
            Cap. 2: Alimentos
          </button>
          <button
            onClick={() => scrollToSection('capitulo-3')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0 cursor-pointer"
          >
            Cap. 3: Produção 2h
          </button>
          <button
            onClick={() => scrollToSection('capitulo-4')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0 cursor-pointer"
          >
            Cap. 4: Descongelar
          </button>
          <button
            onClick={() => scrollToSection('conclusao')}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/80 transition shrink-0 cursor-pointer"
          >
            Conclusão ({totalAcoes}/5)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2.5 py-1.5 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition cursor-pointer"
            title="Alternar tamanho da letra"
          >
            {fontSize === 'normal' ? 'A+' : 'A-'}
          </button>

          <button
            type="button"
            onClick={() => {
              setShowFullGlossary(true);
              setActiveTermKey(null);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 rounded-xl transition shadow cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glossário ({Object.keys(GLOSSARIO_CULINARIO).length})</span>
          </button>
        </div>
      </div>

      {/* MODAL DO GLOSSÁRIO TÉCNICO CULINÁRIO */}
      {(activeTermKey || showFullGlossary) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => {
                setActiveTermKey(null);
                setShowFullGlossary(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {activeTermKey && GLOSSARIO_CULINARIO[activeTermKey] && (
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-4 h-4" /> Segredo de Cozinha Profissional
                </div>
                <h4 className="text-2xl font-black text-white mb-2">
                  {GLOSSARIO_CULINARIO[activeTermKey].titulo}
                </h4>
                <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-3.5 rounded-r-xl my-3 text-emerald-300 font-semibold text-sm">
                  {GLOSSARIO_CULINARIO[activeTermKey].resumo}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 mt-4">
                  {GLOSSARIO_CULINARIO[activeTermKey].detalhe}
                </p>
                <button
                  onClick={() => setActiveTermKey(null)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg cursor-pointer"
                >
                  Perfeito, continuar leitura
                </button>
              </div>
            )}

            {showFullGlossary && (
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" /> Guia Rápido de Consulta
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Glossário do Congelamento Perfeito
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Toque em qualquer conceito destacado durante a leitura ou consulte todos os termos técnicos simplificados abaixo:
                </p>

                <div className="space-y-4">
                  {Object.entries(GLOSSARIO_CULINARIO).map(([chave, item]) => (
                    <div key={chave} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                      <h4 className="text-base font-bold text-emerald-400 mb-1">
                        {item.titulo}
                      </h4>
                      <p className="text-xs text-slate-200 font-semibold mb-1.5">
                        {item.resumo}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {item.detalhe}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowFullGlossary(false)}
                  className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition cursor-pointer"
                >
                  Fechar Guia
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CORPO DO E-BOOK */}
      <article
        className={`bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-16 text-slate-200 font-sans ${
          fontSize === 'large' ? 'text-lg sm:text-xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'
        }`}
      >
        {/* ========================================================= */}
        {/* CAPA DO EBOOK                                             */}
        {/* ========================================================= */}
        <section id="capa" className="text-center border-b border-slate-800 pb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-widest mb-6">
            <Award className="w-4 h-4" /> Manual Prático & Ilustrado
          </div>

          <div className="max-w-sm sm:max-w-md mx-auto mb-8 rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)] border-2 border-slate-800/90 group relative">
            <img
              src="/ebook-congelamento/capa.jpg"
              alt="Capa do E-book: O Método do Congelamento Perfeito - O Fim do Desperdício e das Horas Perdidas na Cozinha"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">
            Edição Digital Oficial • Obra Completa (4 Capítulos + Plano de Ação)
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            O MÉTODO DO CONGELAMENTO PERFEITO
          </h1>
          <p className="text-base sm:text-xl text-slate-300 mt-3 max-w-2xl mx-auto font-medium">
            O Fim do Desperdício e das Horas Perdidas na Cozinha: Como Transformar 2 Horas do Seu Domingo em uma Semana Inteira de Refeições Frescas e Saborosas.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-bold">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-emerald-400">
              <Clock className="w-4 h-4" /> 2h no Domingo = Semana Livre
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-amber-400">
              <Utensils className="w-4 h-4" /> Zero Comida Aguada
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-sky-400">
              <Snowflake className="w-4 h-4" /> Conservação Térmica Real
            </span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* INTRODUÇÃO: O FIM DO DESPERDÍCIO E DAS HORAS PERDIDAS     */}
        {/* ========================================================= */}
        <section id="introducao" className="space-y-8 border-b border-slate-800 pb-16">
          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
              Introdução
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
              O Fim do Desperdício e das Horas Perdidas na Cozinha
            </h2>
          </div>

          <p>
            Você já abriu a geladeira em uma quarta-feira à noite, cansado do trabalho, e percebeu que os legumes que comprou no fim de semana já estão murchos? Ou pior: já tentou congelar uma refeição com todo o carinho, mas quando foi comer, o arroz estava empapado, a carne ressecada e tudo tinha um gosto residual de geladeira?
          </p>

          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border-l-4 border-emerald-400 p-5 sm:p-6 rounded-r-2xl border-y border-r border-emerald-500/20 shadow-lg">
            <p className="text-white font-bold text-lg sm:text-xl leading-snug">
              Se você respondeu sim, saiba que o problema não está na sua panela e muito menos no seu freezer. <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-4">O problema está na falta de um método.</span>
            </p>
          </div>

          <p>
            A maioria das pessoas simplesmente coloca a comida quente em um pote qualquer e joga no congelador. Isso é um erro fatal que destrói a textura, altera o sabor e mata os nutrientes dos alimentos. O congelamento não é um truque mágico; é uma ciência simples de <TermoTooltip termo="Conservação Térmica" label="conservação térmica" />. E é exatamente essa ciência, mastigada e simplificada, que você tem nas mãos agora.
          </p>

          <figure className="my-8 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
            <img
              src="/ebook-congelamento/intro-marmitas.jpg"
              alt="Três potes de vidro herméticos alinhados sobre bancada de madeira clara contendo frango grelhado, arroz soltinho, brócolis bem verde e fatias de batata-doce"
              className="w-full max-h-[420px] object-cover object-center"
            />
            <figcaption className="px-5 py-3.5 text-xs sm:text-sm text-slate-400 bg-slate-950/90 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <span>
                <strong className="text-emerald-400">O Padrão Revista:</strong> Potes de vidro herméticos com porções equilibradas que mantêm a cor vibrante, a textura firme e o sabor de comida feita na hora.
              </span>
            </figcaption>
          </figure>

          <p>
            Neste manual, você vai aprender como transformar apenas <strong>2 horas do seu domingo</strong> em uma semana inteira de refeições prontas, frescas e seguras. Chega de comer comida aguada. Chega de jogar dinheiro no lixo. A partir da próxima página, você vai dominar a técnica do congelamento perfeito.
          </p>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 1: AS 4 LEIS DE OURO DO CONGELAMENTO             */}
        {/* ========================================================= */}
        <section id="capitulo-1" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-amber-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
                Capítulo 1 — A Base Científica Simplificada
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                As 4 Leis de Ouro do Congelamento
              </h2>
            </div>

            <p>
              O sucesso de uma marmita congelada começa muito antes dela entrar no freezer. Pular qualquer uma das quatro leis abaixo é o que separa uma comida com gosto de recém-feita de uma refeição aguada e sem graça. Para garantir que seu investimento de <strong className="text-emerald-400">R$ 9,90</strong> se pague na primeira semana evitando o desperdício de comida, decore estas regras.
            </p>
          </div>

          {/* LEI Nº 1: CONTROLE DA TEMPERATURA */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                <ThermometerSnowflake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                  Primeira Regra Fundamental
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Lei nº 1: O Controle da Temperatura (O Fim da Comida Aguada)
                </h3>
              </div>
            </div>

            <p>
              Nunca feche um pote com comida quente e coloque direto no congelador. Quando você faz isso, o vapor quente da comida sobe, bate na tampa fria do pote e se transforma em gotas de água. No freezer, essa água vira gelo. Quando você for aquecer no micro-ondas, esse gelo derrete e inunda a sua marmita, transformando tudo em uma sopa sem sabor.
            </p>

            <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-5 rounded-r-2xl border-y border-r border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>A Regra:</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Deixe a comida esfriar na panela ou já porcionada nos potes abertos em temperatura ambiente (<strong>no máximo por 2 horas</strong>). Quer acelerar? Coloque a panela dentro de uma bacia com água fria e gelo (o famoso <TermoTooltip termo="Banho-Maria Invertido" label="banho-maria invertido" />).
              </p>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/lei-1-temperatura.jpg"
                alt="Pote de vidro retangular aberto sobre pia de granito com fumaça suave saindo da carne com molho e pano de prato xadrez ao lado"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-amber-400">Lei nº 1 em ação:</strong> Deixe o vapor escapar completamente com o pote destampado antes de fechar e levar ao freezer.
              </figcaption>
            </figure>
          </div>

          {/* LEI Nº 2: O BLOQUEIO DE AR */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0">
                <PackageCheck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 block">
                  Segunda Regra Fundamental
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Lei nº 2: O Bloqueio de Ar (O Inimigo Invisível)
                </h3>
              </div>
            </div>

            <p>
              O oxigênio frio do freezer é o que causa as "<TermoTooltip termo="Queimaduras de Congelamento" label="queimaduras de congelamento" />" — aquelas manchas esbranquiçadas que deixam as carnes ressecadas e duras como uma sola de sapato. O segredo é remover o máximo de ar possível da embalagem.
            </p>

            <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-5 rounded-r-2xl border-y border-r border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>A Regra:</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Se usar potes, prefira os de vidro temperado com travas <TermoTooltip termo="Herméticos" label="herméticas" />. Se usar potes de plástico, certifique-se de que tenham o selo "<TermoTooltip termo="Livre de BPA" />" (para não liberar toxinas ao aquecer). Preencha o pote com a comida até faltar apenas <TermoTooltip termo="Espaço de Expansão" label="um dedo para a borda" />. Os líquidos expandem quando congelam, então esse espaço de um dedo evita que o pote rache.
              </p>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/lei-2-bloqueio-ar.jpg"
                alt="Pote de vidro temperado com tampa hermética de 4 travas e anel de silicone, preenchido até faltar um dedo para a borda"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-sky-400">Lei nº 2 em ação:</strong> Vedação hermética com anel de silicone e exatamente 1 dedo de espaço livre no topo para expansão segura do congelamento.
              </figcaption>
            </figure>

            {/* Dica de Equipamento (Lei 2): Potes de Vidro Herméticos */}
            <div className="my-8 rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🧊</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Dica Prática: Qual Pote Usar no Método?</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                O segredo para a comida não ressecar (queimadura de frio) é a vedação. Esqueça os potes de margarina ou sorvete. Um bom <strong>kit de potes de vidro herméticos</strong> é feito de vidro borossilicato resistente: ele vai direto do freezer para o micro-ondas sem trincar. O anel de silicone na tampa bloqueia 100% do ar e já tem o tamanho ideal para uma refeição individual.
              </p>
              <a
                href="https://meli.la/2RyuFPz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 shadow-sm"
              >
                🛒 Ver Kit de Potes de Vidro Herméticos Recomendado
              </a>
            </div>
          </div>

          {/* LEI Nº 3: O PORCIONAMENTO ESTRATÉGICO */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400 block">
                  Terceira Regra Fundamental
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Lei nº 3: O Porcionamento Estratégico (Segurança Alimentar)
                </h3>
              </div>
            </div>

            <p>
              Um erro comum é congelar uma panela inteira de feijão ou um bloco de dois quilos de frango desfiado, descongelar tudo, tirar um pouco para o almoço e devolver o resto para o freezer. Isso é extremamente perigoso. O sobe-e-desce de temperatura prolifera <TermoTooltip termo="Contaminação Cruzada e Bacteriana" label="bactérias rapidamente" />.
            </p>

            <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-5 rounded-r-2xl border-y border-r border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>A Regra:</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Congele exatamente a porção que você (ou sua família) vai comer em uma única refeição. Descongelou? Tem que consumir em até <strong>24 horas</strong> mantendo na geladeira. <strong>Nunca recongele um alimento que já foi descongelado.</strong>
              </p>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/lei-3-porcionamento.jpg"
                alt="Mão segurando uma pequena porção individual de feijão escuro dentro de um saquinho ziplock transparente fechado a vácuo"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-rose-400">Lei nº 3 em ação:</strong> Porções individuais em saquinhos tipo Ziplock sem ar ocupam mínimo espaço no freezer e descongelam em minutos sem desperdício.
              </figcaption>
            </figure>

            {/* Dica de Equipamento (Lei 3): Saquinhos Herméticos Tipo Zip Lock */}
            <div className="my-8 rounded-lg border border-rose-100 bg-rose-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">🥡</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Truque para Ganhar Espaço no Freezer</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Para congelar porções individuais de feijão, carnes desfiadas, caldos ou legumes branqueados sem ocupar espaço com potes, use <strong>saquinhos herméticos reforçados com fecho duplo</strong>. Basta colocar a porção, espalhar bem para ficar fininho como uma folha, tirar o ar antes de fechar o trilho e empilhar um sobre o outro. Além de caber o triplo de comida no congelador, descongela em poucos minutos!
              </p>
              <a
                href="https://meli.la/25P8JWz"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-rose-600 px-6 py-3 font-semibold text-white transition hover:bg-rose-700 shadow-sm"
              >
                🛒 Ver Pacote com 100 Saquinhos Herméticos Reforçados
              </a>
            </div>
          </div>

          {/* LEI Nº 4: A REGRA DA ETIQUETA */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
                <Tag className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block">
                  Quarta Regra Fundamental
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Lei nº 4: A Regra da Etiqueta (Nunca Confie na Sua Memória)
                </h3>
              </div>
            </div>

            <p>
              Com o tempo, tudo no freezer fica coberto por uma fina camada de gelo opaco. Aquele purê de macaxeira e aquele caldo de frango ficam exatamente com a mesma aparência. Sem identificação, você acaba aquecendo sopa de feijão achando que era molho bolonhesa.
            </p>

            <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-5 rounded-r-2xl border-y border-r border-emerald-500/30 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>A Regra:</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Todo e qualquer pote ou saco precisa de um pedaço de fita crepe colado. Escreva sempre com caneta permanente: <strong>O Nome do Prato e A Data de Preparo</strong>. Refeições caseiras completas duram com qualidade máxima por <strong>30 dias no freezer</strong>.
              </p>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/lei-4-etiqueta.jpg"
                alt="Macro close-up de etiqueta de fita crepe branca na tampa de um pote escrito Frango com Batata-Doce - 16/10"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-purple-400">Lei nº 4 em ação:</strong> Fita crepe + caneta permanente. Simples, barato, não descola no frio úmido e sai sem deixar cola na hora de lavar.
              </figcaption>
            </figure>

            {/* Dica de Equipamento (Lei 4): Marcador Permanente + Fita Crepe */}
            <div className="my-8 rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">✍️</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Dica Anti-Esquecimento na Gaveta</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Canetas esferográficas comuns falham no plástico gelado e etiquetas de papel esfarelam quando o pote sua. O jeito mais simples e barato é deixar sempre na gaveta da cozinha um rolo de <strong>fita crepe larga</strong> e um <strong>marcador permanente à prova d'água</strong>. Eles não desbotam com a umidade do freezer e garantem que você nunca mais confunda caldo de feijão com molho de carne.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <a
                  href="https://meli.la/23UTiB4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center rounded bg-slate-800 px-6 py-3 font-semibold text-white transition hover:bg-slate-700 shadow-sm"
                >
                  🛒 Ver Marcador Permanente Recomendado
                </a>
                <a
                  href="https://meli.la/34dQrQL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full text-center rounded border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 shadow-sm"
                >
                  🛒 Ver Fita Crepe Larga
                </a>
              </div>
            </div>
          </div>

          {/* CHECKLIST INTERATIVO DE DOMINGO */}
          <div
            id="checklist-leis"
            className="bg-gradient-to-br from-emerald-950/50 via-slate-900 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                  Ferramenta Interativa do Cap. 1
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Checklist Rápido: As 4 Leis de Ouro
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Use este verificador antes de guardar seus potes no freezer para garantir que nenhuma marmita fique aguada:
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-emerald-500/30 text-center shrink-0">
                <span className="text-xs text-slate-400 block">Progresso</span>
                <span className="text-xl font-black text-emerald-400">{totalChecked} / 4</span>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={lei1Checked}
                  onChange={(e) => setLei1Checked(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">1. A comida já esfriou completamente?</strong>
                  <span className="text-slate-400 text-xs">
                    Nenhum vapor saindo dos potes (esfriou na bancada por até 2h ou no banho-maria invertido).
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={lei2Checked}
                  onChange={(e) => setLei2Checked(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">2. Pote vedado e com 1 dedo de folga na borda?</strong>
                  <span className="text-slate-400 text-xs">
                    Potes de vidro ou plástico Livre de BPA com espaço para expansão dos líquidos ao congelar.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={lei3Checked}
                  onChange={(e) => setLei3Checked(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">3. Porções individuais separadas por refeição?</strong>
                  <span className="text-slate-400 text-xs">
                    Cada pote ou saquinho tem exatamente a medida de 1 refeição para nunca precisar recongelar.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={lei4Checked}
                  onChange={(e) => setLei4Checked(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">4. Etiqueta de fita crepe com Nome + Data de hoje?</strong>
                  <span className="text-slate-400 text-xs">
                    Todos os potes identificados com caneta permanente para consumo em até 30 dias.
                  </span>
                </div>
              </label>
            </div>

            {totalChecked === 4 && (
              <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500 text-emerald-200 text-sm font-bold flex items-center gap-3 animate-fade-in">
                <Check className="w-6 h-6 text-emerald-400 shrink-0" />
                <span>
                  Parabéns! Suas marmitas estão 100% blindadas contra água, gelo e ressecamento. Pode levar ao freezer com segurança!
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 2: O MAPA DOS ALIMENTOS                          */}
        {/* ========================================================= */}
        <section id="capitulo-2" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-emerald-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
                Capítulo 2 — Guia Definitivo de Ingredientes
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                O Mapa dos Alimentos (O Que Funciona e o Que Estraga)
              </h2>
            </div>

            <p>
              Quando você prepara as refeições da semana para a família toda, o maior medo é abrir o pote e encontrar uma comida com textura de esponja. O congelamento atua na <TermoTooltip termo="Cristais de Gelo Celulares" label="água dentro das células dos alimentos" />; se a estrutura do ingrediente não for firme ou se o preparo for inadequado, a textura original é destruída.
            </p>

            <p className="mt-4">
              Para que você nunca mais estrague ingredientes e evite qualquer frustração, mapeamos exatamente o que reage bem ao frio extremo e o que você deve manter bem longe do seu freezer.
            </p>
          </div>

          {/* 1. CARBOIDRATOS E RAÍZES */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                <Wheat className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                  Grupo Alimentar 1
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  1. Carboidratos e Raízes (Os Campeões do Freezer)
                </h3>
              </div>
            </div>

            <p>
              As raízes regionais são excelentes opções para marmitas porque têm pouca água e muita massa. Elas mantêm o sabor e a textura quase intactos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <ThumbsUp className="w-4 h-4" />
                  <span>O que fica perfeito:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong>Macaxeira</strong> (cozida em pedaços ou em purê), <strong>cará</strong> e <strong>batata-doce</strong> (assada ou cozida). O <strong>arroz branco ou integral</strong> também congela muito bem, desde que seja feito bem soltinho e com pouco óleo.
                </p>
              </div>

              <div className="bg-rose-950/25 border border-rose-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
                  <Ban className="w-4 h-4" />
                  <span>O que evitar:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong>Batata inglesa cozida em pedaços.</strong> Ela absorve muita água e, ao descongelar, fica farelenta e esponjosa. <strong>Macarrão cozido além do ponto</strong> também vira uma massa disforme.
                </p>
              </div>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap2-raizes-frango.jpg"
                alt="Marmita de vidro dividida ao meio: de um lado fatias de batata-doce e pedaços de macaxeira dourados, do outro peito de frango grelhado suculento"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-amber-400">Combinação Campeã:</strong> Macaxeira e batata-doce douradas ao lado de peito de frango grelhado suculento em pote de vidro com divisória.
              </figcaption>
            </figure>
          </div>

          {/* 2. PROTEÍNAS, CARNES E LATICÍNIOS */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 shrink-0">
                <Beef className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-400 block">
                  Grupo Alimentar 2
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  2. Proteínas, Carnes e Laticínios
                </h3>
              </div>
            </div>

            <p>
              As proteínas são as estrelas da marmita e, em geral, congelam excepcionalmente bem, desde que tenham algum molho ou umidade natural para não ressecarem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <ThumbsUp className="w-4 h-4" />
                  <span>O que fica perfeito:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong>Carne de panela desfiada</strong>, <strong>peito de frango desfiado com temperos</strong>, <strong>carne moída</strong>, <strong>bifes de gado com molho</strong> e <strong>peixes sem espinhos</strong>. Queijos mais firmes, como o <strong>queijo de manteiga light</strong> (ralado ou em fatias), também suportam bem o frio e derretem lindamente na hora de aquecer.
                </p>
              </div>

              <div className="bg-rose-950/25 border border-rose-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
                  <Ban className="w-4 h-4" />
                  <span>O que evitar:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong>Ovos cozidos inteiros</strong> (a clara fica com textura de borracha). <strong>Carnes fritas à milanesa</strong> perdem completamente a crocância. Evite também congelar pratos muito delicados, como um <strong>arroz com leite fresco</strong>, pois o leite tende a talhar e separar a gordura da água quando congelado e reaquecido.
                </p>
              </div>
            </div>
          </div>

          {/* 3. VEGETAIS E A MÁGICA DO BRANQUEAMENTO */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Salad className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Grupo Alimentar 3 • Técnica de Restaurante
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  3. Vegetais e a Mágica do "Branqueamento"
                </h3>
              </div>
            </div>

            <p>
              Você pode congelar legumes e garantir que eles continuem crocantes e com cores vibrantes, mas nunca deve colocá-los crus no freezer. O segredo dos restaurantes se chama <TermoTooltip termo="Branqueamento" />.
            </p>

            <div className="bg-gradient-to-r from-emerald-950/50 via-slate-900 to-sky-950/40 border-l-4 border-emerald-400 p-5 sm:p-6 rounded-r-2xl border-y border-r border-emerald-500/30 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <Sparkles className="w-5 h-5" />
                <span>Como fazer:</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Ferva água em uma panela. Jogue os legumes picados (<strong>brócolis, cenoura, vagem</strong>) por <strong>apenas 2 minutos</strong>. Retire com uma escumadeira e jogue-os imediatamente em uma tigela com <strong>água e muito gelo</strong>. Esse choque térmico para o cozimento e sela a cor. Seque bem e congele.
              </p>
            </div>

            <div className="bg-rose-950/25 border border-rose-500/30 rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
                <Ban className="w-4 h-4" />
                <span>O que evitar sempre:</span>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed">
                <strong>Vegetais ricos em água e folhas cruas.</strong> Alface, rúcula, tomate cru, pepino e rabanete murcham completamente e soltam muita água. Frutas muito macias que serão comidas puras, como a <strong>banana da terra crua</strong>, também escurecem e perdem a textura (congele bananas apenas se for usá-las para fazer bolos ou vitaminas).
              </p>
            </div>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap2-branqueamento.jpg"
                alt="Escumadeira de aço inox levantando pedaços de brócolis verde vibrante e cenoura laranja de um banho de água com cubos de gelo"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-emerald-400">O Choque Térmico do Branqueamento:</strong> 2 minutos na água fervente seguidos de banho de gelo mantêm o verde vivo do brócolis e a crocância da cenoura.
              </figcaption>
            </figure>
          </div>

          {/* 4. MOLHOS E TEMPEROS */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                <Soup className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                  Grupo Alimentar 4
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  4. Molhos e Temperos
                </h3>
              </div>
            </div>

            <p>
              Um bom molho é o que salva uma marmita de ficar seca, mas é preciso cuidado com a base escolhida.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <ThumbsUp className="w-4 h-4" />
                  <span>O que fica perfeito:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong>Molho de tomate caseiro</strong>, <strong>caldos de carne ou frango</strong> (você pode congelar em forminhas de gelo para usar depois), <strong>temperos batidos</strong> (alho, cebola e azeite).
                </p>
              </div>

              <div className="bg-rose-950/25 border border-rose-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase tracking-wider">
                  <Ban className="w-4 h-4" />
                  <span>O que evitar:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  <strong>Maionese</strong>, <strong>iogurte natural</strong> e <strong>cremes à base de amido de milho</strong>. Eles tendem a separar e talhar, deixando o prato com um aspecto talhado e desagradável.
                </p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
              <p className="text-emerald-300 font-bold text-base sm:text-lg">
                Com o mapa dos alimentos em mãos, você já sabe exatamente o que comprar na feira ou no supermercado sem medo de errar.
              </p>
            </div>
          </div>

          {/* FERRAMENTA INTERATIVA DO CAP 2: CONSULTOR RÁPIDO */}
          <div
            id="consultor-alimentos"
            className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/30 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                Ferramenta Interativa do Cap. 2
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Consultor Rápido: "Posso Congelar Isso?"
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Na dúvida na hora da feira ou do preparo? Pesquise um ingrediente abaixo ou filtre entre os campeões do freezer e os proibidos:
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={buscaAlimento}
                  onChange={(e) => setBuscaAlimento(e.target.value)}
                  placeholder="Buscar ingrediente (ex: macaxeira, batata, frango, ovo, maionese)..."
                  className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition"
                />
              </div>
              <div className="flex gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setFiltroStatus('todos')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    filtroStatus === 'todos'
                      ? 'bg-slate-200 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  Todos ({BANCO_ALIMENTOS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFiltroStatus('perfeito')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    filtroStatus === 'perfeito'
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-900/50'
                  }`}
                >
                  ✅ Perfeitos
                </button>
                <button
                  type="button"
                  onClick={() => setFiltroStatus('evitar')}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                    filtroStatus === 'evitar'
                      ? 'bg-rose-500 text-white'
                      : 'bg-rose-950/40 text-rose-400 border border-rose-500/30 hover:bg-rose-900/50'
                  }`}
                >
                  🚫 Evitar
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
              {alimentosFiltrados.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    item.status === 'perfeito'
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : 'bg-rose-950/15 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-sm font-black text-white">{item.nome}</span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                        item.status === 'perfeito'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      }`}
                    >
                      {item.status === 'perfeito' ? 'Pode Congelar' : 'Evitar'}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 block mb-1.5">
                    {item.categoria}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.dica}</p>
                </div>
              ))}
              {alimentosFiltrados.length === 0 && (
                <div className="col-span-2 text-center py-8 text-sm text-slate-400">
                  Nenhum alimento encontrado para "{buscaAlimento}". Tente buscar por outro nome!
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 3: A LINHA DE PRODUÇÃO DE 2 HORAS                */}
        {/* ========================================================= */}
        <section id="capitulo-3" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-sky-500 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-sky-400 block">
                Capítulo 3 — O Método de Execução Rápida
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                A Linha de Produção de 2 Horas (Cozinhando com Inteligência)
              </h2>
            </div>

            <p>
              O maior erro de quem tenta preparar marmitas para a semana é cozinhar um prato por vez. Fazer o arroz, lavar a panela; depois fazer o feijão, lavar a panela; depois assar a carne... Isso consome o seu domingo inteiro e gera uma montanha de louça.
            </p>

            <div className="bg-gradient-to-r from-sky-950/60 via-slate-900 to-slate-900 border-l-4 border-sky-400 p-5 sm:p-6 rounded-r-2xl border-y border-r border-sky-500/20 shadow-lg my-6">
              <p className="text-white font-bold text-base sm:text-lg leading-relaxed">
                Para preparar refeições para vários dias — e para toda a família — em apenas duas horas, você precisa transformar a sua cozinha em uma verdadeira <span className="text-sky-400 underline decoration-sky-500/50 underline-offset-4">"linha de montagem"</span>. O segredo é usar o <strong>forno</strong>, a <strong>panela de pressão</strong> e as <strong>bocas do fogão</strong> simultaneamente.
              </p>
            </div>

            <p className="font-semibold text-emerald-400">
              Siga este roteiro de 4 etapas e veja a mágica acontecer:
            </p>
          </div>

          {/* ETAPA 1: O PREPARO INICIAL (MISE EN PLACE) */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                <ChefHat className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Minutos 00 a 25 • Organização Total
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Etapa 1: O Preparo Inicial (<TermoTooltip termo="Mise en Place" />)
                </h3>
              </div>
            </div>

            <p>
              Antes de acender qualquer fogo, organize todos os ingredientes na bancada. Pique, descasque e tempere tudo de uma vez.
            </p>

            <ul className="space-y-3 text-sm sm:text-base text-slate-200">
              <li className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <span>
                  Descasque e corte em cubos ou fatias as raízes que você vai usar na semana (<strong>macaxeira, cará, batata-doce</strong>).
                </span>
              </li>
              <li className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <span>
                  Corte as carnes (como <strong>patinho para carne de panela</strong>) e limpe o <strong>peito de frango</strong>. Deixe-os descansando nos temperos secos.
                </span>
              </li>
              <li className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <span>
                  Pique os temperos base (<strong>muito alho e cebola</strong>) em grande quantidade. Você vai usar essa base para quase todas as panelas, então pique tudo de uma vez para não ter que sujar a tábua várias vezes.
                </span>
              </li>
            </ul>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap3-etapa1-mise-en-place.jpg"
                alt="Tábua de corte de madeira rústica com tigelas de vidro contendo alho picado, cebola picada, cubos de batata-doce, macaxeira e tiras de frango temperado ao lado de faca de chef"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-emerald-400">Etapa 1 (Mise en Place):</strong> Tudo cortado, temperado e separado antes de acender a primeira chama. Uma única tábua suja, zero correria.
              </figcaption>
            </figure>
          </div>

          {/* ETAPA 2: PANELA DE PRESSÃO E FORNO */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                <Flame className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                  Minutos 25 a 60 • Cozimento Passivo Simultâneo
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Etapa 2: Panela de Pressão e Forno (Os Trabalhadores Pesados)
                </h3>
              </div>
            </div>

            <p>
              Esses são os seus melhores amigos, pois cozinham grandes quantidades sem exigir que você fique mexendo.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
                  <Timer className="w-4 h-4" />
                  <span>Na Pressão:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Coloque as proteínas que demoram mais ou que precisam ser desfiadas. Uma <strong>carne de panela com molho</strong> ou <strong>peitos de frango para desfiar</strong> entram aqui. Feche a tampa e deixe a panela fazer o trabalho pesado.
                </p>
              </div>

              <div className="bg-orange-950/20 border border-orange-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-black text-sm uppercase tracking-wider">
                  <Flame className="w-4 h-4" />
                  <span>No Forno:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Pegue fatias de <strong>batata-doce, cará</strong> ou até mesmo fatias de <strong>banana da terra</strong>, coloque em uma assadeira grande, regue com um fio de azeite e tempere. O forno vai assar os carboidratos de forma passiva, deixando-os levemente dourados e perfeitos para o congelamento.
                </p>
              </div>
            </div>

            {/* Dica de Equipamento (Etapa 2): Panela de Pressão Elétrica */}
            <div className="my-8 rounded-lg border border-orange-100 bg-orange-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚡</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Dica para Acelerar a Produção</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Quer reduzir seu tempo na cozinha de 2 horas para menos de 1 hora sem ficar vigiando o fogão? Usar uma <strong>panela de pressão elétrica</strong> faz toda a diferença no método. Você coloca as carnes duras dentro, aperta um botão e pode fazer outra coisa: ela não chia, não tem risco e desliga sozinha quando termina, além de ter cuba antiaderente muito fácil de lavar.
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

          {/* ETAPA 3: FOGÃO E REFOGADOS RÁPIDOS */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0">
                <Utensils className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 block">
                  Minutos 60 a 90 • Uso Inteligente das Bocas do Fogão
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Etapa 3: Fogão e Refogados Rápidos
                </h3>
              </div>
            </div>

            <p>
              Enquanto o forno assa e a pressão chia, você usa as bocas normais do fogão para os preparos rápidos.
            </p>

            <ul className="space-y-3 text-sm sm:text-base text-slate-200">
              <li className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Faça o arroz para a semana toda de uma só vez.</strong> Lembre-se de usar pouco óleo para que ele fique bem soltinho e não empedre no freezer.
                </span>
              </li>
              <li className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Use uma panela com água fervente para fazer o "<TermoTooltip termo="Branqueamento" />" dos vegetais (como ensinado no Capítulo 2).
                </span>
              </li>
              <li className="flex items-start gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                <CheckCircle2 className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Se for preparar algo rápido, como <strong>ovos mexidos para os próximos dois dias</strong> (lembre-se, ovos cozidos inteiros não congelam bem, mas mexidos cremosos e resfriados rapidamente suportam o frio curto) ou dourar <strong>queijo de manteiga light</strong> para acompanhar as raízes, faça agora.
                </span>
              </li>
            </ul>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap3-etapa3-fogao.jpg"
                alt="Fogão de aço inox com panela grande fervendo água com brócolis bem verde e outra panela ao fundo com arroz branco soltinho recém-feito"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-sky-400">Etapa 3 em ação:</strong> Brócolis no branqueamento de 2 minutos na boca da frente enquanto o arroz soltinho da semana finaliza na boca de trás.
              </figcaption>
            </figure>
          </div>

          {/* ETAPA 4: A MONTAGEM PERFEITA */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-400 shrink-0">
                <Layers className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block">
                  Minutos 90 a 120 • Porcionamento, Resfriamento e Etiqueta
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  Etapa 4: A Montagem Perfeita
                </h3>
              </div>
            </div>

            <p>
              Com tudo pronto e esfriando (Lei nº 1), alinhe todos os seus potes abertos na bancada. É aqui que o processo fica visualmente recompensador.
            </p>

            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-purple-950/30 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                <PieChart className="w-5 h-5" />
                <span>
                  <TermoTooltip termo="Regra da Proporção 50-25-25" label="A Regra da Proporção (Fórmula da Marmita Perfeita)" />
                </span>
              </div>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Para uma marmita saciante e nutritiva, preencha <strong>50% do pote com vegetais</strong>, <strong>25% com a proteína</strong> (a carne de panela suculenta ou o frango desfiado) e <strong>25% com o carboidrato</strong> (o arroz, o purê de macaxeira ou a batata-doce assada).
              </p>

              <div className="pt-2">
                <div className="h-9 w-full rounded-xl overflow-hidden flex font-black text-xs shadow-inner border border-slate-700">
                  <div className="w-1/2 bg-emerald-500 text-slate-950 flex items-center justify-center px-2">
                    50% Vegetais
                  </div>
                  <div className="w-1/4 bg-rose-500 text-white flex items-center justify-center px-2 border-l border-slate-900/40">
                    25% Proteína
                  </div>
                  <div className="w-1/4 bg-amber-400 text-slate-950 flex items-center justify-center px-2 border-l border-slate-900/40">
                    25% Carboidrato
                  </div>
                </div>
              </div>
            </div>

            {/* Dica de Equipamento (Etapa 4): Balança Digital de Cozinha */}
            <div className="my-8 rounded-lg border border-green-100 bg-green-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚖️</span>
                <h3 className="text-xl font-bold text-slate-800 m-0">Dica para Não Errar nas Porções</h3>
              </div>
              <p className="text-slate-700 mb-4 text-sm sm:text-base leading-relaxed">
                Para não correr o risco de fazer marmitas que deixem você com fome ou que façam a comida acabar antes do fim da semana, vale muito a pena usar uma <strong>balança digital de cozinha</strong>. Ela é super baratinha, fácil de limpar e tem o botão "Tara", que desconta o peso do pote de vidro automaticamente para você colocar a medida exata em todas as refeições.
              </p>
              <a
                href="https://meli.la/136SeHj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full md:w-auto text-center rounded bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 shadow-sm"
              >
                🛒 Ver Balança Digital de Cozinha Recomendada
              </a>
            </div>

            <p>
              Deixe as marmitas esfriarem completamente antes de tampar. Em seguida, feche bem, aplique as etiquetas de identificação com a data e empilhe no seu freezer.
            </p>

            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap3-etapa4-montagem.jpg"
                alt="Fileira de 6 marmitas de vidro retangulares em bancada de granito claro preenchidas harmoniosamente com purê de macaxeira, batata-doce, carne de panela ao molho e brócolis"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-purple-400">Sensação de Dever Cumprido:</strong> 6 marmitas completas alinhadas na bancada, aguardando esfriar para fechar e garantir a semana inteira livre de pia suja.
              </figcaption>
            </figure>

            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6">
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Dessa forma, em pouco tempo você produz comida suficiente para não se preocupar mais com o fogão durante os dias úteis. No próximo capítulo, abordaremos o guia final do aquecimento seguro e como evitar o ressecamento na hora de levar ao micro-ondas.
              </p>
            </div>
          </div>

          {/* CRONÔMETRO / CHECKLIST DA LINHA DE PRODUÇÃO DE 2 HORAS */}
          <div className="bg-gradient-to-br from-sky-950/40 via-slate-900 to-slate-950 border-2 border-sky-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-sky-400 block">
                  Ferramenta Interativa do Cap. 3
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  Roteiro Guiado das 2 Horas
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Vá marcando cada etapa no seu domingo para manter o ritmo de linha de produção sem se perder:
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-sky-500/30 text-center shrink-0">
                <span className="text-xs text-slate-400 block">Etapas Concluídas</span>
                <span className="text-xl font-black text-sky-400">{totalEtapas} / 4</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={etapa1Done}
                  onChange={(e) => setEtapa1Done(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-sky-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">Etapa 1: Mise en Place (0-25 min)</strong>
                  <span className="text-slate-400 text-xs">
                    Raízes descascadas, carnes temperadas e todo o alho e cebola picados de uma vez.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={etapa2Done}
                  onChange={(e) => setEtapa2Done(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-sky-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">Etapa 2: Pressão + Forno (25-60 min)</strong>
                  <span className="text-slate-400 text-xs">
                    Carne/frango na panela de pressão e raízes/banana da terra assando no forno.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={etapa3Done}
                  onChange={(e) => setEtapa3Done(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-sky-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">Etapa 3: Fogão Rápido (60-90 min)</strong>
                  <span className="text-slate-400 text-xs">
                    Arroz soltinho com pouco óleo + branqueamento de 2 minutos dos vegetais.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-sky-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={etapa4Done}
                  onChange={(e) => setEtapa4Done(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-sky-500 rounded cursor-pointer"
                />
                <div className="text-sm">
                  <strong className="text-white block">Etapa 4: Montagem 50/25/25 (90-120 min)</strong>
                  <span className="text-slate-400 text-xs">
                    Potes montados na proporção certa, resfriados abertos, tampados e etiquetados!
                  </span>
                </div>
              </label>
            </div>

            {totalEtapas === 4 && (
              <div className="p-4 rounded-2xl bg-sky-500/20 border border-sky-500 text-sky-200 text-sm font-bold flex items-center gap-3 animate-fade-in">
                <Check className="w-6 h-6 text-sky-400 shrink-0" />
                <span>
                  Linha de Produção Concluída em 2 Horas! Sua semana inteira de refeições saudáveis já está garantida.
                </span>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 4: O DESCONGELAMENTO QUE SALVA O SABOR           */}
        {/* ========================================================= */}
        <section id="capitulo-4" className="space-y-12 border-b border-slate-800 pb-16">
          <div>
            <div className="border-l-4 border-amber-400 pl-4 py-1 mb-6">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
                Capítulo 4 — O Segredo dos 3 Minutos Finais
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
                O Descongelamento que Salva o Sabor
              </h2>
            </div>

            <p>
              Você planejou, cozinhou e armazenou com perfeição. Mas todo esse trabalho pode ir por água abaixo em três minutos se você aquecer a marmita do jeito errado. O processo de reaquecimento é o momento mais crítico para recuperar a textura de comida recém-feita, garantindo que o seu arroz não vire um bloco de pedra e a sua carne de panela mantenha a suculência original.
            </p>

            <p className="mt-4">
              A forma como você devolve o calor ao alimento define se a sua refeição será incrivelmente saborosa ou uma decepção ressecada. Existem duas formas seguras e eficientes de fazer isso.
            </p>
          </div>

          {/* --------------------------------------------------------- */}
          {/* 1. O DESCONGELAMENTO PROGRAMADO                           */}
          {/* --------------------------------------------------------- */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Snowflake className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 block">
                  Método 1 • A Escolha Recomendada
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  1. O <TermoTooltip termo="Descongelamento Programado" label="Descongelamento Programado" /> (A Escolha Recomendada)
                </h3>
              </div>
            </div>

            <p>
              Este é o método que garante 100% da integridade do sabor e da textura. Se você quer que aquele purê de macaxeira ou o frango desfiado fiquem perfeitos, a paciência é a sua maior aliada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Como fazer:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Na noite anterior, retire a marmita do congelador e coloque-a na <strong>prateleira de baixo da sua geladeira</strong>.
                </p>
              </div>

              <div className="bg-sky-950/25 border border-sky-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-black text-sm uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Por que funciona:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  O descongelamento lento permite que as fibras das carnes e dos vegetais reabsorvam a umidade que foi cristalizada durante o congelamento. A comida não "sangra" líquidos no fundo do pote. No dia seguinte, basta aquecer no micro-ondas por <strong>apenas 2 minutos</strong> e a comida estará exatamente igual ao dia em que foi feita.
                </p>
              </div>
            </div>

            {/* Imagem 1 do Capítulo 4 */}
            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap4-geladeira.jpg"
                alt="Marmita de vidro hermética levemente suada pelo frio repousando sobre a prateleira iluminada de uma geladeira moderna com legumes e filé de frango"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-emerald-400">O Hábito de 10 Segundos à Noite:</strong> Descer a marmita do freezer para a prateleira inferior da geladeira antes de dormir garante textura de comida feita na hora no almoço seguinte.
              </figcaption>
            </figure>
          </div>

          {/* --------------------------------------------------------- */}
          {/* 2. O CHOQUE DO MICRO-ONDAS                                */}
          {/* --------------------------------------------------------- */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 shrink-0">
                <Zap className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400 block">
                  Método 2 • O Plano de Emergência
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  2. O Choque do Micro-ondas (O Plano de Emergência)
                </h3>
              </div>
            </div>

            <p>
              Esqueceu de tirar a marmita do freezer na noite anterior? <strong>Nunca, sob hipótese alguma, deixe o pote descongelando em cima da pia em temperatura ambiente.</strong> Isso é um convite para a proliferação de bactérias. O caminho seguro é ir do gelo direto para o calor extremo.
            </p>

            <div className="bg-amber-950/30 border-l-4 border-amber-500 p-5 rounded-r-2xl border-y border-r border-amber-500/30 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-black text-sm uppercase tracking-wider">
                <Timer className="w-5 h-5" />
                <span>A Regra do Meio Termo:</span>
              </div>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                Retire o pote de vidro do freezer (certifique-se de que ele suporta choque térmico) ou transfira o alimento para um prato se usou saco plástico. Coloque no micro-ondas na função <strong>"Descongelar" por 5 a 6 minutos</strong>. Pause na metade do tempo, abra, mexa um pouco os ingredientes para distribuir o calor e, em seguida, aqueça em <strong>potência máxima por mais 2 minutos</strong>.
              </p>
            </div>
          </div>

          {/* --------------------------------------------------------- */}
          {/* 3. O TRUQUE DA ÁGUA E DO VAPOR                            */}
          {/* --------------------------------------------------------- */}
          <div className="bg-slate-950/60 border border-slate-800/90 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 shrink-0">
                <Droplets className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-sky-400 block">
                  Segredo de Ouro do Reaquecimento
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5">
                  3. O Truque da Água e do Vapor (O Fim da Comida Seca)
                </h3>
              </div>
            </div>

            <p>
              Carboidratos densos, como arroz, batata-doce e macaxeira, tendem a ressecar na superfície quando reaquecidos. O micro-ondas age evaporando as moléculas de água do alimento. Para blindar a sua comida contra o ressecamento, use o truque da "<TermoTooltip termo="Estufa em Miniatura" label="estufa em miniatura" />".
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-sky-950/25 border border-sky-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-sky-400 font-black text-sm uppercase tracking-wider">
                  <Droplets className="w-4 h-4" />
                  <span>Como fazer:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Antes de ligar o micro-ondas, respingue cerca de <strong>uma colher de sopa de água filtrada</strong> por cima da comida (especialmente sobre o arroz ou as raízes).
                </p>
              </div>

              <div className="bg-emerald-950/25 border border-emerald-500/30 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase tracking-wider">
                  <PackageCheck className="w-4 h-4" />
                  <span>A Tampa:</span>
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  Nunca aqueça o pote totalmente destampado, nem 100% vedado. Deixe a <strong>tampa apenas sobreposta (solta em cima do pote)</strong>. A água que você adicionou vai evaporar rapidamente, criar um ambiente de muito vapor preso pela tampa solta, e devolver a umidade perfeita aos grãos e às carnes.
                </p>
              </div>
            </div>

            {/* Imagem 2 do Capítulo 4 */}
            <figure className="rounded-2xl overflow-hidden border border-slate-800 shadow-lg bg-slate-900">
              <img
                src="/ebook-congelamento/cap4-microondas-vapor.jpg"
                alt="Close-up do interior de um micro-ondas limpo com pote de vidro contendo arroz branco e carne de panela, tampa semiaberta e nuvem de vapor quente saindo"
                className="w-full max-h-96 object-cover object-center"
              />
              <figcaption className="px-4 py-3 text-xs text-slate-400 bg-slate-950 border-t border-slate-800/80">
                <strong className="text-sky-400">Efeito Estufa em Miniatura:</strong> 1 colher de sopa de água + tampa semiaberta criam uma nuvem de vapor que deixa o arroz soltinho e a carne suculenta em 2 minutos.
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ========================================================= */}
        {/* CONCLUSÃO: SUA NOVA ROTINA DE LIBERDADE COMEÇA AGORA      */}
        {/* ========================================================= */}
        <section id="conclusao" className="space-y-10">
          <div className="border-l-4 border-emerald-400 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
              Conclusão & Plano de Execução Imediata
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1 leading-tight">
              Sua Nova Rotina de Liberdade Começa Agora
            </h2>
          </div>

          <p>
            Você acaba de dominar a ciência simples por trás das marmitas perfeitas. O que antes era um processo frustrante, que resultava em comida aguada e horas perdidas no fogão, agora é uma linha de produção inteligente, rápida e à prova de falhas.
          </p>

          <p>
            O segredo para garantir que este método funcione (e para que você nunca mais jogue ingredientes e dinheiro no lixo) é a <strong>ação imediata</strong>. O conhecimento de resfriamento, bloqueio de ar e reaquecimento a vapor já é seu. Agora, é hora de aplicá-lo.
          </p>

          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6">
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Para evitar que você adie essa transformação, preparamos um passo a passo final de execução rápida. Se você adicionou o <strong>Guia de Receitas e Cardápios</strong> no momento da compra, basta abrir o seu segundo material e escolher os pratos da semana. Se você vai usar suas próprias receitas de família, o caminho é exatamente o mesmo.
            </p>
          </div>

          {/* CHECKLIST DE AÇÃO DA PRIMEIRA SEMANA (5 PASSOS) */}
          <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 block">
                  Plano de Ação Prático
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  O Seu Checklist de Ação (Para a Primeira Semana)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Antes de ir ao supermercado, marque um "X" nestes 5 passos para garantir que o seu primeiro lote de marmitas congeladas seja um sucesso absoluto:
                </p>
              </div>
              <div className="px-4 py-2 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center shrink-0">
                <span className="text-xs text-slate-400 block">Missão Semana 1</span>
                <span className="text-xl font-black text-emerald-400">{totalAcoes} / 5</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Passo 1 */}
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={acao1}
                  onChange={(e) => setAcao1(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm sm:text-base">
                  <strong className="text-white block">1. Auditoria dos Potes:</strong>
                  <span className="text-slate-300 text-xs sm:text-sm">
                    Separe os potes que você já tem em casa. Verifique se as tampas fecham perfeitamente e se não há rachaduras. Lembre-se: o ar é o inimigo do freezer (Lei nº 2).
                  </span>
                </div>
              </label>

              {/* Passo 2 */}
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={acao2}
                  onChange={(e) => setAcao2(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm sm:text-base">
                  <strong className="text-white block">
                    2. A Escolha Simples (<TermoTooltip termo="Regra do 2x2" />):
                  </strong>
                  <span className="text-slate-300 text-xs sm:text-sm">
                    Para a sua primeira semana, não complique. Escolha apenas 2 carboidratos (ex: arroz soltinho e purê de macaxeira) e 2 proteínas (ex: carne de panela e frango desfiado).
                  </span>
                </div>
              </label>

              {/* Passo 3 */}
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={acao3}
                  onChange={(e) => setAcao3(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm sm:text-base">
                  <strong className="text-white block">3. A Lista de Feira Exata:</strong>
                  <span className="text-slate-300 text-xs sm:text-sm">
                    Compre apenas o necessário para as combinações acima, mais os vegetais para o branqueamento (como brócolis e cenoura). Nada de comprar folhas sensíveis que murcham rápido se o foco for congelar.
                  </span>
                </div>
              </label>

              {/* Passo 4 */}
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={acao4}
                  onChange={(e) => setAcao4(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm sm:text-base">
                  <strong className="text-white block">4. Bloqueio de 2 Horas na Agenda:</strong>
                  <span className="text-slate-300 text-xs sm:text-sm">
                    Escolha o dia mais tranquilo do seu fim de semana. Coloque uma música ou um podcast e siga a linha de produção do Capítulo 3 (pressão, forno e fogão ao mesmo tempo).
                  </span>
                </div>
              </label>

              {/* Passo 5 */}
              <label className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition">
                <input
                  type="checkbox"
                  checked={acao5}
                  onChange={(e) => setAcao5(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                />
                <div className="text-sm sm:text-base">
                  <strong className="text-white block">5. Estoque Identificado:</strong>
                  <span className="text-slate-300 text-xs sm:text-sm">
                    Finalize colando a fita crepe com o nome do prato e a data de hoje. Empilhe no freezer.
                  </span>
                </div>
              </label>
            </div>

            {totalAcoes === 5 && (
              <div className="p-5 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 text-emerald-100 text-sm sm:text-base font-black flex items-center gap-3.5 animate-fade-in shadow-lg">
                <PartyPopper className="w-7 h-7 text-emerald-400 shrink-0" />
                <span>
                  Missão Completa! Você dominou o Método do Congelamento Perfeito e garantiu uma semana inteira de liberdade, saúde e economia!
                </span>
              </div>
            )}
          </div>

          <p>
            Sua semana agora está livre. Sem panelas sujas na quarta-feira à noite, sem depender de aplicativos de entrega de comida e com a certeza de que a sua família está consumindo refeições seguras, saborosas e com textura de comida fresca.
          </p>

          <p className="text-xl sm:text-2xl font-black text-emerald-400">
            Bem-vindo à sua nova rotina de organização e economia. Bom apetite e excelentes preparos!
          </p>

          {/* Imagem da Conclusão */}
          <figure className="rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-950">
            <img
              src="/ebook-congelamento/conclusao-freezer-organizado.jpg"
              alt="Mulher sorridente e relaxada fechando a porta de um freezer vertical completamente abastecido com marmitas empilhadas e organizadas, com cozinha limpa ao fundo"
              className="w-full max-h-[440px] object-cover object-center"
            />
            <figcaption className="px-5 py-4 text-xs sm:text-sm text-slate-300 bg-slate-950 border-t border-slate-800">
              <strong className="text-emerald-400">Paz, Tempo Livre e Dever Cumprido:</strong> Freezer abastecido, cozinha impecável e uma semana inteira de refeições prontas esperando por você.
            </figcaption>
          </figure>
        </section>
      </article>
    </div>
  );
}
