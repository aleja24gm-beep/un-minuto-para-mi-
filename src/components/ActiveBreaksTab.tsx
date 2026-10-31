import React, { useState } from 'react';
import { ALL_EXERCISES } from '../data/exercises';
import { ExerciseStep } from '../types';
import { Activity, Clock, Play, ArrowRight, ShieldCheck, HeartPulse } from 'lucide-react';

interface ActiveBreaksTabProps {
  onStartSingleExercise: (exercise: ExerciseStep) => void;
}

export const ActiveBreaksTab: React.FC<ActiveBreaksTabProps> = ({ onStartSingleExercise }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'piernas' | 'espalda' | 'cuello' | 'manos'>('all');

  const activeExercises = ALL_EXERCISES.filter(e => e.category === 'pausa_activa');

  const filtered = activeExercises.filter(ex => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'piernas') return ex.id.includes('gemelos');
    if (selectedFilter === 'espalda') return ex.id.includes('lumbar') || ex.id.includes('torsion');
    if (selectedFilter === 'cuello') return ex.id.includes('chin') || ex.id.includes('pectoral');
    if (selectedFilter === 'manos') return ex.id.includes('munecas');
    return true;
  });

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Activity className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Técnicas de Pausas Activas Hospitalarias</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Diseñadas según los estándares de Salud Ocupacional para el personal sanitario. Previenen trastornos musculoesqueléticos comunes: lumbalgias por movilización, fascitis plantar por bipedestación estática y sobrecarga de túnel carpiano.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit">
        <button
          onClick={() => setSelectedFilter('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] ${
            selectedFilter === 'all'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          Todas las Técnicas ({activeExercises.length})
        </button>
        <button
          onClick={() => setSelectedFilter('piernas')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] ${
            selectedFilter === 'piernas'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          Piernas y Retorno Venoso
        </button>
        <button
          onClick={() => setSelectedFilter('espalda')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] ${
            selectedFilter === 'espalda'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          Espalda y Lumbares
        </button>
        <button
          onClick={() => setSelectedFilter('cuello')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] ${
            selectedFilter === 'cuello'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          Cuello y Trapecios
        </button>
        <button
          onClick={() => setSelectedFilter('manos')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all whitespace-nowrap min-h-[40px] ${
            selectedFilter === 'manos'
              ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          Muñecas y Dedos
        </button>
      </div>

      {/* Grid of exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((ex) => (
          <div
            key={ex.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm hover:border-teal-400 dark:hover:border-teal-500 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {ex.anatomicalTarget}
                </span>
                <span className="flex items-center gap-1 text-xs font-mono font-semibold text-slate-500 dark:text-slate-400 num-tabular">
                  <Clock className="w-3.5 h-3.5" />
                  {ex.durationSeconds}s
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {ex.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                🏥 {ex.hospitalContext}
              </p>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Pasos de ejecución:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  {ex.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-3.5 h-3.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom action button */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {ex.tips}
              </span>
              <button
                onClick={() => onStartSingleExercise(ex)}
                className="py-2.5 px-4 bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap min-h-[40px]"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Iniciar ({ex.durationSeconds}s)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ergonomic post-shift note */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 flex items-start gap-3">
        <HeartPulse className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed">
          <strong className="text-white block mb-0.5">Principio de la Micro-Pausa:</strong>
          Realizar una pausa activa de 45 a 60 segundos cada 2 o 3 horas es mucho más efectivo para prevenir lesiones por sobreuso que un descanso largo de 15 minutos al final del turno cuando la musculatura ya está contracturada.
        </div>
      </div>

    </div>
  );
};
