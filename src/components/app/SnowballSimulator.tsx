import React, { useState } from 'react';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function SnowballSimulator() {
  const [debt, setDebt] = useState<number>(1000);
  const [rate, setRate] = useState<number>(15);
  const [months, setMonths] = useState<number>(6);

  const calculateCompoundInterest = () => {
    return debt * Math.pow(1 + rate / 100, months);
  };

  const finalAmount = calculateCompoundInterest();
  const interestOnly = finalAmount - debt;

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 text-white max-w-2xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-red-500/20 p-3 rounded-lg">
          <TrendingUp className="text-red-500 w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold">Simulador "Bola de Neve"</h2>
      </div>

      <p className="text-slate-400 mb-8">
        Descubra como os bancos multiplicam sua dívida usando os juros compostos.
      </p>

      <div className="space-y-6">
        <div>
          <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
            <span>Dívida Inicial (Cartão/Cheque)</span>
            <span className="text-blue-400">R$ {debt.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={debt}
            onChange={(e) => setDebt(Number(e.target.value))}
            className="w-full accent-blue-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
            <span>Taxa de Juros ao Mês (%)</span>
            <span className="text-red-400">{rate}%</span>
          </label>
          <input
            type="range"
            min="1"
            max="25"
            step="1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-red-500"
          />
        </div>

        <div>
          <label className="flex justify-between text-sm font-medium text-slate-300 mb-2">
            <span>Tempo arrastando a dívida (Meses)</span>
            <span className="text-yellow-400">{months} meses</span>
          </label>
          <input
            type="range"
            min="1"
            max="36"
            step="1"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full accent-yellow-500"
          />
        </div>
      </div>

      <div className="mt-10 bg-slate-800 border-l-4 border-red-500 p-6 rounded-r-xl">
        <p className="text-sm text-slate-400 uppercase tracking-widest font-bold mb-2">Dívida Final Projetada</p>
        <p className="text-4xl md:text-5xl font-black text-red-500 mb-4">
          R$ {finalAmount.toFixed(2)}
        </p>
        
        <div className="flex items-start gap-3 text-sm text-slate-300">
          <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
          <p>
            O banco vai tentar te cobrar <strong className="text-white">R$ {interestOnly.toFixed(2)} só de juros</strong>.
            Pela Lei do Superendividamento, você vai aprender a arrancar essa gordura e pagar o valor justo.
          </p>
        </div>
      </div>
    </div>
  );
}
