import React, { useState, useEffect } from 'react';
import { Eye, Clock, ShieldCheck, Sun, Play, RotateCcw, Sparkles } from 'lucide-react';
import { playChime, playGentleClick } from '../utils/audioSynth';

export const VisualRestTab: React.FC = () => {
  // 20-20-20 Timer state
  const [timer20Seconds, setTimer20Seconds] = useState(20);
  const [is20Active, setIs20Active] = useState(false);
  const [cycleCompleted, setCycleCompleted] = useState(false);

  // Eye movement mode
  const [gymMode, setGymMode] = useState<'circles' | 'horizontal' | 'vertical' | 'convergence'>('circles');
  const [eyePos, setEyePos] = useState({ x: 50, y: 50 });
  const [isGymActive, setIsGymActive] = useState(false);

  // Palming timer
  const [palmingSecs, setPalmingSecs] = useState(45);
  const [isPalmingActive, setIsPalmingActive] = useState(false);

  // 20-20-20 countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (is20Active && timer20Seconds > 0) {
      interval = setInterval(() => {
        setTimer20Seconds((prev) => {
          if (prev <= 1) {
            playChime(528, 2.0);
            setIs20Active(false);
            setCycleCompleted(true);
            return 20;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [is20Active, timer20Seconds]);

  // Palming countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPalmingActive && palmingSecs > 0) {
      interval = setInterval(() => {
        setPalmingSecs((prev) => {
          if (prev <= 1) {
            playChime(440, 2.5);
            setIsPalmingActive(false);
            return 45;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPalmingActive, palmingSecs]);

  // Gym motion loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGymActive) {
      let step = 0;
      interval = setInterval(() => {
        step = (step + 1) % 8;
        if (gymMode === 'circles') {
          const angle = (step / 8) * (2 * Math.PI);
          setEyePos({
            x: 50 + 35 * Math.cos(angle),
            y: 50 + 35 * Math.sin(angle),
          });
        } else if (gymMode === 'horizontal') {
          setEyePos({
            x: step % 2 === 0 ? 15 : 85,
            y: 50,
          });
        } else if (gymMode === 'vertical') {
          setEyePos({
            x: 50,
            y: step % 2 === 0 ? 15 : 85,
          });
        } else if (gymMode === 'convergence') {
          setEyePos({
            x: 50,
            y: step % 2 === 0 ? 20 : 75,
          });
        }
      }, 1500);
    } else {
      setEyePos({ x: 50, y: 50 });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGymActive, gymMode]);

  const start20Session = () => {
    setCycleCompleted(false);
    setTimer20Seconds(20);
    setIs20Active(true);
    playGentleClick();
  };

  const startPalming = () => {
    setPalmingSecs(45);
    setIsPalmingActive(true);
    playChime(432, 1.8);
  };

  return (
    <div className="space-y-8">
      
      {/* Header intro */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Eye className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Módulo de Descanso Visual para Personal Sanitario</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          El aire acondicionado continuo de quirófano y UCI, sumado a las pantallas clínicas (PACS, EHR, bombas y monitores) reduce la frecuencia de parpadeo de 18 a solo 5 veces por minuto. Estas técnicas reactivan tu película lagrimal y relajan el músculo ciliar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Herramienta 1: Regla 20-20-20 Interactiva */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Protocolo Internacional de Ergonomía Ocular
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Regla 20-20-20 Guiada
              </h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
              20″
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Cada 20 minutos de pantalla, aparta la mirada y observa un objeto situado a <strong>20 pies (6 metros o más)</strong> durante <strong>20 segundos</strong>.
          </p>

          {/* Interactive visual canvas for 20-20-20 */}
          <div className="relative h-44 rounded-2xl bg-gradient-to-b from-sky-50 via-teal-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800/80 border border-teal-100 dark:border-slate-700 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
            {is20Active ? (
              <div className="space-y-2">
                <span className="text-4xl font-extrabold text-teal-700 dark:text-teal-300 num-tabular">
                  {timer20Seconds}s
                </span>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 animate-pulse">
                  Mira a través de una ventana o al rincón más distante del pasillo. Parpadea suavemente.
                </p>
              </div>
            ) : cycleCompleted ? (
              <div className="space-y-1">
                <Sparkles className="w-8 h-8 text-teal-600 dark:text-teal-400 mx-auto" />
                <div className="text-sm font-bold text-slate-900 dark:text-white">¡Músculo ciliar relajado!</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Tus ojos han recuperado su enfoque natural al infinito.</div>
              </div>
            ) : (
              <div className="space-y-2 text-slate-600 dark:text-slate-400 text-xs">
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
                  Listo para iniciar tu descanso de 20 segundos
                </p>
                <p>Pulsa el botón y aparta la vista de este monitor.</p>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={start20Session}
              disabled={is20Active}
              className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{is20Active ? 'Temporizador activo...' : 'Iniciar 20 Segundos'}</span>
            </button>
            {is20Active && (
              <button
                onClick={() => setIs20Active(false)}
                className="py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium text-xs hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Herramienta 2: Gimnasia Ocular Interactiva */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Flexibilidad Oculomotora
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                Gimnasia Sacádica de Ojos
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(['circles', 'horizontal', 'vertical'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setGymMode(mode)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                    gymMode === mode
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                  }`}
                >
                  {mode === 'circles' ? 'Círculos' : mode === 'horizontal' ? 'Lateral' : 'Vertical'}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Mantén la cabeza quieta y sigue con la vista el punto verde con suavidad para distender los 6 músculos extraoculares.
          </p>

          {/* Interactive Tracker Canvas */}
          <div className="relative h-44 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center overflow-hidden shadow-inner">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[11px] text-slate-600 select-none">
                {isGymActive ? 'Sigue el punto con tu mirada' : 'Presiona Iniciar Gimnasia'}
              </span>
            </div>

            <div
              className={`absolute w-6 h-6 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/60 transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                isGymActive ? 'duration-1000 ease-in-out' : 'duration-300'
              }`}
              style={{ left: `${eyePos.x}%`, top: `${eyePos.y}%` }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsGymActive(!isGymActive)}
              className="flex-1 py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 min-h-[44px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isGymActive ? 'Detener Movimiento' : 'Iniciar Gimnasia Ocular'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Herramienta 3: Palming Térmico Hospitalario */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
            <Sun className="w-4 h-4" />
            <span>Técnica del Dr. Bates Adaptada a Sanidad</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Palming Térmico: Oscuridad y Calor Palmar
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Frota enérgicamente tus palmas limpias hasta calentarlas. Colócalas en forma de cuenco sobre los ojos cerrados (sin presionar). La ausencia de luz y el calor regeneran la rodopsina retiniana agotada por focos quirúrgicos y monitores.
          </p>
        </div>

        <div className="shrink-0 flex flex-col items-center gap-2 w-full sm:w-auto">
          {isPalmingActive ? (
            <div className="text-center p-4 bg-slate-800/80 rounded-2xl border border-slate-700 w-full sm:w-48">
              <span className="text-3xl font-extrabold text-teal-400 num-tabular">
                {palmingSecs}s
              </span>
              <p className="text-[11px] text-slate-300 mt-1">Cierra tus ojos en calma</p>
              <button
                onClick={() => setIsPalmingActive(false)}
                className="mt-2 text-xs text-rose-400 hover:underline"
              >
                Finalizar antes
              </button>
            </div>
          ) : (
            <button
              onClick={startPalming}
              className="w-full sm:w-auto px-6 py-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm rounded-2xl shadow-lg transition-all min-h-[48px]"
            >
              Iniciar Palming (45 segundos)
            </button>
          )}
        </div>
      </div>

      {/* Consejos Ergonómicos para el Hospital */}
      <div className="p-6 rounded-3xl bg-teal-50/60 dark:bg-slate-900 border border-teal-100 dark:border-slate-800 space-y-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span>Recomendaciones de Salud Visual en la Estación Clínica</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Brillo y Contraste:</strong>
            El brillo de la pantalla debe ser similar a la luz ambiental del servicio. Evita trabajar en cuartos oscuros con la pantalla al 100%.
          </div>
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Distancia y Altura:</strong>
            La parte superior del monitor debe quedar a la altura de tus ojos o ligeramente por debajo, a una distancia aproximada de un brazo (50-70 cm).
          </div>
          <div className="p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">Hidratación y Lentes:</strong>
            Si usas lentes de contacto durante guardias de 12 o 24 horas, lleva lágrimas artificiales sin conservantes para evitar micro-úlceras corneales.
          </div>
        </div>
      </div>

    </div>
  );
};
