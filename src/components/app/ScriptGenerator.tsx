import React, { useState } from 'react';
import { MessageSquare, Copy, Check, ShieldAlert } from 'lucide-react';

export default function ScriptGenerator() {
  const [banco, setBanco] = useState('Itaú');
  const [tipoDivida, setTipoDivida] = useState('Cartão de Crédito');
  const [etapa, setEtapa] = useState('fase1');
  const [valorParcela, setValorParcela] = useState('500');
  const [valorJusto, setValorJusto] = useState('800');
  const [copiado, setCopiado] = useState(false);

  // Geração da mensagem conforme a estratégia do protocolo
  const gerarMensagem = () => {
    if (etapa === 'fase1') {
      return `Olá, estou entrando em contato a respeito da pendência referente ao ${tipoDivida} no ${banco}. Gostaria de informar que tenho total interesse em quitar minha dívida pelo valor justo, porém qualquer parcela abusiva ultrapassa minha capacidade financeira baseado na Lei do Superendividamento (Lei 14.181/2021). Não aceitarei condições que comprometam o meu Mínimo Existencial e o sustento da minha família. Qual é a melhor proposta à vista com desconto máximo para liquidação imediata?`;
    }

    if (etapa === 'fase2') {
      return `Agradeço o retorno do ${banco}, porém não tenho como aceitar essa proposta. Uma parcela de R$ ${valorParcela} fere frontalmente o meu Mínimo Existencial protegido pela Lei do Superendividamento. Só fecharei um acordo quando a proposta couber com folga no meu orçamento mensal. Para liquidação em parcela única à vista, consigo quitar se chegarmos no valor de R$ ${valorJusto}. Aguardo retorno com a reavaliação da assessoria.`;
    }

    if (etapa === 'consumidor_gov') {
      return `À instituição ${banco}: Venho por meio deste canal solicitar formalmente o envio imediato da planilha com o DED (Demonstrativo de Evolução da Dívida) referente ao meu contrato de ${tipoDivida}, detalhando o valor original contratado, taxas de juros remuneratórios aplicadas mês a mês, encargos e multas. Informo que necessito do documento detalhado para fins de adequação à Lei 14.181/2021 (Lei do Superendividamento) e verificação do Mínimo Existencial.`;
    }

    return '';
  };

  const textoFinal = gerarMensagem();

  const handleCopiar = () => {
    navigator.clipboard.writeText(textoFinal);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  };

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 text-white max-w-2xl mx-auto shadow-2xl mt-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/20 p-3 rounded-lg">
          <MessageSquare className="text-emerald-400 w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Gerador de Roteiro Blindado</h2>
          <p className="text-slate-400 text-sm">Copie e cole a mensagem exata no WhatsApp ou chat do banco.</p>
        </div>
      </div>

      {/* Formulário de Seleção */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
            1. Selecione a Situação
          </label>
          <select
            value={etapa}
            onChange={(e) => setEtapa(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="fase1">Fase 1: O Roteiro de Ouro (Primeira Resposta)</option>
            <option value="fase2">Fase 2: Recusar Proposta Abusiva (Regra de Ouro)</option>
            <option value="consumidor_gov">Arma Secreta: Pedido de DED (Consumidor.gov)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
            2. Nome do Banco / Credor
          </label>
          <input
            type="text"
            value={banco}
            onChange={(e) => setBanco(e.target.value)}
            placeholder="Ex: Itaú, Bradesco, Nubank..."
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
            3. Tipo de Pendência
          </label>
          <select
            value={tipoDivida}
            onChange={(e) => setTipoDivida(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
          >
            <option value="Cartão de Crédito">Cartão de Crédito</option>
            <option value="Cheque Especial">Cheque Especial</option>
            <option value="Empréstimo Pessoal">Empréstimo Pessoal</option>
            <option value="Financiamento">Financiamento</option>
          </select>
        </div>

        {etapa === 'fase2' && (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                Parcela Abusiva
              </label>
              <input
                type="text"
                value={valorParcela}
                onChange={(e) => setValorParcela(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="500"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 font-bold mb-2">
                Sua Oferta À Vista
              </label>
              <input
                type="text"
                value={valorJusto}
                onChange={(e) => setValorJusto(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                placeholder="800"
              />
            </div>
          </div>
        )}
      </div>

      {/* Caixa de Texto Gerada */}
      <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-5 mb-4">
        <p className="text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {textoFinal}
        </p>
      </div>

      {/* Botão Copiar */}
      <button
        onClick={handleCopiar}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold transition-all shadow-lg ${
          copiado
            ? 'bg-emerald-600 text-white'
            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black'
        }`}
      >
        {copiado ? (
          <>
            <Check className="w-5 h-5" />
            MENSAGEM COPIADA COM SUCESSO!
          </>
        ) : (
          <>
            <Copy className="w-5 h-5" />
            COPIAR ROTEIRO PRONTO
          </>
        )}
      </button>

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <ShieldAlert className="w-4 h-4 text-emerald-400 flex-shrink-0" />
        <span>Blindado pela Lei 14.181/2021. Nunca negocie por ligação gravada sem usar este roteiro por escrito.</span>
      </div>
    </div>
  );
}
