import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SnowballSimulator() {
  const [debt, setDebt] = useState<number>(3000);
  const [rate, setRate] = useState<number>(10);
  const [months, setMonths] = useState<number>(9);

  const calculateCompoundInterest = () => {
    return debt * Math.pow(1 + rate / 100, months);
  };

  const finalAmount = calculateCompoundInterest();
  const interestOnly = finalAmount - debt;

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 md:p-8 text-white max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-red-500/20 p-3 rounded-2xl border border-red-500/30">
          <TrendingUp className="text-red-400 w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-red-400 block">Efeito Multiplicador</span>
          <h2 className="text-2xl font-black text-white">Simulador "Bola de Neve"</h2>
        </div>
      </div>

      <p className="text-slate-400 mb-8 text-sm leading-relaxed">
        Descubra como os bancos multiplicam sua dívida usando os juros compostos.
      </p>

      <div className="space-y-6">
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <label className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
            <span>Dívida Inicial (Cartão/Cheque)</span>
            <span className="text-blue-400 font-bold">R$ {debt.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="100"
            max="30000"
            step="100"
            value={debt}
            onChange={(e) => setDebt(Number(e.target.value))}
            className="w-full accent-blue-500 cursor-pointer"
          />
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <label className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
            <span>Taxa de Juros ao Mês (%)</span>
            <span className="text-red-400 font-bold">{rate}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-red-500 cursor-pointer"
          />
        </div>

        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <label className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
            <span>Tempo arrastando a dívida (Meses)</span>
            <span className="text-amber-400 font-bold">{months} meses</span>
          </label>
          <input
            type="range"
            min="1"
            max="36"
            step="1"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Caixa do Resultado da Projeção */}
      <div className="mt-8 bg-slate-950 border-l-4 border-red-500 p-6 rounded-r-2xl border-y border-r border-slate-800 shadow-inner">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-extrabold mb-1">
          Dívida Final Projetada
        </p>
        <p className="text-3xl md:text-5xl font-black text-red-500 mb-4 tracking-tight">
          R$ {finalAmount.toFixed(2)}
        </p>
        
        <div className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed bg-red-950/20 p-3.5 rounded-xl border border-red-900/40">
          <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            O banco vai tentar te cobrar <strong className="text-white font-extrabold">R$ {interestOnly.toFixed(2)} só de juros</strong>.
            Pela Lei do Superendividamento, você vai aprender a arrancar essa gordura e pagar o valor justo.
          </p>
        </div>
      </div>

      {/* Bloco de Ação: Encaminhamento para o Raio-X e Calculadora de Blindagem */}
      <div className="mt-8 p-6 bg-gradient-to-br from-blue-950/60 via-slate-900 to-emerald-950/30 border border-blue-500/40 rounded-2xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <h3 className="text-lg font-bold text-white">
            Hora de Tirar a Gordura: Descubra o Valor Real
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
          Não pague juros abusivos de olhos fechados. Lance suas dívidas reais no nosso <strong>Raio-X e Calculadora de Blindagem</strong> para calcular seu Mínimo Existencial (Lei 14.181/2021), separar dívidas de consumo das com garantia real e gerar seu roteiro de negociação exato.
        </p>
        <a
          href="/app/raiox"
          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-black rounded-xl shadow-lg shadow-blue-950 transition active:scale-[0.99] text-sm text-center"
        >
          <span>Ir para o Raio-X & Calculadora de Blindagem</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Aviso Legal e Isenção de Responsabilidade no Final do Simulador */}
      <div className="mt-8 p-4 bg-slate-950 border border-slate-800/90 rounded-2xl text-slate-400 text-xs leading-relaxed">
        <p className="font-bold text-slate-300 mb-1 flex items-center gap-1.5">
          <span>⚖️</span> <span>Aviso Legal & Isenção de Responsabilidade:</span>
        </p>
        <p>
          Esta simulação matemática possui fins estritamente pedagógicos e demonstrativos da fórmula de juros compostos. Os resultados práticos de exclusão de juros, concessão de prazos de até 5 anos ou repactuação dependem da análise contratual, da comprovação legal do superendividamento nos termos da Lei nº 14.181/2021 e da celebração de acordo com os credores ou homologação judicial. Este simulador não constitui promessa de resultado e não substitui a orientação técnica individualizada de um advogado especializado, da Defensoria Pública ou do Procon.
        </p>
      </div>
    </div>
  );
}
