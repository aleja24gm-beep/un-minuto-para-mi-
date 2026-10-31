import React from 'react';
import { SessionLog } from '../types';
import { 
  TrendingDown, 
  Clock, 
  Calendar, 
  Download, 
  Trash2, 
  Sparkles, 
  Award,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';

interface StatsHistoryTabProps {
  logs: SessionLog[];
  onClearLogs: () => void;
}

export const StatsHistoryTab: React.FC<StatsHistoryTabProps> = ({ logs, onClearLogs }) => {
  // Compute metrics
  const totalSessions = logs.length;
  const totalMinutes = Math.round(logs.reduce((acc, curr) => acc + curr.durationSeconds, 0) / 60);

  const avgRelief = logs.length > 0
    ? (logs.reduce((acc, curr) => acc + (curr.fatigueBefore - curr.fatigueAfter), 0) / logs.length).toFixed(1)
    : '0.0';

  const exportSummary = () => {
    const textLines = [
      '==================================================',
      'UN MINUTO PARA MÍ - REPORTE DE AUTOCUIDADO HOSPITALARIO',
      '==================================================',
      `Fecha de Emisión: ${new Date().toLocaleString('es-ES')}`,
      `Total Pausas Realizadas: ${totalSessions}`,
      `Minutos de Autocuidado Acumulados: ${totalMinutes} min`,
      `Alivio Promedio de Fatiga Percibida: -${avgRelief} puntos`,
      '',
      '--- DETALLE CRONOLÓGICO DE PAUSAS ---',
      ...logs.map((log, i) => (
        `[${i + 1}] ${log.date} | ${log.role} | Zona: ${log.tensionZone} | Duración: ${log.durationSeconds}s | Fatiga: ${log.fatigueBefore}/10 -> ${log.fatigueAfter}/10 | Ejercicios: ${log.exercisesCompleted.join(', ')} ${log.notes ? `| Nota: ${log.notes}` : ''}`
      )),
      '',
      '==================================================',
      'Generado con "Un minuto para mí" · Cuidar al que cuida',
      '=================================================='
    ];

    const blob = new Blob([textLines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bitacora_pausas_hospital_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Award className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            <span>Bitácora de Autocuidado y Resultados del Turno</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Registro de cada micro-pausa realizada, alivio de fatiga conseguido y constancia en tu jornada.
          </p>
        </div>

        {logs.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={exportSummary}
              className="py-2 px-3 text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl hover:bg-teal-100 transition-colors flex items-center gap-1.5 min-h-[40px]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar Reporte</span>
            </button>
            <button
              onClick={onClearLogs}
              className="py-2 px-3 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors flex items-center gap-1.5 min-h-[40px]"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          </div>
        )}
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Pausas Realizadas
            </span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2 num-tabular">
            {totalSessions}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {totalSessions >= 3 ? '🎉 ¡Meta diaria de autocuidado alcanzada!' : 'Objetivo recomendado: 3 pausas por turno'}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Minutos Invertidos
            </span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-teal-700 dark:text-teal-400 mt-2 num-tabular">
            {totalMinutes} <span className="text-lg font-normal text-slate-500">min</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Dedicados a proteger tu cuerpo y mente
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Alivio Promedio de Fatiga
            </span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2 num-tabular">
            -{avgRelief} <span className="text-lg font-normal text-slate-500">pts</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Reducción neta en la escala subjetiva de fatiga
          </p>
        </div>

      </div>

      {/* History Table or Empty State */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          Historial de Sesiones
        </h3>

        {logs.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Aún no has registrado ninguna pausa en este turno
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Ve al Prescriptor o a cualquiera de los módulos e inicia tu primer minuto de autocuidado.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[11px] tracking-wider">
                  <th className="pb-3 font-semibold">Fecha / Hora</th>
                  <th className="pb-3 font-semibold">Servicio</th>
                  <th className="pb-3 font-semibold">Zona de Alivio</th>
                  <th className="pb-3 font-semibold text-center">Duración</th>
                  <th className="pb-3 font-semibold text-center">Fatiga (Antes → Después)</th>
                  <th className="pb-3 font-semibold">Técnicas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 font-medium text-slate-900 dark:text-white whitespace-nowrap">
                      {log.date}
                    </td>
                    <td className="py-3.5 text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {log.role}
                    </td>
                    <td className="py-3.5 text-teal-700 dark:text-teal-400 font-semibold whitespace-nowrap">
                      {log.tensionZone}
                    </td>
                    <td className="py-3.5 text-center font-mono num-tabular whitespace-nowrap text-slate-700 dark:text-slate-300">
                      {log.durationSeconds}s
                    </td>
                    <td className="py-3.5 text-center whitespace-nowrap">
                      <span className="font-mono num-tabular font-bold text-rose-500">{log.fatigueBefore}</span>
                      <span className="text-slate-400 mx-1">→</span>
                      <span className="font-mono num-tabular font-bold text-emerald-500">{log.fatigueAfter}</span>
                    </td>
                    <td className="py-3.5 text-slate-500 dark:text-slate-400 text-xs max-w-xs truncate">
                      {log.exercisesCompleted.join(', ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Hospital occupational care statement */}
      <div className="p-5 rounded-3xl bg-teal-50 dark:bg-slate-800/60 border border-teal-200 dark:border-slate-700 flex items-start gap-3">
        <Stethoscope className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong className="text-slate-900 dark:text-white block mb-0.5">Mensaje de Salud Ocupacional para el Personal:</strong>
          Los profesionales de la salud tienen tasas de síndrome de burnout y trastornos musculoesqueléticos significativamente mayores a la población general. Tomar este minuto para ti no es una interrupción: es un acto de seguridad del paciente y de preservación de tu propia vocación.
        </div>
      </div>

    </div>
  );
};
