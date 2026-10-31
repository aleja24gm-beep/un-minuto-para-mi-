import React from 'react';
import { WellnessPrescription, ExerciseStep } from '../types';
import { 
  Play, 
  Clock, 
  HeartPulse, 
  Sparkles, 
  Eye, 
  Wind, 
  ShieldCheck, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

interface ResultsDisplayProps {
  prescription: WellnessPrescription;
  onStartSession: () => void;
  onStartSingleExercise: (exercise: ExerciseStep) => void;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  prescription,
  onStartSession,
  onStartSingleExercise,
}) => {
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'visual':
        return <Eye className="w-4 h-4 text-sky-600 dark:text-sky-400" />;
      case 'relajacion':
        return <Wind className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      default:
        return <HeartPulse className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
    }
  };

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'visual': return 'Descanso Visual';
      case 'relajacion': return 'Relajación Neuro-Vagal';
      default: return 'Pausa Activa Biomecánica';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* RESULTADO DESTACADO PRINCIPAL (Hero Banner Card) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-slate-900 to-teal-950 text-white p-6 sm:p-8 shadow-xl border border-teal-800/40">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            
            {/* Meta indicator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>Prescripción Generada para {prescription.role}</span>
              <span aria-hidden="true">·</span>
              <span>{prescription.shift}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Tu Dosis Recomendada: {Math.round(prescription.totalDurationSeconds / 60)} Minuto{prescription.totalDurationSeconds > 60 ? 's' : ''} de Descompresión
            </h3>

            <p className="text-slate-300 text-sm leading-relaxed">
              {prescription.rationale}
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-xs text-slate-300">Zona Clave</div>
                <div className="text-sm font-bold text-white truncate mt-0.5">{prescription.tensionZone}</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-xs text-slate-300">Nivel de Fatiga</div>
                <div className="text-sm font-bold text-teal-300 mt-0.5 num-tabular">{prescription.fatigueLevel} / 10</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
                <div className="text-xs text-slate-300">Ejercicios</div>
                <div className="text-sm font-bold text-white mt-0.5 num-tabular">{prescription.exercises.length} técnicas</div>
              </div>
            </div>

          </div>

          {/* Gran Botón de Inicio con Temporizador */}
          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={onStartSession}
              className="px-8 py-5 text-base sm:text-lg font-bold text-slate-900 bg-teal-400 hover:bg-teal-300 active:scale-95 transition-all rounded-2xl shadow-lg shadow-teal-900/40 flex items-center justify-center gap-3 whitespace-nowrap min-h-[56px]"
            >
              <Play className="w-6 h-6 fill-slate-900" />
              <span>Iniciar Sesión Guiada</span>
            </button>
            <span className="text-center text-xs text-teal-300/80">
              Con temporizador visual y chimes suaves
            </span>
          </div>

        </div>

        {/* Clinical Tip Notice */}
        <div className="mt-6 pt-5 border-t border-teal-800/60 flex items-start gap-3 text-xs text-slate-300">
          <Stethoscope className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Consejo de Salud Laboral: </strong>
            {prescription.clinicalTip}
          </div>
        </div>

      </div>

      {/* Secuencia Detallada de Ejercicios */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Secuencia de Ejercicios Guiados ({prescription.exercises.length} pasos)
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Puedes ejecutarlos en orden o hacer clic en uno específico
          </span>
        </div>

        <div className="space-y-3">
          {prescription.exercises.map((ex, index) => (
            <div
              key={ex.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-teal-400/60 dark:hover:border-teal-500/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group shadow-sm"
            >
              <div className="flex items-start gap-4">
                
                {/* Step badge */}
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 font-bold text-sm flex items-center justify-center shrink-0">
                  {index + 1}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      {getCategoryIcon(ex.category)}
                      <span>{getCategoryName(ex.category)}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono num-tabular">
                      <Clock className="w-3.5 h-3.5" />
                      {ex.durationSeconds}s
                    </span>
                  </div>

                  <h5 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {ex.title}
                  </h5>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2">
                    {ex.subtitle} — {ex.hospitalContext}
                  </p>
                </div>
              </div>

              {/* Botón rápido para ejecutar este ejercicio */}
              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => onStartSingleExercise(ex)}
                  className="px-4 py-2 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 hover:bg-teal-100 dark:bg-teal-950/40 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 rounded-xl transition-all flex items-center gap-1.5 min-h-[40px] whitespace-nowrap"
                >
                  <span>Hacer este ejercicio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Safety & Protocol Banner */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
        <div>
          <strong>Seguridad ocupacional:</strong> Ningún estiramiento debe causar dolor punzante. Si tienes alguna patología discal o articular aguda previa, mantén los movimientos en rango suave y consulta a medicina del trabajo del hospital.
        </div>
      </div>

    </div>
  );
};
