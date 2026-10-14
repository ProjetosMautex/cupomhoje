import React, { useState } from 'react';
import {
  BookOpen,
  HelpCircle,
  X,
  Check,
  Copy,
  ChevronRight,
  Shield,
  Smartphone,
  Laptop,
  AlertTriangle,
  Flame,
  CheckCircle2,
  ExternalLink,
  ListFilter,
  Scale
} from 'lucide-react';

interface TermoInfo {
  titulo: string;
  resumo: string;
  detalhe: string;
}

const GLOSSARIO: Record<string, TermoInfo> = {
  'Raio-X': {
    titulo: 'Raio-X das Dívidas',
    resumo: 'Levantamento real de quanto você pegou versus quanto o banco está cobrando.',
    detalhe:
      'Assim como na medicina, serve para enxergar exatamente a raiz do problema antes de tentar qualquer remédio ou negociação precipitada com o banco.'
  },
  'Juros Abusivos': {
    titulo: 'Juros Abusivos e Taxas Ocultas',
    resumo: 'Taxas exorbitantes aplicadas repetidamente que multiplicam a dívida sem justificativa.',
    detalhe:
      'Muito comuns no rotativo do cartão de crédito e no cheque especial. A Lei do Superendividamento e o Código de Defesa do Consumidor permitem cortar toda essa gordura em acordos ou repactuações.'
  },
  'Serasa': {
    titulo: 'Aplicativo Oficial da Serasa',
    resumo: 'Órgão oficial e gratuito de proteção ao crédito onde constam pendências no seu CPF.',
    detalhe:
      'Você não precisa pagar ninguém para consultar seu CPF. O aplicativo oficial da Serasa mostra a dívida negativada e o valor original de quando a dívida começou.'
  },
  'Consumidor.gov.br': {
    titulo: 'Consumidor.gov.br (Arma Secreta)',
    resumo: 'Portal público oficial do Governo Federal gerido pelo Ministério da Justiça.',
    detalhe:
      'É o canal mais temido pelas ouvidorias dos bancos. Reclamações abertas lá têm prazo legal de resposta e os bancos costumam enviar propostas com descontos reais para encerrar a pendência.'
  },
  'Demonstrativo de Evolução da Dívida': {
    titulo: 'DED (Demonstrativo de Evolução da Dívida)',
    resumo: 'Documento oficial e obrigatório que o banco deve entregar discriminando tudo o que cobrou.',
    detalhe:
      'O banco é obrigado a colocar no papel o valor contratado, os juros cobrados mês a mês e todas as tarifas. Se houver irregularidades, o banco é forçado a dar desconto substancial.'
  },
  'Dívidas com Garantia': {
    titulo: 'Dívidas com Garantia (Alienação Fiduciária)',
    resumo: 'Financiamentos em que o próprio bem (carro ou imóvel) responde pela dívida.',
    detalhe:
      'O bem permanece no nome do banco até a quitação integral. O atraso continuado pode gerar busca e apreensão do veículo ou leilão da casa. Devem ser priorizadas antes de dívidas de consumo ou cartão.'
  },
  'Lei do Superendividamento': {
    titulo: 'Lei do Superendividamento (Lei nº 14.181/2021)',
    resumo: 'Lei federal que alterou o Código de Defesa do Consumidor para proteger pessoas físicas.',
    detalhe:
      'Garante o direito de renegociar todas as dívidas de consumo em bloco, com possibilidade de corte total de juros abusivos e plano de pagamento fixado em até 5 anos, preservando a dignidade humana.'
  },
  'Mínimo Existencial': {
    titulo: 'Mínimo Existencial',
    resumo: 'A quantia financeira sagrada destinada à sobrevivência digna (moradia, comida, luz, remédios).',
    detalhe:
      'Fixado formalmente pelo Decreto nº 11.567/2023 no piso de R$ 600,00 mensais. Nenhum banco ou credor tem o direito legal de cobrar parcelas que invadam esse piso básico de sobrevivência.'
  },
  'Penhora': {
    titulo: 'Penhora de Bens',
    resumo: 'Ato judicial onde a Justiça formalmente bloqueia bens para pagar uma dívida em execução.',
    detalhe:
      'Bancos e assessorias de cobrança NÃO têm o poder de penhorar bens por mensagem de texto ou WhatsApp. Penhora só existe se houver um processo formal na Justiça com ordem direta de um juiz.'
  },
  'Tática do Silêncio': {
    titulo: 'A Tática do Silêncio',
    resumo: 'Estratégia psicológica e contábil de não aceitar propostas ruins e aguardar a dívida envelhecer.',
    detalhe:
      'Para os bancos, uma dívida em atraso há vários meses gera provisão para perdas contábeis. Com o tempo, o banco prefere conceder até 90% de desconto à vista do que não receber nada.'
  },
  'Feirões Limpa Nome': {
    titulo: 'Feirões Limpa Nome',
    resumo: 'Campanhas periódicas promovidas pela Serasa e instituições parceiras.',
    detalhe:
      'Nesses feirões, as instituições financeiras retiram multas e juros moratórios de dívidas antigas, oferecendo quitação com descontos massivos de 70% a 90% sobre o saldo total.'
  },
  'Valor Justo': {
    titulo: 'Quitação pelo Valor Justo',
    resumo: 'Pagamento que reflete o valor original realmente tomado emprestado mais juros compatíveis.',
    detalhe:
      'Baseado no Artigo 52, § 2º do Código de Defesa do Consumidor, qualquer devedor tem direito à liquidação antecipada do débito com abatimento proporcional de todos os juros futuros.'
  },
  'Ativos e Passivos': {
    titulo: 'Ativos vs. Passivos Financeiros',
    resumo: 'Conceito fundamental de educação e organização financeira.',
    detalhe:
      'Ativos colocam dinheiro no seu bolso ao longo do tempo (investimentos, patrimônio produtivo). Passivos tiram dinheiro do seu bolso (dívidas com juros altos, despesas sem controle).'
  },
  'Renda Passiva': {
    titulo: 'Renda Passiva',
    resumo: 'Ganhos financeiros gerados por investimentos, sem depender de trabalho diário.',
    detalhe:
      'Ganhos provenientes de dividendos, juros ou títulos que rendem periodicamente na conta do investidor de forma contínua e previsível.'
  }
};

export default function InteractiveReader() {
  const [activeTermKey, setActiveTermKey] = useState<string | null>(null);
  const [showFullGlossary, setShowFullGlossary] = useState<boolean>(false);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Checkboxes interativos do Capítulo 3
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const mensagemPronta = `Quero quitar minha dívida pelo valor justo, mas a parcela atual ultrapassa minha capacidade financeira baseado na Lei do Superendividamento. Qual a proposta à vista com desconto máximo para liquidação imediata?`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(mensagemPronta);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 3000);
  };

  const scrollToCapitulo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Card destacado e estilizado de Nota Editorial / Isenção Legal
  const NotaEditorialCard = ({ capitulo }: { capitulo?: string }) => {
    return (
      <div className="my-8 p-5 sm:p-6 bg-gradient-to-r from-amber-950/50 via-slate-900 to-amber-950/30 border-l-4 border-amber-500 rounded-r-3xl border-y border-r border-amber-500/30 shadow-xl">
        <div className="flex items-start gap-3.5 sm:gap-4">
          <div className="p-2.5 sm:p-3 bg-amber-500/20 rounded-2xl text-amber-400 shrink-0 mt-0.5 border border-amber-500/30 shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-amber-400">
                ⚖️ Diretriz de Responsabilidade & Resguardo Legal
              </span>
              {capitulo && (
                <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {capitulo}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              <strong className="text-white font-extrabold">Nota editorial:</strong> este capítulo apresenta informação geral, modelos e orientações estritamente pedagógicas e <strong className="text-amber-300 font-extrabold underline decoration-amber-400/50 underline-offset-2">não substitui orientação jurídica ou financeira individualizada</strong>.
            </p>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
              Não tome decisões precipitadas nem deixe de honrar compromissos sem o parecer individual de um advogado devidamente habilitado na OAB, da Defensoria Pública ou de órgãos oficiais de defesa do consumidor (Procon).
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Componente inline de Tooltip com botão acessível
  const TermoTooltip = ({ termo, label }: { termo: string; label?: string }) => {
    const info = GLOSSARIO[termo];
    return (
      <button
        type="button"
        onClick={() => {
          setActiveTermKey(termo);
          setShowFullGlossary(false);
        }}
        title="Toque para ver o Glossário Descomplicado"
        className="inline-flex items-center gap-0.5 text-emerald-400 font-bold underline decoration-emerald-500/60 decoration-2 underline-offset-4 hover:text-emerald-300 hover:decoration-emerald-300 transition cursor-pointer mx-1 px-1 py-0.5 bg-emerald-950/30 rounded"
      >
        <span>{label || termo}</span>
        <HelpCircle className="w-3.5 h-3.5 text-emerald-400/80" />
      </button>
    );
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* BARRA SUPERIOR DE NAVEGAÇÃO ENTRE CAPÍTULOS E CONTROLES */}
      <div className="sticky top-2 z-30 mb-8 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-2xl flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full text-xs font-bold scrollbar-none">
          <button
            onClick={() => scrollToCapitulo('capa')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0"
          >
            Capa
          </button>
          <button
            onClick={() => scrollToCapitulo('capitulo-1')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0"
          >
            Cap. 1: O Raio-X
          </button>
          <button
            onClick={() => scrollToCapitulo('capitulo-2')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0"
          >
            Cap. 2: A Lei 14.181
          </button>
          <button
            onClick={() => scrollToCapitulo('capitulo-3')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0"
          >
            Cap. 3: Negociação
          </button>
          <button
            onClick={() => scrollToCapitulo('capitulo-4')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition shrink-0"
          >
            Cap. 4: Próximos Passos
          </button>
        </div>

        <div className="flex items-center gap-2">
          {/* Botão de Tamanho da Fonte */}
          <button
            type="button"
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="px-2 py-1 text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
            title="Alternar tamanho da letra"
          >
            {fontSize === 'normal' ? 'A+' : 'A-'}
          </button>

          {/* Botão Glossário Completo */}
          <button
            type="button"
            onClick={() => {
              setShowFullGlossary(true);
              setActiveTermKey(null);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 rounded-xl transition shadow"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Glossário ({Object.keys(GLOSSARIO).length})</span>
          </button>
        </div>
      </div>

      {/* MODAL / DRAWER: GLOSSÁRIO DESCOMPLICADO */}
      {(activeTermKey || showFullGlossary) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl relative">
            <button
              onClick={() => {
                setActiveTermKey(null);
                setShowFullGlossary(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Visualização de um termo específico */}
            {activeTermKey && GLOSSARIO[activeTermKey] && (
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" /> Glossário Descomplicado
                </div>
                <h4 className="text-2xl font-black text-white mb-2">
                  {GLOSSARIO[activeTermKey].titulo}
                </h4>
                <div className="bg-emerald-950/30 border-l-4 border-emerald-500 p-3 rounded-r-xl my-3 text-emerald-300 font-semibold text-sm">
                  {GLOSSARIO[activeTermKey].resumo}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 mt-4">
                  {GLOSSARIO[activeTermKey].detalhe}
                </p>
                <button
                  onClick={() => setActiveTermKey(null)}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-xl text-sm transition shadow-lg"
                >
                  Entendi, continuar leitura
                </button>
              </div>
            )}

            {/* Visualização do Glossário Completo */}
            {showFullGlossary && (
              <div>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                  <BookOpen className="w-4 h-4" /> Dicionário Completo
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
                  Glossário Descomplicado
                </h3>
                <p className="text-xs text-slate-400 mb-6">
                  Todas as expressões difíceis e jurídicas explicadas em português simples para você nunca ser enrolado.
                </p>

                <div className="space-y-4">
                  {Object.entries(GLOSSARIO).map(([chave, item]) => (
                    <div key={chave} className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
                      <h4 className="text-base font-bold text-emerald-400 mb-1">
                        {item.titulo}
                      </h4>
                      <p className="text-xs text-slate-300 font-semibold mb-1">
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
                  className="w-full mt-6 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-sm transition"
                >
                  Fechar Glossário
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CORPO DO LIVRO DIGITAL COMPLETO */}
      <article
        className={`bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-12 shadow-2xl space-y-16 text-slate-200 font-sans ${
          fontSize === 'large' ? 'text-lg sm:text-xl leading-relaxed' : 'text-base sm:text-lg leading-relaxed'
        }`}
      >
        
        {/* SEÇÃO: CAPA DO EBOOK */}
        <section id="capa" className="text-center border-b border-slate-800 pb-16">
          <div className="max-w-md mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <img
              src="/ebook/capa.jpg"
              alt="Capa Protocolo Fim das Cobranças - Rodrigo Almeida"
              className="w-full h-auto object-cover"
            />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block mb-2">
            E-book Oficial • Edição Completa
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            PROTOCOLO FIM DAS COBRANÇAS
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-xl mx-auto">
            O Guia Secreto para Negociar com Bancos, Limpar seu Nome em até 7 Dias e Bloquear Ligações de Cobrança Legalmente.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 text-xs font-semibold text-slate-400">
            <span>Autor:</span>
            <strong className="text-white">Rodrigo Almeida</strong>
          </div>

          <div className="max-w-2xl mx-auto mt-6 text-left">
            <NotaEditorialCard capitulo="Aviso Geral da Obra" />
          </div>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 1: O RAIO-X DAS SUAS DÍVIDAS                     */}
        {/* ========================================================= */}
        <section id="capitulo-1" className="space-y-8 border-b border-slate-800 pb-16">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl mb-6">
            <img
              src="/ebook/capitulo-1-raiox.jpg"
              alt="Raio-X Financeiro"
              className="w-full max-h-72 object-cover object-center"
            />
          </div>

          <div className="border-l-4 border-emerald-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 block">
              Capítulo 1 — O primeiro passo para retomar o controle
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              O Raio-X das Suas Dívidas
            </h2>
          </div>

          <p>
            Respire fundo. Antes de começarmos, eu preciso que você faça uma coisa muito importante: <strong>perdoe-se</strong>.
          </p>

          <p>
            Eu sei exatamente como você se sente. O telefone toca dezenas de vezes por dia, as mensagens de cobrança não param de chegar, e a simples ideia de abrir o aplicativo do banco faz o seu estômago embrulhar. A vontade de fechar os olhos, colocar o celular no silencioso e fingir que o problema não existe é gigante. E sabe de uma coisa? Isso é uma reação humana completamente normal.
          </p>

          <p>
            Nós temos medo daquilo que não conhecemos. Quando você não sabe exatamente o tamanho da sua dívida, a sua mente cria um monstro de sete cabeças, muito pior e mais assustador do que ele realmente é.
          </p>

          <p className="font-semibold text-emerald-400">
            Hoje, nós vamos acender a luz desse quarto escuro.
          </p>

          <p>
            Pense nisso como uma ida ao médico. Quando você quebra o braço, o médico não tenta adivinhar onde o osso partiu. Ele pede um <TermoTooltip termo="Raio-X" />. Sem o <TermoTooltip termo="Raio-X" />, ele não pode colocar o gesso no lugar certo para a sua cura. Com a sua vida financeira, a regra é exatamente a mesma. Nós precisamos de um <TermoTooltip termo="Raio-X" /> detalhado das suas dívidas.
          </p>

          <p>
            E não se preocupe: você vai descobrir que o monstro é bem menor do que o banco quer que você acredite.
          </p>

          {/* Subtítulo: O grande truque */}
          <div className="pt-4">
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
              O GRANDE TRUQUE DOS BANCOS: A ILUSÃO DO VALOR TOTAL
            </h3>
            <p>
              A primeira coisa que você precisa entender é que o valor que o banco diz que você deve quase nunca é o valor real da sua dívida.
            </p>
            <p className="mt-4">
              Se você pegou R$ 2.000 emprestados há um ano e hoje o banco diz que você deve R$ 15.000, eu tenho uma ótima notícia para você: <strong>você não deve R$ 15.000</strong>. Você deve os R$ 2.000 originais, mais um juro justo. O resto é uma “gordura” criada por <TermoTooltip termo="Juros Abusivos" />, multas sobre multas e taxas escondidas que o sistema financeiro usa para tentar te assustar e te forçar a aceitar qualquer acordo ruim.
            </p>
            <p className="mt-4">
              Mas, para podermos negociar e arrancar toda essa gordura, você precisa saber exatamente quem são os seus credores.
            </p>
          </div>

          {/* PASSO 1: CONSULTAR CPF */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              PASSO 1: COMO CONSULTAR SEU CPF DE GRAÇA E VER A VERDADE
            </h3>
            <p>
              Você não precisa pagar ninguém, muito menos contratar um advogado agora, para saber como está o seu nome. Você tem o direito de acessar essas informações gratuitamente. Vamos usar duas ferramentas oficiais para isso:
            </p>

            {/* Dica 1: Serasa */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-wide">
                <Smartphone className="w-5 h-5" />
                <span>📱 CAIXA DE DICA: O APLICATIVO OFICIAL DA SERASA</span>
              </div>
              <p className="text-sm text-slate-300">
                Esqueça os sites duvidosos que cobram para “limpar seu nome”. O caminho oficial é gratuito e seguro:
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-300">
                <li>Vá até a loja de aplicativos do seu celular (Play Store ou App Store) e baixe o aplicativo <TermoTooltip termo="Serasa" />.</li>
                <li>Faça o seu cadastro rápido com o seu CPF.</li>
                <li>Na tela inicial, você verá a opção “Meu CPF” e, logo ali, as suas dívidas negativadas.</li>
              </ol>
              <div className="mt-3 p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl text-amber-200/90 text-xs">
                <strong>Atenção:</strong> Ao clicar na dívida, anote o valor original (o valor de quando a dívida começou) e o valor atual com juros. Guarde o valor original com carinho, pois é perto dele que nós vamos chegar na hora da negociação.
              </div>
            </div>

            {/* Dica 2: Consumidor.gov.br */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm uppercase tracking-wide">
                <Laptop className="w-5 h-5" />
                <span>💻 CAIXA DE DICA: A ARMA SECRETA: CONSUMIDOR.GOV.BR</span>
              </div>
              <p className="text-sm text-slate-300">
                O site <TermoTooltip termo="Consumidor.gov.br" /> é um serviço oficial do Governo Federal e o maior pesadelo dos bancos. Se uma dívida não aparece na <TermoTooltip termo="Serasa" />, mas o banco continua te ligando, é através deste portal que você vai agir.
              </p>
              <p className="text-sm text-slate-300">
                Lá, você pode abrir uma reclamação oficial contra a instituição financeira pedindo o “<TermoTooltip termo="Demonstrativo de Evolução da Dívida" />”. É um documento que obriga o banco a confessar, no papel, quanto você pegou emprestado de verdade e quanto eles estão cobrando de juros. Muitas vezes, só de abrir essa solicitação no site do governo, o banco já entra em contato oferecendo um desconto absurdo para você encerrar a reclamação.
              </p>
            </div>
          </div>

          {/* PASSO 2: A PIRÂMIDE DE PRIORIDADES */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              PASSO 2: A PIRÂMIDE DE PRIORIDADES (QUEM PAGAR PRIMEIRO?)
            </h3>
            <p>
              Agora que você tem a lista de todas as suas dívidas (pode usar um caderno velho, não precisa ser nada chique), chegou a hora de separar os meninos dos lobos.
            </p>
            <p>
              O maior erro de quem está endividado é tentar pagar todo mundo um pouquinho, ou pior: <strong>deixar de comprar comida para pagar o mínimo do cartão de crédito</strong>. A partir de hoje, você não fará mais isso.
            </p>
            <p>
              Você vai dividir as suas dívidas em três categorias. Essa é a sua nova regra de sobrevivência:
            </p>

            <div className="space-y-4 pt-2">
              {/* Prioridade 1 */}
              <div className="bg-emerald-950/20 border-l-4 border-emerald-500 p-5 rounded-r-2xl border-y border-r border-slate-800 space-y-2">
                <h4 className="text-lg font-black text-emerald-400">
                  PRIORIDADE 1: O ESSENCIAL PARA A VIDA (INTOCÁVEIS)
                </h4>
                <p className="text-sm text-slate-300">
                  <strong>O que é:</strong> Água, luz, gás, aluguel, condomínio e alimentação.
                </p>
                <p className="text-sm text-slate-300">
                  <strong>A regra:</strong> Estas são as dívidas que mantêm você e sua família vivos, abrigados e com dignidade. Elas sempre vêm em primeiro lugar. O banco pode esperar; o estômago dos seus filhos e o teto sobre a sua cabeça, não. Nunca tire dinheiro destas contas para pagar juros de banco.
                </p>
              </div>

              {/* Prioridade 2 */}
              <div className="bg-amber-950/20 border-l-4 border-amber-500 p-5 rounded-r-2xl border-y border-r border-slate-800 space-y-2">
                <h4 className="text-lg font-black text-amber-400">
                  PRIORIDADE 2: DÍVIDAS COM GARANTIA (PROTEGENDO SEUS BENS)
                </h4>
                <p className="text-sm text-slate-300">
                  <strong>O que é:</strong> Financiamento do seu carro ou da sua casa (onde o bem está no nome do banco até você quitar - <TermoTooltip termo="Dívidas com Garantia" label="alienação fiduciária" />).
                </p>
                <p className="text-sm text-slate-300">
                  <strong>A regra:</strong> Se você deixar de pagar o financiamento do carro, o banco pode mandar buscá-lo. Se não pagar a casa, pode ir a leilão. Portanto, essas dívidas precisam da sua atenção logo depois das contas de sobrevivência. Elas não podem ser ignoradas, pois o seu patrimônio está em jogo.
                </p>
              </div>

              {/* Prioridade 3 */}
              <div className="bg-red-950/20 border-l-4 border-red-500 p-5 rounded-r-2xl border-y border-r border-slate-800 space-y-2">
                <h4 className="text-lg font-black text-red-400">
                  PRIORIDADE 3: O POÇO SEM FUNDO (AS DÍVIDAS QUE VAMOS ESMAGAR)
                </h4>
                <p className="text-sm text-slate-300">
                  <strong>O que é:</strong> Cartão de crédito, cheque especial, empréstimo pessoal sem garantia, carnê de loja.
                </p>
                <p className="text-sm text-slate-300">
                  <strong>A regra:</strong> Essa é a categoria onde os bancos mais lucram. Eles cobram juros de 300% ou 400% ao ano. Sabe qual é o segredo aqui? Eles não podem tomar a sua casa ou a sua comida por causa de uma dívida de cartão de crédito. Eles vão gritar, vão mandar mensagens ameaçadoras, vão dizer que seu CPF será bloqueado (o que é mentira). Mas, no fim das contas, essas são as dívidas mais fáceis de negociar com descontos que chegam a 90%.
                </p>
              </div>
            </div>

            <p className="pt-2">
              Enquanto você não tiver dinheiro sobrando depois de pagar a Prioridade 1 e a Prioridade 2, você não vai pagar a Prioridade 3. Você vai esperar.
            </p>
            <p>
              Parece radical? Talvez. Mas o sistema financeiro é radical com você há anos. Chegou a hora de virar o jogo.
            </p>
            <p>
              Com o seu Raio-X pronto e as suas prioridades definidas, você acaba de retomar o controle do seu dinheiro. O monstro já não está mais no escuro; ele está no papel, catalogado e aguardando a sua sentença.
            </p>
            <p>
              No próximo capítulo, eu vou te mostrar que essa atitude de proteger o seu sustento antes de pagar os bancos não é apenas uma dica financeira. É uma lei federal. Você vai descobrir como a <TermoTooltip termo="Lei do Superendividamento" /> é o escudo blindado que o governo criou para proteger pessoas exatamente como você.
            </p>
            <p className="font-semibold text-emerald-400">
              Vire a página. A sua libertação financeira acabou de começar.
            </p>
          </div>

          {/* TABELA DE EXERCÍCIO COM ATALHO PARA A FERRAMENTA */}
          <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-lg font-bold text-white flex items-center gap-2">
              <span>📝</span> O Seu Raio-X: Escreva aqui as suas dívidas e classifique-as (1, 2 ou 3)
            </h4>
            <p className="text-xs text-slate-400">
              Preencha uma linha para cada dívida. Consulte os valores e classifique cada uma conforme as três prioridades apresentadas neste capítulo:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-bold">
                    <th className="py-2 px-3">Credor</th>
                    <th className="py-2 px-3">Valor Original</th>
                    <th className="py-2 px-3">Valor Atual</th>
                    <th className="py-2 px-3">Prioridade (1, 2 ou 3)</th>
                    <th className="py-2 px-3">Observações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  <tr>
                    <td className="py-2.5 px-3">Ex: Banco X</td>
                    <td className="py-2.5 px-3">R$ 2.000</td>
                    <td className="py-2.5 px-3">R$ 8.500</td>
                    <td className="py-2.5 px-3 text-red-400 font-bold">3 (Cartão)</td>
                    <td className="py-2.5 px-3 text-slate-500">Aguardar Feirão Limpa Nome</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3">Ex: Financiamento Auto</td>
                    <td className="py-2.5 px-3">R$ 25.000</td>
                    <td className="py-2.5 px-3">R$ 28.000</td>
                    <td className="py-2.5 px-3 text-amber-400 font-bold">2 (Garantia)</td>
                    <td className="py-2.5 px-3 text-slate-500">Priorizar para proteger o bem</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 p-4 bg-blue-950/40 border border-blue-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-white">⚡ Quer preencher e calcular tudo automaticamente?</p>
                <p className="text-xs text-slate-300">Nossa calculadora oficial calcula o Mínimo Existencial e gera o roteiro exato para você.</p>
              </div>
              <a
                href="/app/raiox"
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow transition whitespace-nowrap"
              >
                Abrir Calculadora do Raio-X &rarr;
              </a>
            </div>
          </div>

          <NotaEditorialCard capitulo="Capítulo 1 • Diagnóstico de Dívidas" />
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 2: COMO FUNCIONA A LEI DO SUPERENDIVIDAMENTO     */}
        {/* ========================================================= */}
        <section id="capitulo-2" className="space-y-8 border-b border-slate-800 pb-16">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl mb-6">
            <img
              src="/ebook/capitulo-2-escudo.jpg"
              alt="O escudo legal contra o superendividamento"
              className="w-full max-h-72 object-cover object-center"
            />
          </div>

          <div className="border-l-4 border-blue-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400 block">
              Capítulo 2 — O escudo legal contra o superendividamento
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Como Funciona a Lei do Superendividamento
            </h2>
          </div>

          <p>
            Se você passou os últimos meses tirando dinheiro da feira, cortando a mistura do almoço ou deixando a conta de luz atrasar só para pagar a parcela do banco, eu preciso que você leia esta frase com muita atenção: <strong>você foi vítima de uma covardia</strong>.
          </p>

          <p>
            Os bancos adoram fazer você se sentir culpado. Eles usam telemarketing agressivo, mandam mensagens de texto com a palavra "<TermoTooltip termo="Penhora" />" em letras garrafais e tratam você como se fosse um criminoso por não conseguir pagar um juro de 400% ao ano.
          </p>

          <p className="font-semibold text-white">
            Mas o que eles não te contam no telefone é que a lei brasileira está do seu lado.
          </p>

          <p>
            Existe um escudo poderoso que foi criado exatamente para proteger pessoas honestas que, por um tropeço da vida, perderam o controle das dívidas. Esse escudo se chama <TermoTooltip termo="Lei do Superendividamento" /> (Lei nº 14.181/2021), que atualizou o nosso Código de Defesa do Consumidor.
          </p>

          <p>
            Esqueça o "juridiquês" complicado. Eu vou te explicar como essa lei funciona na vida real e como ela vai salvar o seu salário a partir de hoje.
          </p>

          {/* O CONCEITO DE OURO: MÍNIMO EXISTENCIAL */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              O CONCEITO DE OURO: O “MÍNIMO EXISTENCIAL”
            </h3>
            <p>
              A <TermoTooltip termo="Lei do Superendividamento" /> trouxe para o Brasil uma regra que já existe há muito tempo em países de primeiro mundo. O coração dessa lei é um conceito chamado “<TermoTooltip termo="Mínimo Existencial" />”.
            </p>
            <p>
              <strong>O que é isso?</strong><br />
              O <TermoTooltip termo="Mínimo Existencial" /> é o valor sagrado que você precisa para se manter vivo e com dignidade. É o dinheiro do seu aluguel, da sua água, da sua luz, da sua comida e dos seus remédios (aquelas despesas que chamamos de Prioridade 1 no capítulo anterior).
            </p>
            <p>
              A lei é muito clara: <strong>nenhum banco, financeira ou loja pode cobrar uma parcela de dívida que invada o seu mínimo existencial</strong>.
            </p>
            <p>
              Em outras palavras: a lei proíbe que você passe fome para enriquecer o banco.
            </p>

            {/* Destaque Escudo */}
            <div className="p-6 bg-gradient-to-r from-blue-950/60 to-emerald-950/60 border border-blue-500/40 rounded-2xl flex items-center gap-4 my-6 shadow-xl">
              <Shield className="w-10 h-10 text-emerald-400 shrink-0" />
              <div>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  🛡️ A lei proíbe que você passe fome para enriquecer o banco
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Se a parcela do seu empréstimo ou do seu cartão de crédito está comendo o dinheiro do seu supermercado, o banco está cometendo uma irregularidade.
                </p>
              </div>
            </div>

            <p>
              Eles não podem “limpar” a sua conta salário deixando você sem nada. Você tem o direito de renegociar essa dívida para que a parcela caiba no que sobra depois que o seu sustento estiver garantido.
            </p>
          </div>

          {/* COMO OS BANCOS MENTEM PARA VOCÊ */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              COMO OS BANCOS MENTEM PARA VOCÊ
            </h3>
            <p>
              Quando o atendente de cobrança liga, ele age como se o banco tivesse o poder supremo. Ele diz: <em>“Se o senhor não pagar os R$ 800 hoje, vamos bloquear seus bens”</em>.
            </p>
            <p>
              Eles fazem isso porque 99% dos brasileiros não conhecem os seus direitos. Eles ganham no grito. Mas quando você conhece a <TermoTooltip termo="Lei do Superendividamento" />, o jogo muda completamente.
            </p>
            <p>
              O banco não quer que você vá à Justiça ou ao Procon usar essa lei, porque lá o juiz vai obrigar o banco a mostrar aquela montanha de <TermoTooltip termo="Juros Abusivos" />, vai cortar toda a “gordura” da dívida e vai forçar a instituição a aceitar um plano de pagamento que você realmente possa pagar (muitas vezes dividido em até 5 anos).
            </p>
            <p>
              Como os bancos fogem da Justiça como o diabo foge da cruz, só de você mencionar que conhece a lei, o banco já muda o tom da conversa com você.
            </p>
          </div>

          {/* COMO USAR A LEI COMO ARGUMENTO NA NEGOCIAÇÃO */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              COMO USAR A LEI COMO ARGUMENTO NA NEGOCIAÇÃO
            </h3>
            <p>
              Você não precisa contratar um advogado caro para usar o <TermoTooltip termo="Mínimo Existencial" /> a seu favor. Você vai usar isso como o seu principal argumento verbal (ou por escrito) na hora de lidar com as cobranças.
            </p>
            <p>
              A partir de agora, toda vez que o banco te ligar cobrando ou mandando uma proposta absurda, você vai mudar a sua postura. Você vai deixar de ser a presa assustada e vai passar a ser o consumidor que conhece a lei.
            </p>
            <p className="font-semibold text-white">
              Veja a diferença na prática:
            </p>

            {/* TABELA COMPARATIVA LADO A LADO */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              
              {/* O jeito errado */}
              <div className="bg-red-950/20 border border-red-900/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-red-400 font-extrabold text-sm uppercase">
                  <span>❌</span>
                  <span>O jeito errado (A presa assustada)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 space-y-2">
                  <p>
                    <strong className="text-white">Banco:</strong> “Senhor, sua dívida está em R$ 10.000. Podemos parcelar em 36x de R$ 500.”
                  </p>
                  <p className="p-3 bg-red-950/40 rounded-xl text-red-200">
                    <strong className="text-white">Você:</strong> “Pelo amor de Deus, eu não tenho esse dinheiro, eu ganho pouco, não sei o que fazer, me dá mais um prazo...”
                  </p>
                  <p className="text-xs text-red-400 italic">
                    (Isso só mostra fraqueza e o banco vai continuar pressionando).
                  </p>
                </div>
              </div>

              {/* O jeito certo */}
              <div className="bg-emerald-950/20 border border-emerald-800/60 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase">
                  <span>✅</span>
                  <span>O jeito certo (O consumidor blindado)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-300 space-y-2">
                  <p>
                    <strong className="text-white">Banco:</strong> “Senhor, sua dívida está em R$ 10.000. Podemos parcelar em 36x de R$ 500.”
                  </p>
                  <p className="p-3 bg-emerald-950/40 rounded-xl text-emerald-200">
                    <strong className="text-white">Você:</strong> “Eu tenho total interesse em quitar essa dívida pelo valor justo, mas eu não vou aceitar essa proposta. Uma parcela de R$ 500 compromete o meu mínimo existencial e o meu sustento básico, o que fere a Lei do Superendividamento. Só vou fechar um acordo quando a parcela couber no meu orçamento sem tirar a comida da minha mesa. Qual é a melhor proposta à vista com redução de juros que vocês têm?”
                  </p>
                </div>
              </div>

            </div>

            <p className="font-black text-xl text-emerald-400 pt-4">
              BOOM!
            </p>

            <p>
              Quando você fala isso, o atendente do outro lado da linha entra em choque. Ele percebe imediatamente que não está falando com um leigo. Ele anota no sistema do banco que você é um “cliente orientado” e, magicamente, as propostas de negociação que chegam para você começam a ficar muito mais baratas e flexíveis.
            </p>

            <p>
              A <TermoTooltip termo="Lei do Superendividamento" /> não é um passe de mágica para a dívida sumir, mas ela é a garantia de que você vai ditar as regras do jogo daqui para frente. Você só vai pagar o que é justo, e só quando o seu sustento estiver garantido.
            </p>

            <p>
              Agora que você tem o seu Raio-X nas mãos e o Escudo da Lei protegendo o seu peito, você está pronto para atacar.
            </p>

            <p>
              No próximo capítulo, eu vou te entregar O Roteiro Exato de Negociação. Você vai descobrir a poderosa “<TermoTooltip termo="Tática do Silêncio" />” e terá acesso aos modelos de mensagens prontos que eu preparei para você simplesmente copiar, colar e ver a sua dívida despencar.
            </p>

            <p className="font-semibold text-emerald-400">
              Prepare-se para o pulo do gato.
            </p>

            <NotaEditorialCard capitulo="Capítulo 2 • Lei do Superendividamento" />
          </div>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 3: O ROTEIRO EXATO DE NEGOCIAÇÃO                 */}
        {/* ========================================================= */}
        <section id="capitulo-3" className="space-y-8 border-b border-slate-800 pb-16">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl mb-6">
            <img
              src="/ebook/capitulo-3-negociacao.jpg"
              alt="O Roteiro Exato de Negociação"
              className="w-full max-h-72 object-cover object-center"
            />
          </div>

          <div className="border-l-4 border-purple-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 block">
              Capítulo 3 — A tática do silêncio e a mensagem pronta para negociar
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              O Roteiro Exato de Negociação
            </h2>
          </div>

          <p>
            Você já preparou o seu <TermoTooltip termo="Raio-X" /> e separou suas dívidas por prioridade. Você já sabe que o seu sustento — o seu <TermoTooltip termo="Mínimo Existencial" /> — é blindado pela lei e vem antes de qualquer boleto bancário.
          </p>

          <p>
            Agora, chegou o momento de virar a mesa.
          </p>

          <p>
            Negociar uma dívida é exatamente como um jogo de pôquer. Quem demonstra desespero primeiro, perde. O banco joga a carta do terror psicológico: liga dezenas de vezes, manda mensagens com palavras em maiúsculo e ameaça bloquear a sua vida. O objetivo deles é fazer você agir pela emoção e aceitar a primeira (e péssima) proposta de parcelamento que empurra o problema com a barriga.
          </p>

          <p>
            Neste capítulo, você vai aprender a usar a maior fraqueza do sistema financeiro contra ele mesmo. Você vai aprender a jogar frio.
          </p>

          {/* A PODEROSA TÁTICA DO SILÊNCIO */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              A PODEROSA TÁTICA DO SILÊNCIO
            </h3>
            <p>
              Existe um segredo nos bastidores das grandes instituições financeiras que os gerentes rezam para você nunca descobrir: <strong>para o banco, o tempo é o maior inimigo</strong>.
            </p>
            <p>
              Quando você para de atender todas as ligações desesperadamente e simplesmente aplica a “<TermoTooltip termo="Tática do Silêncio" />”, algo mágico acontece no sistema deles. Nos primeiros meses de atraso, o banco cobra com agressividade. Mas, à medida que os meses passam e você se mantém firme, priorizando a comida da sua mesa e ignorando as ameaças vazias, a sua dívida começa a envelhecer.
            </p>
            <p>
              Contabilmente, uma dívida velha é um prejuízo terrível para o banco. O sistema deles entende que você se tornou um cliente de “difícil recuperação”. E é exatamente aqui que o milagre financeiro acontece.
            </p>
            <p>
              Para não ficar no prejuízo total, o banco prefere receber 10% de alguma coisa do que 100% de nada. É por isso que, ao ter paciência e usar o silêncio a seu favor, você começa a ser convidado para os famosos <TermoTooltip termo="Feirões Limpa Nome" /> (como o da <TermoTooltip termo="Serasa" />).
            </p>
            <p>
              Nesses feirões, aquela dívida irreal de cartão de crédito que estava em R$ 10.000 de repente aparece no sistema por R$ 1.000, ou até R$ 800. São descontos reais que chegam a 90% do valor total. O banco corta toda aquela “gordura” de <TermoTooltip termo="Juros Abusivos" /> só para limpar o seu nome do sistema dele. Portanto, se você não tem o dinheiro para pagar agora, não se desespere: o tempo está trabalhando a favor do seu desconto.
            </p>
          </div>

          {/* O ROTEIRO DE OURO */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              O ROTEIRO DE OURO (COPIE E COLE)
            </h3>
            <p>
              Quando você finalmente tiver juntado um valor que não comprometa a sua sobrevivência (mesmo que seja pouco) ou quando o banco vier com uma proposta que pareça interessante no WhatsApp, você não vai negociar de forma amadora.
            </p>
            <p>
              Você vai usar um roteiro psicológico que trava o atendente e o obriga a levar a sua proposta a sério. Dê preferência sempre para negociar por chat, WhatsApp ou e-mail, pois assim você tem tudo registrado e não sofre a pressão emocional de uma ligação.
            </p>
            <p>
              Quando o banco fizer a cobrança, simplesmente copie o texto abaixo, cole no chat e envie:
            </p>

            <NotaEditorialCard capitulo="Capítulo 3 • Modelo de Mensagem" />

            {/* CAIXA DE MENSAGEM COM BOTÃO COPIAR */}
            <div className="bg-slate-950 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                  [MENSAGEM PRONTA - COPIE E COLE]
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar Mensagem</span>
                    </>
                  )}
                </button>
              </div>

              <blockquote className="text-base sm:text-lg font-medium text-white italic bg-slate-900 p-4 rounded-2xl border border-slate-800 leading-relaxed">
                “{mensagemPronta}”
              </blockquote>
            </div>

            {/* DESMONTE DA MENSAGEM */}
            <div className="pt-4 space-y-3">
              <h4 className="text-base sm:text-lg font-bold text-white">
                Vamos desmontar essa mensagem para você entender por que ela é tão letal:
              </h4>

              <ul className="space-y-3 text-sm sm:text-base">
                <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400">“Quero quitar minha dívida pelo valor justo...”</strong>
                  <p className="text-slate-300 mt-1">
                    Você demonstra boa-fé. Mostra que não é um caloteiro, mas que não aceita pagar juros abusivos.
                  </p>
                </li>
                <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400">“...baseado na Lei do Superendividamento.”</strong>
                  <p className="text-slate-300 mt-1">
                    Você mostra que conhece os seus direitos e que o banco não pode tomar o dinheiro do seu <TermoTooltip termo="Mínimo Existencial" />. O atendente percebe na hora que não pode te enrolar.
                  </p>
                </li>
                <li className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                  <strong className="text-emerald-400">“Qual a proposta à vista com desconto máximo...”</strong>
                  <p className="text-slate-300 mt-1">
                    Você muda a direção da conversa. Em vez de aceitar o parcelamento eterno deles, você joga a isca de um pagamento à vista, que é o que o banco mais deseja.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          {/* A REGRA DE OURO DA NEGOCIAÇÃO */}
          <div className="pt-4 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              A REGRA DE OURO DA NEGOCIAÇÃO
            </h3>
            <p className="font-bold text-red-400">
              Nunca, em hipótese alguma, aceite a primeira oferta.
            </p>
            <p>
              Quando você enviar o roteiro acima, o banco vai voltar com um desconto. Se a sua dívida era de R$ 5.000, eles vão oferecer por R$ 3.000. Diga não. Responda: <em>“Agradeço, mas esse valor ainda fere o meu sustento básico. Quando conseguirem chegar em R$ 800, nós fechamos acordo.”</em>
            </p>
            <p>
              Volte para a <TermoTooltip termo="Tática do Silêncio" />. Dias ou semanas depois, eles voltarão com uma proposta melhor. Mantenha essa dança até o valor chegar muito próximo do que você pegou emprestado lá no início.
            </p>
            <p>
              Quando finalmente chegarem no valor que cabe no seu bolso, exija o boleto oficial de quitação (e sempre confira no aplicativo do seu banco, na hora de pagar, se o recebedor é realmente a instituição financeira, para evitar golpes).
            </p>
            <p>
              Ao pagar esse boleto, <strong>em até 5 dias úteis, o seu CPF estará limpo</strong>. O peso de uma tonelada sairá das suas costas. O seu nome, que é o seu maior patrimônio, voltará a ser respeitado na praça.
            </p>
            <p>
              Mas limpar o nome é apenas a metade da batalha. Voltar a ter crédito e continuar sem dinheiro na conta não resolve a sua vida — apenas prepara o terreno para uma nova dívida no futuro. No próximo e último capítulo, eu vou te mostrar exatamente qual é o próximo passo obrigatório para você construir uma muralha ao redor do seu dinheiro e nunca mais passar por esse pesadelo.
            </p>

            {/* CHECKLIST INTERATIVO DO CAPÍTULO 3 */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Checklist de Fixação:</span>
              </h4>
              <div className="space-y-2 text-sm text-slate-300">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={check1}
                    onChange={(e) => setCheck1(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                  />
                  <span className={check1 ? 'line-through text-slate-500' : ''}>Ignorei as ameaças falsas</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={check2}
                    onChange={(e) => setCheck2(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                  />
                  <span className={check2 ? 'line-through text-slate-500' : ''}>Esperei o momento do Feirão</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={check3}
                    onChange={(e) => setCheck3(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500"
                  />
                  <span className={check3 ? 'line-through text-slate-500' : ''}>Usei a mensagem pronta</span>
                </label>
              </div>
            </div>

            <NotaEditorialCard capitulo="Capítulo 3 • Negociação & Acordos" />
          </div>
        </section>

        {/* ========================================================= */}
        {/* CAPÍTULO 4: PRÓXIMOS PASSOS                               */}
        {/* ========================================================= */}
        <section id="capitulo-4" className="space-y-8 pb-8">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-xl mb-6">
            <img
              src="/ebook/capitulo-4-proximos-passos.jpg"
              alt="Próximos Passos: Plano Financeiro"
              className="w-full max-h-72 object-cover object-center"
            />
          </div>

          <div className="border-l-4 border-amber-500 pl-4 py-1">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
              Próximos Passos — O caminho para nunca mais ficar sem dinheiro
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              DE DEVEDOR A INVESTIDOR: O MÉTODO DEFINITIVO
            </h2>
          </div>

          <p>
            Parabéns! Se você chegou até aqui e leu todas as páginas, <strong>você já não é mais a mesma pessoa que abriu este e-book minutos atrás</strong>.
          </p>

          <p>
            Você agora tem o mapa exato nas mãos. Você sabe como fazer o <TermoTooltip termo="Raio-X" /> das suas dívidas, sabe que a <TermoTooltip termo="Lei do Superendividamento" /> blinda o seu sustento (e o da sua família), e tem o roteiro exato para negociar de igual para igual com qualquer banco. O pesadelo de ter o CPF restrito está com os dias contados.
          </p>

          <p>
            Mas, como eu prometi ser 100% transparente com você desde o início, eu preciso te dizer uma verdade dura: <strong>limpar o seu nome é apenas o primeiro passo</strong>.
          </p>

          <p>
            Pense comigo: limpar o nome é como tomar um remédio para a febre. Ele alivia a dor na hora, tira o peso das suas costas e te deixa respirar. Mas se você não mudar a forma como gerencia o seu dinheiro no dia a dia, a “infecção” continua lá. O risco de, daqui a alguns meses, você voltar para o ciclo de <TermoTooltip termo="Juros Abusivos" /> e cartões estourados é gigante.
          </p>

          <div className="p-5 bg-blue-950/30 border border-blue-600/30 rounded-2xl">
            <p className="text-sm text-blue-200">
              💡 Se você adicionou a nossa <strong>Planilha de Organização Pessoal Inteligente</strong> na hora de fechar a compra deste e-book, fantástico! Você já tem em mãos a ferramenta exata para mapear cada centavo que entra e sai da sua conta a partir de hoje. Use-a sem moderação.
            </p>
          </div>

          <p>
            Mas para blindar a sua conta de vez e nunca mais passar pelo desespero de ver o salário acabar no dia 10, você precisa de uma mudança de mentalidade e de uma estratégia completa de crescimento. Como este e-book foi escrito para ser um “kit de primeiros socorros” focado exclusivamente em limpar o seu CPF, eu não teria espaço aqui para te ensinar a multiplicar o seu dinheiro.
          </p>

          <p className="font-semibold text-white">
            Por isso, o seu próximo passo obrigatório é conhecer o método do Marcos Aleixo.
          </p>

          <div className="pt-2 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              DE DEVEDOR A INVESTIDOR: O MÉTODO DEFINITIVO
            </h3>
            <p>
              Eu pesquisei muito antes de fazer essa indicação. O Marcos é o criador do treinamento <em>Finanças Pessoais, Educação e Planejamento Financeiro</em>. Ele é Administrador de Empresas com MBA em Finanças, Auditoria e Controladoria.
            </p>
            <p>
              <strong>Mas sabe o que realmente importa?</strong> Ele viveu na pele exatamente o que você está passando hoje.
            </p>
            <p>
              O Marcos já esteve no fundo do poço das dívidas. E foi aplicando um método próprio e à prova de falhas que ele saiu da posição de devedor para se tornar um investidor de sucesso (ele investe na bolsa desde 2014 e hoje vive de <TermoTooltip termo="Renda Passiva" />).
            </p>
            <p>
              No treinamento dele, que é totalmente em vídeo, direto ao ponto e dividido em 12 módulos rápidos, você vai aprender a construir a sua muralha financeira:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
                <h4 className="font-bold text-emerald-400 mb-1">
                  Mentalidade e Hábitos (Módulos 4 e 5)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Como reprogramar o seu cérebro para parar de sabotar o próprio bolso e fazer o dinheiro sobrar todo mês.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
                <h4 className="font-bold text-blue-400 mb-1">
                  Planejamento e Sonhos (Módulos 3 e 7)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Como gastar bem e aproveitar a vida sem passar raiva, montando um orçamento que te permite realizar sonhos (como viajar ou trocar de carro) sem fazer dívidas.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
                <h4 className="font-bold text-amber-400 mb-1">
                  Proteção Familiar (Módulo 10)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Como fazer a gestão de riscos e garantir que a sua família nunca fique desamparada se um imprevisto acontecer.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl">
                <h4 className="font-bold text-purple-400 mb-1">
                  O Próximo Nível (Módulo 6 e Bônus)
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Como separar <TermoTooltip termo="Ativos e Passivos" /> para crescer o seu patrimônio. Você vai ganhar aulas bônus mostrando do zero como escolher uma corretora segura e dar os primeiros passos para fazer o dinheiro trabalhar para você.
                </p>
              </div>
            </div>
          </div>

          {/* A DECISÃO É SUA */}
          <div className="pt-6 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              A DECISÃO É SUA
            </h3>
            <p>
              Você pode pegar tudo o que aprendeu neste e-book, limpar o seu nome e tentar seguir sozinho, correndo o risco de tropeçar nos mesmos erros do passado...
            </p>
            <p>
              Ou você pode pegar na mão de um especialista que já trilhou esse caminho, saiu das dívidas e hoje tem uma vida financeira livre e próspera.
            </p>
            <p>
              E o melhor de tudo: o método completo do Marcos custa apenas R$ 97,00 (ou 12x de R$ 10,03 no cartão). Isso é menos do que um lanche na padaria por mês para aprender a dominar o seu dinheiro para o resto da vida. Além disso, você tem 7 dias de garantia incondicional — se entrar, assistir às aulas e achar que não é para você, ele devolve todo o seu dinheiro. O risco é zero.
            </p>
            <p className="font-semibold text-white">
              Você já deu o primeiro passo para limpar o seu passado. Agora, é hora de construir o seu futuro.
            </p>

            <NotaEditorialCard capitulo="Capítulo 4 • Educação & Próximos Passos" />

            {/* BOTÃO DE CTA FINAL */}
            <div className="pt-4 text-center">
              <a
                href="https://go.hotmart.com/H107879360D"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-2xl shadow-emerald-500/20 transition transform hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>👉 CLIQUE AQUI PARA CONHECER O MÉTODO COMPLETO E GARANTIR SUA VAGA</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-8 text-center border-t border-slate-800 text-slate-400">
              <p className="text-base font-semibold text-slate-300">
                Um grande abraço, e muito sucesso na sua nova vida financeira!
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Rodrigo Almeida • Protocolo Fim das Cobranças
              </p>
            </div>
          </div>
        </section>

      </article>

    </div>
  );
}
