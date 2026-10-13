import React, { useState } from 'react';
import { Plus, Trash2, ShieldCheck, ShieldAlert, Copy, Check, TrendingDown, AlertCircle, AlertTriangle, Scale, Lock, AlertOctagon, Home, Car, Landmark, FileText, ArrowRight } from 'lucide-react';

interface Divida {
  id: string;
  credor: string;
  tipo: string;
  valorOriginal: number;
  valorCobrado: number;
  parcelaMensal: number;
}

export default function RaioXCalculator() {
  // Estado 100% efêmero em memória (sem localStorage para viabilizar o upsell da planilha)
  const [renda, setRenda] = useState<number>(6000);
  const [gastosEssenciais, setGastosEssenciais] = useState<number>(2000);

  const [dividas, setDividas] = useState<Divida[]>([]);

  const [novoCredor, setNovoCredor] = useState('');
  const [novoTipo, setNovoTipo] = useState('Cartão de Crédito');
  const [novoOriginal, setNovoOriginal] = useState('');
  const [novoCobrado, setNovoCobrado] = useState('');
  const [novaParcela, setNovaParcela] = useState('');

  const [copiadoGarantia, setCopiadoGarantia] = useState(false);
  const [copiadoConsumo, setCopiadoConsumo] = useState(false);

  const adicionarDivida = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoCredor || !novoOriginal || !novoCobrado) return;

    const nova: Divida = {
      id: Date.now().toString(),
      credor: novoCredor,
      tipo: novoTipo,
      valorOriginal: parseFloat(novoOriginal) || 0,
      valorCobrado: parseFloat(novoCobrado) || 0,
      parcelaMensal: parseFloat(novaParcela) || 0,
    };

    setDividas([...dividas, nova]);
    setNovoCredor('');
    setNovoOriginal('');
    setNovoCobrado('');
    setNovaParcela('');
  };

  const removerDivida = (id: string) => {
    setDividas(dividas.filter((d) => d.id !== id));
  };

  // 1. Cálculos de Renda e Sobrevivência (Passo 1)
  const sobraParaDividas = renda - gastosEssenciais;

  // 2. Separação Estrita em 3 Categorias Legais
  const dividasGarantiaReal = dividas.filter((d) => d.tipo.includes('Garantia Real'));
  const dividasConsumo = dividas.filter(
    (d) => !d.tipo.includes('Garantia Real') && !d.tipo.includes('Impostos') && !d.tipo.includes('Pensão')
  );
  const dividasLegais = dividas.filter(
    (d) => d.tipo.includes('Impostos') || d.tipo.includes('Pensão')
  );

  // Totais Gerais
  const totalOriginalGeral = dividas.reduce((acc, d) => acc + d.valorOriginal, 0);
  const totalCobradoGeral = dividas.reduce((acc, d) => acc + d.valorCobrado, 0);
  const totalParcelasGeral = dividas.reduce((acc, d) => acc + d.parcelaMensal, 0);
  const gorduraJurosGeral = Math.max(0, totalCobradoGeral - totalOriginalGeral);

  const comprometimentoGeral = renda > 0 ? (totalParcelasGeral / renda) * 100 : 0;
  const sobraAposTodasParcelas = renda - totalParcelasGeral;
  const saldoFinalMes = sobraParaDividas - totalParcelasGeral;

  // Subtotais por Categoria
  const totalParcelasGarantia = dividasGarantiaReal.reduce((acc, d) => acc + d.parcelaMensal, 0);
  const totalCobradoGarantia = dividasGarantiaReal.reduce((acc, d) => acc + d.valorCobrado, 0);

  const totalParcelasConsumo = dividasConsumo.reduce((acc, d) => acc + d.parcelaMensal, 0);
  const totalCobradoConsumo = dividasConsumo.reduce((acc, d) => acc + d.valorCobrado, 0);
  const totalOriginalConsumo = dividasConsumo.reduce((acc, d) => acc + d.valorOriginal, 0);

  const totalParcelasLegais = dividasLegais.reduce((acc, d) => acc + d.parcelaMensal, 0);
  const totalCobradoLegais = dividasLegais.reduce((acc, d) => acc + d.valorCobrado, 0);

  // Análise da Lei 14.181 para Consumo:
  const sobraAposConsumo = renda - totalParcelasConsumo;
  const comprometimentoConsumo = renda > 0 ? (totalParcelasConsumo / renda) * 100 : 0;

  let cenarioConsumo = 'REGULAR';
  if (sobraAposConsumo < 600) {
    cenarioConsumo = 'SUPER_CRITICO';
  } else if (comprometimentoConsumo > 35 && sobraAposConsumo < gastosEssenciais) {
    cenarioConsumo = 'SUPER_FUNCIONAL';
  } else {
    cenarioConsumo = 'REGULAR';
  }

  const nomesGarantia = dividasGarantiaReal.map((d) => d.credor).join(', ') || 'instituições com garantia';
  const nomesConsumo = dividasConsumo.map((d) => d.credor).join(', ') || 'instituições financeiras de consumo';
  const nomesLegais = dividasLegais.map((d) => `${d.credor} (${d.tipo})`).join(', ') || 'obrigações legais/governamentais';

  // 3. Modelos Informativos de Notificação
  // A) Roteiro de Garantia Real (CDC Art. 52, § 2º)
  const textoGarantiaReal = `SUGESTÃO DE SOLICITAÇÃO DE SALDO DEVEDOR (ART. 52, § 2º DO CDC - CONSULTE UM ADVOGADO ANTES DE ENVIAR)\n\nÀ instituição financeira credora (${nomesGarantia}):\n\nReferente ao Contrato de Financiamento com Garantia Real nº [número do contrato], com saldo cobrado registrado em R$ ${totalCobradoGarantia.toFixed(2)} e parcelas de R$ ${totalParcelasGarantia.toFixed(2)}/mês:\n\nVenho por meio desta requerer formalmente a emissão da Planilha Demonstrativa do Saldo Devedor Atualizado para Liquidação Antecipada Integral, com a devida e obrigatória redução proporcional dos juros futuros e encargos vincendos, nos termos expressos do Artigo 52, § 2º do Código de Defesa do Consumidor (Lei Federal nº 8.078/1990).\n\nInformo que, em razão de reestruturação do orçamento familiar, estou avaliando a viabilidade de alienação/venda amigável do bem no mercado convencional para quitação definitiva do débito e liberação do gravame fiduciário antes de qualquer consolidação de mora.\n\nSolicito o envio do demonstrativo discriminado no prazo legal de até 5 (cinco) dias úteis.`;

  // B) Roteiro de Consumo (Lei 14.181/2021)
  const gerarMensagemConsumo = () => {
    if (cenarioConsumo === 'SUPER_CRITICO') {
      return `SUGESTÃO DE NOTIFICAÇÃO EXTRAJUDICIAL (CONSULTE UM PROFISSIONAL ANTES DE ENVIAR)\n\nÀ assessoria de cobrança de (${nomesConsumo}):\n\nInformo formalmente que a soma das parcelas de consumo exigidas (R$ ${totalParcelasConsumo.toFixed(2)}/mês) sobre minha renda líquida de R$ ${renda.toFixed(2)} deixa um saldo residual de apenas R$ ${sobraAposConsumo.toFixed(2)} em minha conta.\n\nIsto configura VIOLAÇÃO DIRETA DO MÍNIMO EXISTENCIAL garantido pelo Decreto nº 11.567/2023 e pelo Art. 54-A da Lei nº 14.181/2021 (Lei do Superendividamento), que fixa o piso legal intocável de R$ 600,00 para subsistência digna.\n\nSolicito a suspensão imediata de cobranças coercitivas e a abertura de procedimento formal de repactuação amigável com redução de encargos e parcelas adequadas à minha capacidade financeira, sob pena de instauração de processo judicial compulsório em até 5 anos.`;
    }

    if (cenarioConsumo === 'SUPER_FUNCIONAL') {
      return `SUGESTÃO DE NOTIFICAÇÃO EXTRAJUDICIAL (CONSULTE UM PROFISSIONAL ANTES DE ENVIAR)\n\nÀ assessoria de cobrança de (${nomesConsumo}):\n\nVenho manifestar intenção de quitação, porém informo que as parcelas mensais somadas de R$ ${totalParcelasConsumo.toFixed(2)} comprometem ${comprometimentoConsumo.toFixed(1)}% dos meus rendimentos líquidos (R$ ${renda.toFixed(2)}), ultrapassando a margem segura de 30% a 35%.\n\nSomando essas deduções aos meus custos básicos inadiáveis de subsistência familiar, o orçamento mensal encontra-se em colapso, caracterizando a impossibilidade manifesta de pagamento (Art. 54-A da Lei nº 14.181/2021).\n\nSolicito a abertura de renegociação conjunta e adequação das parcelas à minha capacidade real de pagamento, sem prejuízo de audiência global de conciliação perante os órgãos de defesa do consumidor.`;
    }

    return `SUGESTÃO DE COMUNICAÇÃO DE QUITAÇÃO À VISTA\n\nÀ assessoria de negociação de (${nomesConsumo}):\n\nReferente ao saldo cobrado de R$ ${totalCobradoConsumo.toFixed(2)} sobre o valor original de R$ ${totalOriginalConsumo.toFixed(2)}:\n\nTenho interesse na liquidação do saldo devedor através de pagamento integral em cota única à vista. Solicito o envio da melhor proposta com desconto máximo sobre o saldo e retirada de encargos moratórios para quitação imediata e baixa nos órgãos de proteção ao crédito.`;
  };

  const textoConsumo = gerarMensagemConsumo();

  const handleCopiarGarantia = () => {
    navigator.clipboard.writeText(textoGarantiaReal);
    setCopiadoGarantia(true);
    setTimeout(() => setCopiadoGarantia(false), 2500);
  };

  const handleCopiarConsumo = () => {
    navigator.clipboard.writeText(textoConsumo);
    setCopiadoConsumo(true);
    setTimeout(() => setCopiadoConsumo(false), 2500);
  };

  const totalTiposAtivos =
    (dividasGarantiaReal.length > 0 ? 1 : 0) +
    (dividasConsumo.length > 0 ? 1 : 0) +
    (dividasLegais.length > 0 ? 1 : 0);

  return (
    <div className="space-y-8 pb-16">
      {/* MODO DE PRIVACIDADE E UPSELL DA PLANILHA NO TOPO */}
      <div className="space-y-3">
        {/* Modo de Privacidade */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-start gap-3 text-slate-400 text-xs shadow-lg">
          <Lock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
          <p>
            <strong>🔒 Modo de Privacidade Ativo:</strong> Para a sua segurança, os dados inseridos abaixo são processados apenas na memória temporária do seu dispositivo e serão apagados assim que você fechar ou atualizar esta tela.
          </p>
        </div>

        {/* Aviso de Upsell da Planilha / Área de Membros Kiwify */}
        <div className="bg-blue-950/40 border border-blue-600/40 rounded-2xl p-4 flex items-start gap-3 text-blue-200 text-xs shadow-lg">
          <span className="text-base flex-shrink-0">💡</span>
          <div className="space-y-1">
            <p>
              <strong>Quer salvar o seu Raio-X?</strong> Se você adquiriu o nosso <strong>Combo VIP (App + Planilha Inteligente)</strong>, o seu acesso ao arquivo definitivo do Excel (que salva as suas dívidas para sempre e calcula automaticamente a divisão de renda 50/30/20) será liberado diretamente na <strong>área de membros da Kiwify</strong> em 8 dias após a data da sua compra. Fique de olho na área de membros da Kiwify!
            </p>
            <p className="text-blue-300 font-medium pt-0.5">
              👉 Se você ainda não garantiu o combo, você ainda pode adquirir a Planilha Inteligente e os materiais complementares diretamente dentro da própria área de membros da Kiwify.
            </p>
          </div>
        </div>
      </div>

      {/* PASSO 1: RENDA E GASTOS BÁSICOS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span>💰</span> Passo 1: Sua Renda e Custos de Sobrevivência
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Registre seu orçamento antes de lançar as dívidas para identificar quanto sobra de fato para viver.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase font-bold text-slate-400 mb-2">
              Sua Renda Líquida Mensal (R$)
            </label>
            <input
              type="number"
              value={renda || ''}
              onChange={(e) => setRenda(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold text-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: 6000"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-bold text-slate-400 mb-2">
              Gastos Básicos (Moradia, Água, Luz, Comida, Remédios)
            </label>
            <input
              type="number"
              value={gastosEssenciais || ''}
              onChange={(e) => setGastosEssenciais(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-bold text-lg focus:outline-none focus:border-blue-500"
              placeholder="Ex: 2000"
            />
          </div>
        </div>

        {/* Exibição Matemática Precisa do Passo 1 */}
        <div className="mt-5 p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3">
          <div className="flex flex-wrap justify-between items-center text-sm border-b border-slate-700/60 pb-3">
            <span className="text-slate-300">Renda Líquida Declarada:</span>
            <span className="font-bold text-white text-base">R$ {renda.toFixed(2)}</span>
          </div>
          <div className="flex flex-wrap justify-between items-center text-sm border-b border-slate-700/60 pb-3">
            <span className="text-slate-300">Gastos Básicos de Sobrevivência:</span>
            <span className="font-bold text-slate-300 text-base">- R$ {gastosEssenciais.toFixed(2)}</span>
          </div>
          <div className="flex flex-wrap justify-between items-center pt-1">
            <div>
              <span className="text-xs uppercase font-bold text-slate-400 block">Sobra Inicial para Dívidas (Renda - Gastos):</span>
              <span className={`text-2xl font-black ${sobraParaDividas >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                R$ {sobraParaDividas.toFixed(2)}
              </span>
            </div>

            <div className="text-right text-xs bg-slate-900/80 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block">Piso Legal do Mínimo Existencial:</span>
              <span className="font-bold text-emerald-400 text-sm">R$ 600,00</span>
              <span className="text-[10px] text-slate-500 block">(Decreto nº 11.567/2023)</span>
            </div>
          </div>
        </div>
      </div>

      {/* PASSO 2: O RAIO-X DAS DÍVIDAS */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <span>🔍</span> Passo 2: O Raio-X das Dívidas
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Adicione cada cobrança e selecione a categoria correta. O sistema agrupa automaticamente cada tipo de dívida para dar a recomendação exata para cada uma. Você pode adicionar quantas dívidas quiser, uma por uma, e o sistema somará e organizará todas elas automaticamente.
        </p>

        {/* Formulário de Adicionar Dívida */}
        <form onSubmit={adicionarDivida} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 mb-6 bg-slate-800/40 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Credor / Banco</label>
            <input
              type="text"
              value={novoCredor}
              onChange={(e) => setNovoCredor(e.target.value)}
              placeholder="Ex: Banco A, Loja..."
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Tipo da Dívida</label>
            <select
              value={novoTipo}
              onChange={(e) => setNovoTipo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <optgroup label="⚠️ 1. Garantia Real (Risco de Perda do Bem)">
                <option value="Financiamento Imobiliário (Garantia Real)">Financ. Imobiliário (Garantia Real)</option>
                <option value="Financiamento de Veículo (Garantia Real)">Financ. Veículo (Garantia Real)</option>
              </optgroup>
              <optgroup label="⚖️ 2. Dívidas Legais Especiais (Risco Fiscal/Prisão)">
                <option value="Impostos / IPTU / IPVA">Impostos / IPTU / IPVA</option>
                <option value="Pensão Alimentícia">Pensão Alimentícia</option>
              </optgroup>
              <optgroup label="✅ 3. Consumo (Lei 14.181/21 - Superendividamento)">
                <option value="Cartão de Crédito">Cartão de Crédito</option>
                <option value="Cheque Especial">Cheque Especial</option>
                <option value="Empréstimo Pessoal">Empréstimo Pessoal</option>
                <option value="Empréstimo Consignado">Empréstimo Consignado</option>
                <option value="Carnê de Loja">Carnê de Loja / Crediário</option>
              </optgroup>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Valor Original (R$)</label>
            <input
              type="number"
              value={novoOriginal}
              onChange={(e) => setNovoOriginal(e.target.value)}
              placeholder="Ex: 2000 ou 100000"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Valor Cobrado (R$)</label>
            <input
              type="number"
              value={novoCobrado}
              onChange={(e) => setNovoCobrado(e.target.value)}
              placeholder="Ex: 5000 ou 150000"
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Parcela Mensal (R$)</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={novaParcela}
                onChange={(e) => setNovaParcela(e.target.value)}
                placeholder="Ex: 600 ou 4500"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-2 rounded-lg flex items-center justify-center transition"
                title="Adicionar dívida"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>

        {/* Indicador de rolagem horizontal para celular com setas para esquerda e direita */}
        {dividas.length > 0 && (
          <div className="sm:hidden bg-slate-800/90 border border-slate-700 rounded-xl p-3 mb-3 flex items-center justify-between text-xs text-slate-300 shadow-md">
            <span className="font-bold text-white">Dívidas ({dividas.length}):</span>
            <div className="flex items-center gap-2 text-emerald-400 font-black animate-pulse bg-emerald-950/70 border border-emerald-500/40 px-3 py-1.5 rounded-lg">
              <span className="text-sm">⟵</span>
              <span>Arraste para os lados</span>
              <span className="text-sm">⟶</span>
            </div>
          </div>
        )}

        {/* Tabela de Dívidas com borda arredondada */}
        <div className="overflow-x-auto border border-slate-800 rounded-2xl shadow-inner">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800 text-xs uppercase text-slate-400 border-b border-slate-700">
              <tr>
                <th className="py-3 px-3">Credor</th>
                <th className="py-3 px-3">Categoria</th>
                <th className="py-3 px-3">Original</th>
                <th className="py-3 px-3">Cobrado</th>
                <th className="py-3 px-3 text-red-400">Gordura de Juros</th>
                <th className="py-3 px-3">Parcela</th>
                <th className="py-3 px-2 text-center">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {dividas.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 text-sm italic">
                    Suas dívidas cadastradas aparecerão aqui assim que você adicionar a primeira acima.
                  </td>
                </tr>
              ) : (
                dividas.map((d) => {
                  const gordura = Math.max(0, d.valorCobrado - d.valorOriginal);
                  const isGarantia = d.tipo.includes('Garantia Real');
                  const isLegal = d.tipo.includes('Impostos') || d.tipo.includes('Pensão');

                  let badgeColor = 'bg-slate-800 text-slate-300';
                  if (isGarantia) badgeColor = 'bg-amber-950 text-amber-300 border border-amber-800/60';
                  if (isLegal) badgeColor = 'bg-purple-950 text-purple-300 border border-purple-800/60';

                  return (
                    <tr key={d.id} className="hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-semibold text-white">{d.credor}</td>
                      <td className="py-3 px-3 text-xs">
                        <span className={`px-2 py-0.5 rounded-full ${badgeColor}`}>
                          {d.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-3">R$ {d.valorOriginal.toFixed(2)}</td>
                      <td className="py-3 px-3 text-slate-300">R$ {d.valorCobrado.toFixed(2)}</td>
                      <td className="py-3 px-3 font-bold text-red-400">
                        {gordura > 0 ? `+ R$ ${gordura.toFixed(2)}` : 'R$ 0,00'}
                      </td>
                      <td className="py-3 px-3 font-bold text-white">R$ {d.parcelaMensal.toFixed(2)}</td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => removerDivida(d.id)}
                          className="text-slate-500 hover:text-red-400 transition"
                          title="Remover dívida"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Resumo Geral com Subtotais por Categoria */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Total Parcelas Geral</span>
            <span className="text-xl font-bold text-white">R$ {totalParcelasGeral.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">({comprometimentoGeral.toFixed(1)}% da renda)</span>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Garantia Real (Casa/Carro)</span>
            <span className="text-xl font-bold text-amber-400">R$ {totalParcelasGarantia.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{dividasGarantiaReal.length} dívida(s)</span>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Dívidas Consumo (Lei 14.181)</span>
            <span className="text-xl font-bold text-blue-400">R$ {totalParcelasConsumo.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{dividasConsumo.length} dívida(s)</span>
          </div>

          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Legais (Impostos/Pensão)</span>
            <span className="text-xl font-bold text-purple-400">R$ {totalParcelasLegais.toFixed(2)}</span>
            <span className="text-[11px] text-slate-400 block mt-0.5">{dividasLegais.length} dívida(s)</span>
          </div>
        </div>
      </div>

      {/* PASSO 3: DIAGNÓSTICO JURÍDICO MODULAR (SUGESTÃO PARA CADA TIPO DE DÍVIDA) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span>⚖️</span> Passo 3: Recomendações Estruturadas por Categoria de Dívida
          </h3>
          <p className="text-sm text-slate-400">
            Você possui <strong>{totalTiposAtivos} tipo(s) de dívida</strong> cadastrado(s). Cada categoria possui regras jurídicas diferentes. Veja a orientação e a sugestão de ação para cada uma:
          </p>
        </div>

        {/* HIERARQUIA DE PRIORIDADES (SE HOUVER MULTICATEGORIAS) */}
        {totalTiposAtivos > 1 && (
          <div className="bg-slate-950/80 border border-slate-700 rounded-2xl p-5 space-y-3">
            <h4 className="font-black text-white text-sm uppercase tracking-wide flex items-center gap-2">
              <span>🎯</span> Ordem Estratégica de Priorização de Pagamento:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="bg-purple-950/40 border border-purple-800/50 p-3 rounded-xl">
                <span className="font-black text-purple-300 block mb-1">🥇 1º Lugar: Pensão / Custos Vitais</span>
                <p className="text-slate-300">Risco de prisão civil e subsistência básica familiar. Nunca deixe de priorizar.</p>
              </div>
              <div className="bg-amber-950/40 border border-amber-800/50 p-3 rounded-xl">
                <span className="font-black text-amber-300 block mb-1">🥈 2º Lugar: Financiamentos e IPTU/IPVA</span>
                <p className="text-slate-300">Garantia real com risco de busca e apreensão do veículo ou leilão extrajudicial do imóvel.</p>
              </div>
              <div className="bg-blue-950/40 border border-blue-800/50 p-3 rounded-xl">
                <span className="font-black text-blue-300 block mb-1">🥉 3º Lugar: Dívidas de Consumo (Bancos)</span>
                <p className="text-slate-300">Cartão, cheque especial e empréstimos sem garantia. Entram na Lei 14.181 e não penhoram o bem de família.</p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BLOCO 1: DÍVIDAS COM GARANTIA REAL (VEÍCULO E IMÓVEL) */}
        {/* ========================================================================= */}
        {dividasGarantiaReal.length > 0 && (
          <div className="bg-amber-950/20 border-2 border-amber-500/60 rounded-3xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block">
                  Categoria 1 • Bens Financiados
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">
                  Financiamento de Imóvel ou Veículo com Garantia Real ({nomesGarantia})
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  Parcelas somadas: <strong>R$ {totalParcelasGarantia.toFixed(2)}/mês</strong> | Saldo cobrado: <strong>R$ {totalCobradoGarantia.toFixed(2)}</strong>
                </p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 text-xs text-slate-300 space-y-2.5 leading-relaxed">
              <p className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" /> Alerta de Risco Iminente de Perda do Patrimônio:
              </p>
              <p>
                • <strong>A Lei do Superendividamento (14.181/21) NÃO protege estes bens:</strong> Financiamentos com alienação fiduciária não entram no plano de recuperação judicial da lei. O credor tem o direito legal de leilão do imóvel ou busca e apreensão do veículo em prazos curtos após o atraso.
              </p>
              <p>
                • <strong>Prioridade de Pagamento:</strong> Se houver qualquer margem no orçamento, <strong>priorize o pagamento das parcelas do bem financiado antes de pagar cartões de crédito e empréstimos sem garantia</strong>, pois o seu teto e o seu transporte estão em risco direto.
              </p>
              <p>
                • <strong>Estratégia Prática se for Impossível Pagar (Venda Amigável no Mercado):</strong> Se as parcelas não cabem mais no salário, a recomendação mais eficiente de especialistas é avaliar a <strong>venda do imóvel ou veículo no mercado tradicional</strong> enquanto o contrato está regular. Ao vender o bem:
                <br />1. Quita-se a dívida antecipadamente com <strong>abatimento integral de todos os juros futuros (Artigo 52, § 2º do Código de Defesa do Consumidor)</strong>.
                <br />2. Você resgata a sobra da entrada e das parcelas já pagas, em vez de deixar o banco levar o bem a leilão por 50% do valor.
              </p>
            </div>

            {/* Declaração de Resguardo Jurídico - Garantia Real */}
            <div className="space-y-3 pt-2">
              <div className="bg-red-950/40 border-2 border-red-500/60 rounded-2xl p-4 text-xs text-red-200 space-y-2 shadow-inner">
                <div className="flex items-center gap-2 font-black text-red-300 text-sm uppercase tracking-wide">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  Declaração de Resguardo Jurídico e Isenção de Responsabilidade
                </div>
                <p className="leading-relaxed">
                  <strong>AVISO OBRIGATÓRIO:</strong> O modelo de solicitação abaixo possui <strong>caráter estritamente pedagógico e informativo</strong>. Ele NÃO constitui parecer jurídico, consultoria financeira nem garantia de aceitação por parte da instituição financeira.
                </p>
                <p className="leading-relaxed font-medium text-white bg-red-900/40 p-2.5 rounded-xl border border-red-500/30">
                  ⚠️ <strong>NÃO FAÇA NADA CEGAMENTE:</strong> Em contratos com garantia real (imóveis e veículos), os prazos legais de cartório e mandados de busca e apreensão são extremamente rápidos. <strong>Busque ajuda profissional imediata</strong> com um advogado especialista em direito imobiliário/bancário ou com a Defensoria Pública antes de tomar qualquer decisão definitiva, deixar de pagar parcelas ou encaminhar este documento. O uso deste modelo é de exclusiva e inteira responsabilidade do usuário.
                </p>
              </div>

              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-inner">
                <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {textoGarantiaReal}
                </p>
              </div>

              <button
                onClick={handleCopiarGarantia}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  copiadoGarantia
                    ? 'bg-amber-600 text-white'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-black'
                }`}
              >
                {copiadoGarantia ? (
                  <>
                    <Check className="w-4 h-4" /> SUGESTÃO DE GARANTIA REAL COPIADA!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> COPIAR SUGESTÃO PARA GARANTIA REAL
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BLOCO 2: DÍVIDAS DE CONSUMO (LEI 14.181/2021) */}
        {/* ========================================================================= */}
        {dividasConsumo.length > 0 && (
          <div className="bg-blue-950/20 border-2 border-blue-500/60 rounded-3xl p-6 space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-blue-400 block">
                  Categoria 2 • Dívidas de Consumo
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">
                  Cartões de Crédito, Cheque Especial e Empréstimos ({nomesConsumo})
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  Parcelas somadas: <strong>R$ {totalParcelasConsumo.toFixed(2)}/mês</strong> | Comprometimento: <strong>{comprometimentoConsumo.toFixed(1)}% da renda</strong>
                </p>
              </div>
            </div>

            {/* Diagnóstico Específico da Lei 14.181 */}
            {cenarioConsumo === 'SUPER_CRITICO' && (
              <div className="bg-red-950/50 border border-red-500/50 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
                <p className="font-bold text-red-300 text-sm flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-red-400" /> Violação do Mínimo Existencial (Decreto nº 11.567/2023):
                </p>
                <p>
                  Após deduzir as parcelas de consumo, sobram apenas <strong>R$ {sobraAposConsumo.toFixed(2)}</strong> na sua conta (abaixo do piso legal inegociável de R$ 600,00). Os bancos estão asfixiando sua subsistência básica.
                </p>
                <p className="text-slate-400">
                  <strong>O que os juízes costumam decidir:</strong> Em processos de superendividamento, juízes determinam a suspensão liminar de descontos e convocam audiência global para plano em até 5 anos (60 meses) com isenção compulsória de juros moratórios.
                </p>
              </div>
            )}

            {cenarioConsumo === 'SUPER_FUNCIONAL' && (
              <div className="bg-orange-950/40 border border-orange-500/50 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
                <p className="font-bold text-orange-300 text-sm flex items-center gap-1.5">
                  <AlertOctagon className="w-4 h-4 text-orange-400" /> Superendividamento por Asfixia (Margem {comprometimentoConsumo.toFixed(1)}%):
                </p>
                <p>
                  As parcelas de consumo ultrapassam o teto seguro de 35% e, somadas aos gastos essenciais, deixam o mês no déficit. O Art. 54-A do CDC reconhece a impossibilidade manifesta de pagamento.
                </p>
                <p className="text-slate-400">
                  <strong>O que os juízes costumam decidir:</strong> Magistrados limitam as deduções a 30%-35% e determinam a repactuação parcelada sem comprometer a moradia familiar.
                </p>
              </div>
            )}

            {cenarioConsumo === 'REGULAR' && (
              <div className="bg-emerald-950/40 border border-emerald-500/50 rounded-2xl p-4 text-xs text-slate-300 space-y-2">
                <p className="font-bold text-emerald-300 text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Orçamento de Consumo Dentro da Margem Segura:
                </p>
                <p>
                  As parcelas de consumo consomem {comprometimentoConsumo.toFixed(1)}% da renda (dentro dos 35%) e deixam mais de R$ 600 livres. Judicialmente não há base para forçar o plano compulsório, sendo recomendada a quitação voluntária ou Tática do Silêncio para negociar desconto à vista.
                </p>
              </div>
            )}

            {/* Declaração de Resguardo Jurídico - Dívidas de Consumo */}
            <div className="space-y-3 pt-2">
              <div className="bg-red-950/40 border-2 border-red-500/60 rounded-2xl p-4 text-xs text-red-200 space-y-2 shadow-inner">
                <div className="flex items-center gap-2 font-black text-red-300 text-sm uppercase tracking-wide">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  Declaração de Resguardo Jurídico e Isenção de Responsabilidade
                </div>
                <p className="leading-relaxed">
                  <strong>AVISO OBRIGATÓRIO:</strong> O modelo de mensagem abaixo possui <strong>finalidade estritamente pedagógica e informativa</strong>. Ele NÃO substitui uma petição judicial, NÃO constitui consulta jurídica formal e NÃO garante que o credor concederá descontos ou suspensão de cobranças.
                </p>
                <p className="leading-relaxed font-medium text-white bg-red-900/40 p-2.5 rounded-xl border border-red-500/30">
                  ⚠️ <strong>NÃO FAÇA NADA CEGAMENTE:</strong> Cada contrato bancário possui cláusulas específicas e encargos próprios. <strong>Consulte um profissional habilitado</strong> (advogado especialista em direito do consumidor, Defensoria Pública ou Procon) antes de interromper pagamentos, recusar propostas de negociação ou enviar este texto. O uso deste modelo é de inteira responsabilidade do usuário.
                </p>
              </div>

              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-inner">
                <p className="text-slate-200 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {textoConsumo}
                </p>
              </div>

              <button
                onClick={handleCopiarConsumo}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg ${
                  copiadoConsumo
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 hover:bg-blue-400 text-slate-950 font-black'
                }`}
              >
                {copiadoConsumo ? (
                  <>
                    <Check className="w-4 h-4" /> SUGESTÃO DE CONSUMO COPIADA!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> COPIAR SUGESTÃO PARA DÍVIDAS DE CONSUMO
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BLOCO 3: DÍVIDAS LEGAIS ESPECIAIS (IMPOSTOS E PENSÃO) */}
        {/* ========================================================================= */}
        {dividasLegais.length > 0 && (
          <div className="bg-purple-950/20 border-2 border-purple-500/60 rounded-3xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 block">
                  Categoria 3 • Obrigações Legais Especiais
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">
                  Impostos (IPTU, IPVA) e Pensão Alimentícia ({nomesLegais})
                </h4>
                <p className="text-slate-300 text-xs mt-1">
                  Cobranças somadas: <strong>R$ {totalCobradoLegais.toFixed(2)}</strong> | Parcelas: <strong>R$ {totalParcelasLegais.toFixed(2)}/mês</strong>
                </p>
              </div>
            </div>

            <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-5 text-xs text-slate-300 space-y-3 leading-relaxed">
              <p className="font-bold text-purple-300 text-sm flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-purple-400" /> Atenção Máxima: Riscos Jurídicos Especiais
              </p>
              <p>
                • <strong>Pensão Alimentícia (Risco de Prisão Civil):</strong> A dívida de pensão alimentícia é a mais grave do ordenamento jurídico brasileiro. <strong>Atrasos podem levar à prisão civil em regime fechado (de 1 a 3 meses) e penhora de conta bancária.</strong> Qualquer renegociação do valor NÃO pode ser feita por mensagem de WhatsApp; ela deve ser formalizada judicialmente perante o juiz da Vara de Família através de uma <em>Ação Revisional de Alimentos</em>.
              </p>
              <p>
                • <strong>Impostos de Veículos (IPVA) e Imóveis (IPTU):</strong> Dívidas tributárias com o Estado ou Município não entram no superendividamento. A falta de pagamento do IPVA impede o licenciamento e pode acarretar a <strong>apreensão e leilão do veículo</strong>. A falta de pagamento de IPTU pode levar à execução fiscal e até à <strong>penhora e leilão do próprio imóvel</strong>, sendo uma das poucas exceções em que mesmo o imóvel de moradia própria ("bem de família") pode ser leiloado.
              </p>
              <p className="p-3 bg-purple-950/60 border border-purple-700/50 rounded-xl font-semibold text-purple-200">
                👉 <strong>Orientação Obrigatória:</strong> Procure imediatamente um <strong>advogado especialista, a Defensoria Pública ou um contador</strong> para verificar a sua situação fiscal e familiar. Para impostos, verifique se o seu município ou estado possui programas oficiais de parcelamento com anistia de juros (como PPI ou Refis).
              </p>
            </div>
          </div>
        )}

      </div>

      {/* AVISO LEGAL E DIRETRIZ DE RESPONSABILIDADE CONSOLIDADA */}
      <div className="pt-2">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 text-slate-400 text-xs leading-relaxed space-y-2 shadow-lg">
          <div className="flex items-center gap-2 font-bold text-slate-300 text-sm">
            <Scale className="w-4 h-4 text-slate-400 flex-shrink-0" />
            ⚖️ Aviso Legal e Diretriz de Responsabilidade
          </div>
          <p>
            Esta ferramenta fornece simulações matemáticas e modelos informativos baseados em legislação pública (Código de Defesa do Consumidor, Lei nº 14.181/2021 e Decreto nº 11.567/2023). Este aplicativo possui finalidade <strong>estritamente pedagógica e informativa</strong> e não substitui a consulta formal com um advogado especialista, defensor público ou com os órgãos oficiais de proteção ao consumidor (Procon e Poder Judiciário). Não tome decisões precipitadas nem deixe de honrar obrigações sem o parecer técnico e individualizado de um profissional de sua confiança.
          </p>
        </div>
      </div>
    </div>
  );
}
