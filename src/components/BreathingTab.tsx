import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, Pause, Volume2, VolumeX, Sparkles, HeartPulse, Activity } from 'lucide-react';
import { 
  playChime, 
  playGentleClick, 
  startAmbientSwellingSound, 
  stopAmbientSound, 
  setAmbientVolume,
  getIsAmbientPlaying 
} from '../utils/audioSynth';

export const BreathingTab: React.FC = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<'sigh' | 'box' | '478'>('sigh');
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'Inhala' | 'Retén' | 'Exhala' | 'Sostén' | 'Segunda Inhalación'>('Inhala');
  const [counter, setCounter] = useState(4);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Soundscape
  const [isAmbientOn, setIsAmbientOn] = useState(false);
  const [ambientVol, setAmbientVol] = useState(0.25);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Techniques definition
  const TECHNIQUES = {
    sigh: {
      name: 'Suspiro Fisiológico Clínico',
      subtitle: '2 Inhalaciones nasales rápidas + 1 Exhalación bucal prolongada',
      desc: 'El método más rápido respaldado por neurobiología para colapsar el tono simpático y bajar la frecuencia cardíaca tras momentos de tensión crítica o código azul.',
      steps: [
        { name: 'Inhala', duration: 3 },
        { name: 'Segunda Inhalación', duration: 1 },
        { name: 'Exhala', duration: 6 },
      ]
    },
    box: {
      name: 'Respiración en Caja (Box 4-4-4-4)',
      subtitle: '4s Inhala · 4s Retén · 4s Exhala · 4s Sostén',
      desc: 'Utilizada por equipos de operaciones críticas para restablecer la claridad mental, el foco decisional y la serenidad física.',
      steps: [
        { name: 'Inhala', duration: 4 },
        { name: 'Retén', duration: 4 },
        { name: 'Exhala', duration: 4 },
        { name: 'Sostén', duration: 4 },
      ]
    },
    '478': {
      name: 'Técnica 4-7-8 de Relajación Profunda',
      subtitle: '4s Inhala · 7s Retén · 8s Exhala',
      desc: 'Actúa como un sedante natural para el sistema nervioso. Ideal al terminar el turno o durante el descanso de guardia nocturna.',
      steps: [
        { name: 'Inhala', duration: 4 },
        { name: 'Retén', duration: 7 },
        { name: 'Exhala', duration: 8 },
      ]
    }
  };

  const currentTech = TECHNIQUES[selectedTechnique];

  // Engine for breathing pacer
  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    let stepIdx = 0;
    let count = currentTech.steps[0].duration;
    setPhase(currentTech.steps[0].name as any);
    setCounter(count);

    timerRef.current = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        stepIdx = (stepIdx + 1) % currentTech.steps.length;
        if (stepIdx === 0) {
          setCyclesCompleted((prev) => prev + 1);
          playChime(528, 1.8);
        } else {
          playGentleClick();
        }
        const nextStep = currentTech.steps[stepIdx];
        setPhase(nextStep.name as any);
        count = nextStep.duration;
      }
      setCounter(count);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, selectedTechnique]);

  const toggleBreathing = () => {
    if (!isActive) {
      setIsActive(true);
      playChime(432, 2.0);
    } else {
      setIsActive(false);
    }
  };

  const handleToggleAmbient = () => {
    if (isAmbientOn) {
      stopAmbientSound();
      setIsAmbientOn(false);
    } else {
      startAmbientSwellingSound(ambientVol);
      setIsAmbientOn(true);
    }
  };

  const handleVolumeChange = (v: number) => {
    setAmbientVol(v);
    setAmbientVolume(v);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
          <Wind className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          <span>Módulo de Relajación Neuro-Vagal</span>
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          El estrés continuo en salas hospitalarias hiperactiva el sistema simpático (taquicardia, respiración torácica superficial y rigidez mandibular). La modulación voluntaria de la respiración activa directamente el nervio vago en menos de 60 segundos.
        </p>
      </div>

      {/* Main breathing pacer section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Technique Selector */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Técnicas Clínicas Disponibles
          </h3>

          {(Object.keys(TECHNIQUES) as Array<'sigh' | 'box' | '478'>).map((key) => {
            const t = TECHNIQUES[key];
            const isSelected = selectedTechnique === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setSelectedTechnique(key);
                  setIsActive(false);
                  setCyclesCompleted(0);
                }}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex flex-col min-h-[88px] ${
                  isSelected
                    ? 'border-teal-600 dark:border-teal-400 bg-teal-50/80 dark:bg-teal-950/40 text-teal-950 dark:text-white shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm leading-snug">{t.name}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-teal-700 dark:text-teal-300 font-medium mt-1">
                  {t.subtitle}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {t.desc}
                </span>
              </button>
            );
          })}

          {/* Soundscape generator card */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
                <Volume2 className="w-4 h-4" />
                <span>Paisaje Sonoro Relajante</span>
              </span>
              <button
                onClick={handleToggleAmbient}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  isAmbientOn 
                    ? 'bg-teal-500 text-slate-950 font-bold' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {isAmbientOn ? 'Sonido Activo' : 'Encender'}
              </button>
            </div>
            <p className="text-[11px] text-slate-300">
              Olas oceánicas y ruido marrón sintetizados en tiempo real para atenuar alarmas hospitalarias.
            </p>
            {isAmbientOn && (
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>Volumen</span>
                  <span>{Math.round(ambientVol * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.05}
                  max={0.5}
                  step={0.01}
                  value={ambientVol}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Center / Right Column: Interactive Visual Breathing Orb */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-between shadow-sm space-y-6">
          
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Guía Visual Rítmica
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {currentTech.name}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Sincroniza tu pecho y abdomen con el movimiento de la esfera. Hombros relajados.
            </p>
          </div>

          {/* Animated Breathing Orb */}
          <div className="relative w-64 h-64 flex items-center justify-center my-4">
            
            {/* Outer pulsating aura */}
            <div className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isActive && (phase === 'Inhala' || phase === 'Segunda Inhalación')
                ? 'scale-125 bg-teal-500/15'
                : isActive && phase === 'Retén'
                ? 'scale-120 bg-sky-500/15'
                : 'scale-90 bg-slate-200/40 dark:bg-slate-800/40'
            }`} />

            {/* Inner primary orb */}
            <div className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center text-center transition-all duration-1000 shadow-xl border-4 ${
              !isActive
                ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-500'
                : phase === 'Inhala' || phase === 'Segunda Inhalación'
                ? 'scale-115 bg-gradient-to-br from-teal-400 to-emerald-500 border-teal-300 text-slate-950 shadow-teal-500/30'
                : phase === 'Retén'
                ? 'scale-115 bg-gradient-to-br from-sky-400 to-indigo-500 border-sky-300 text-slate-950 shadow-sky-500/30'
                : phase === 'Exhala'
                ? 'scale-85 bg-gradient-to-br from-slate-200 to-teal-100 dark:from-slate-800 dark:to-teal-950 border-teal-500/40 text-slate-900 dark:text-white'
                : 'scale-85 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-slate-900 border-indigo-400 text-slate-900 dark:text-white'
            }`}>
              <span className="text-xl font-extrabold uppercase tracking-wide">
                {isActive ? phase : 'Listo'}
              </span>
              <span className="text-4xl font-black mt-1 num-tabular">
                {isActive ? `${counter}s` : '1′'}
              </span>
            </div>

          </div>

          {/* Cycles info */}
          <div className="flex items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <HeartPulse className="w-4 h-4 text-rose-500" />
              <span>Ciclos completados: <strong>{cyclesCompleted}</strong></span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Activity className="w-4 h-4 text-teal-500" />
              <span>Activación vagal: <strong>{isActive ? 'Activa' : 'Pausada'}</strong></span>
            </span>
          </div>

          {/* Main Controls */}
          <div className="flex gap-4 w-full max-w-sm">
            <button
              onClick={toggleBreathing}
              className="flex-1 py-4 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold text-base rounded-2xl shadow-md shadow-teal-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[50px]"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>Pausar Respiración</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 fill-white" />
                  <span>Comenzar Guía Rítmica</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Autogenic Muscle release checklist */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
        <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
          <span>Liberación Muscular Rápida en Tres Puntos (Anti-Bruxismo y Trapecios)</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">1. Mandíbula Suelta:</strong>
            Separa conscientemente los molares. Deja caer la mandíbula inferior 2 milímetros y despega la lengua del paladar.
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">2. Descenso de Hombros:</strong>
            Inhala subiendo los hombros a las orejas. Exhala con un suspiro y déjalos caer pesados, sintiendo cómo se alarga el cuello.
          </div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <strong className="text-slate-900 dark:text-white block mb-1">3. Abdomen Libre:</strong>
            Deja de contraer el vientre. Permite que el aire expanda suavemente la zona baja del estómago en cada inhalación.
          </div>
        </div>
      </div>

    </div>
  );
};
