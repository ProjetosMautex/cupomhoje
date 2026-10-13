import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trophy, ArrowRight, BookOpen, Scale, Sparkles } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

const MISSOES: Mission[] = [
  {
    id: 'missao-1',
    title: 'Missão 1: Perdoe-se e Encare a Realidade',
    subtitle: 'Acender a luz do quarto escuro (Capítulo 1 do E-book)',
    description:
      'Respire fundo e perdoe-se. O medo e o constrangimento são reações humanas normais diante de cobranças. Tome a decisão consciente de colocar tudo no papel para enxergar o tamanho real da situação sem desespero.',
    linkText: 'Ler Capítulo 1 no E-book',
    linkHref: '/app/leitura#capitulo-1',
  },
  {
    id: 'missao-2',
    title: 'Missão 2: Consultar a Verdade do CPF nos Órgãos Oficiais',
    subtitle: 'Sem pagar nada e sem intermediários duvidosos',
    description:
      'Baixe o aplicativo oficial da Serasa ou acesse os canais do Governo Federal. Localize cada cobrança pendente e anote duas informações cruciais: o valor original contratado e o valor cobrado com juros.',
    linkText: 'Ver dicas da Serasa no E-book',
    linkHref: '/app/leitura#capitulo-1',
  },
  {
    id: 'missao-3',
    title: 'Missão 3: Mapear seus Custos de Sobrevivência (Prioridade 1)',
    subtitle: 'Alimentação, Moradia, Luz, Água e Saúde',
    description:
      'Calcule quanto você e sua família realmente precisam todo mês para viver com dignidade. Lembre-se da regra de ouro: o estômago dos seus filhos e o teto da sua casa vêm sempre antes de qualquer juro de cartão ou banco.',
  },
  {
    id: 'missao-4',
    title: 'Missão 4: Separar suas Dívidas na Pirâmide de Prioridades',
    subtitle: 'Identificar Dívidas com Garantia Real vs Dívidas de Consumo',
    description:
      'Diferencie financiamentos com garantia (carro ou imóvel com alienação fiduciária, que exigem prioridade para não perder o bem) das dívidas sem garantia (como cartão de crédito e cheque especial, onde os bancos cobram os maiores juros).',
  },
  {
    id: 'missao-5',
    title: 'Missão 5: Executar o Raio-X e Checar o Mínimo Existencial',
    subtitle: 'Simulação matemática de proteção legal',
    description:
      'Lance sua renda líquida e suas despesas básicas na Calculadora do Raio-X (/app/raiox). O sistema compara sua sobra mensal com o piso de R$ 600,00 da Lei 14.181/2021 (Decreto 11.567/2023) para você saber o seu diagnóstico exato.',
    linkText: 'Fazer Raio-X & Blindagem',
    linkHref: '/app/raiox',
  },
  {
    id: 'missao-6',
    title: 'Missão 6: Manter a Serenidade e Não Cair no Pânico Telefônico',
    subtitle: 'Compreender seus direitos como consumidor',
    description:
      'Empresas de cobrança não têm poder de bloquear seus bens por mensagem de texto ou WhatsApp. Mantenha a calma, não faça acordos precipitados por impulso e lembre-se de que a lei protege a sua subsistência digna.',
    linkText: 'Ver como os bancos mentem no E-book',
    linkHref: '/app/leitura#capitulo-2',
  },
];

export default function MissionChecklist() {
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('protocolo_missoes');
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleMission = (id: string) => {
    const updated = completed.includes(id)
      ? completed.filter((item) => item !== id)
      : [...completed, id];

    setCompleted(updated);
    try {
      localStorage.setItem('protocolo_missoes', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const percent = Math.round((completed.length / MISSOES.length) * 100);

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12">
      
      {/* Barra de Progresso */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="font-bold text-white text-base">Progresso das Missões Pessoais</span>
          </div>
          <span className="text-emerald-400 font-black text-lg">{percent}% Concluído</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-3.5 overflow-hidden">
          <div
            className="bg-emerald-500 h-3.5 rounded-full transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-3">
          {completed.length} de {MISSOES.length} missões concluídas. Seu progresso fica salvo na memória deste aparelho.
        </p>
      </div>

      {/* NOTA EDITORIAL E DIRETRIZ DE SEGURANÇA */}
      <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/20 border-l-4 border-amber-500 rounded-r-2xl border-y border-r border-amber-500/30 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5 border border-amber-500/30">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 block">
              ⚖️ Diretriz de Segurança do Checklist
            </span>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              <strong className="text-white">Atenção preventiva:</strong> Todas as missões desta lista focam <strong>estritamente na sua organização pessoal, mentalidade e levantamento seguro de informações</strong>. Nenhuma missão exige o envio de notificações de cobrança ou acordos sensíveis. Para qualquer ato de repactuação formal ou questionamento contratual, consulte sempre um advogado especializado ou a Defensoria Pública.
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Missões */}
      <div className="space-y-4">
        {MISSOES.map((m, index) => {
          const isDone = completed.includes(m.id);
          return (
            <div
              key={m.id}
              onClick={() => toggleMission(m.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer shadow-lg flex items-start gap-4 ${
                isDone
                  ? 'bg-emerald-950/20 border-emerald-500/50 text-white'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <button
                type="button"
                className="mt-1 flex-shrink-0 text-emerald-400"
                aria-label={`Marcar ${m.title}`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-400 fill-emerald-950" />
                ) : (
                  <Circle className="w-7 h-7 text-slate-600" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Passo {index + 1}
                  </span>
                  <h4 className={`font-bold text-base sm:text-lg ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {m.title}
                  </h4>
                </div>
                <p className="text-xs font-semibold text-emerald-400/90 mb-2">{m.subtitle}</p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-3">{m.description}</p>

                {m.linkText && m.linkHref && (
                  <a
                    href={m.linkHref}
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 hover:underline"
                  >
                    <span>{m.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Box de Encerramento e Próximos Passos */}
      {percent === 100 && (
        <div className="p-6 bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/40 rounded-3xl text-center space-y-3 shadow-2xl">
          <div className="text-3xl">🎉</div>
          <h4 className="text-xl font-black text-white">Parabéns! Todas as etapas concluídas!</h4>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Você organizou seu orçamento, blindou sua mente e sabe exatamente a verdade das suas dívidas. Agora você tem clareza para planejar seus próximos passos com dignidade e segurança.
          </p>
          <div className="pt-2">
            <a
              href="/app"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition shadow-lg"
            >
              <span>Voltar ao Painel de Ferramentas</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}
