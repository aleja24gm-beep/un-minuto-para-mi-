import React, { useState, useEffect, useRef } from 'react';
import { ExerciseStep, SessionLog, HospitalRole, TensionZone } from '../types';
import { playChime, playGentleClick, startAmbientSwellingSound, stopAmbientSound } from '../utils/audioSynth';
import { 
  Play, 
  Pause, 
  SkipForward, 
  X, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Sparkles, 
  Heart,
  RotateCcw
} from 'lucide-react';

interface GuidedSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  exercises: ExerciseStep[];
  role: HospitalRole;
  tensionZone: TensionZone;
  fatigueBefore: number;
  onSaveSession: (log: SessionLog) => void;
}

export const GuidedSessionModal: React.FC<GuidedSessionModalProps> = ({
  isOpen,
  onClose,
  exercises,
  role,
  tensionZone,
  fatigueBefore,
  onSaveSession,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [fatigueAfter, setFatigueAfter] = useState(Math.max(1, fatigueBefore - 3));
  const [savedNotes, setSavedNotes] = useState('');

  // Breathing or visual pacing state
  const [breathPhase, setBreathPhase] = useState<'Inhala' | 'Retén' | 'Exhala' | 'Sostén'>('Inhala');
  const [breathCounter, setBreathCounter] = useState(4);
  const [visualTargetPos, setVisualTargetPos] = useState({ x: 50, y: 50 });

  const activeExercise = exercises[currentStepIndex] || exercises[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breathTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize exercise time
  useEffect(() => {
    if (isOpen && activeExercise) {
      setTimeLeft(activeExercise.durationSeconds);
      setIsRunning(true);
      setIsCompleted(false);

      if (soundEnabled) {
        playChime(528, 2.0); // 528Hz calming tone
        startAmbientSwellingSound(0.18);
      }
    }

    return () => {
      stopAmbientSound();
      if (timerRef.current) clearInterval(timerRef.current);
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isOpen, currentStepIndex]);

  // Main countdown tick
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleStepFinished();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft, currentStepIndex]);

  // Breathing / visual pacing loop
  useEffect(() => {
    if (!isRunning || !activeExercise) return;

    if (activeExercise.breathingPattern) {
      const pattern = activeExercise.breathingPattern;
      let phase: 'Inhala' | 'Retén' | 'Exhala' | 'Sostén' = 'Inhala';
      let count = pattern.inhale;

      breathTimerRef.current = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          if (phase === 'Inhala') {
            if (pattern.hold1 && pattern.hold1 > 0) {
              phase = 'Retén';
              count = pattern.hold1;
            } else {
              phase = 'Exhala';
              count = pattern.exhale;
            }
          } else if (phase === 'Retén') {
            phase = 'Exhala';
            count = pattern.exhale;
          } else if (phase === 'Exhala') {
            if (pattern.hold2 && pattern.hold2 > 0) {
              phase = 'Sostén';
              count = pattern.hold2;
            } else {
              phase = 'Inhala';
              count = pattern.inhale;
            }
          } else {
            phase = 'Inhala';
            count = pattern.inhale;
          }

          if (soundEnabled) {
            playGentleClick();
          }
        }
        setBreathPhase(phase);
        setBreathCounter(count);
      }, 1000);
    } else if (activeExercise.category === 'visual') {
      // Dynamic moving dot for ocular saccadic motion
      const positions = [
        { x: 50, y: 15 }, // Arriba
        { x: 85, y: 50 }, // Derecha
        { x: 50, y: 85 }, // Abajo
        { x: 15, y: 50 }, // Izquierda
        { x: 50, y: 50 }, // Centro
      ];
      let pIdx = 0;
      breathTimerRef.current = setInterval(() => {
        pIdx = (pIdx + 1) % positions.length;
        setVisualTargetPos(positions[pIdx]);
      }, 2500);
    }

    return () => {
      if (breathTimerRef.current) clearInterval(breathTimerRef.current);
    };
  }, [isRunning, activeExercise, soundEnabled]);

  const handleStepFinished = () => {
    if (soundEnabled) {
      playChime(660, 2.5);
    }

    if (currentStepIndex < exercises.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setIsRunning(false);
      stopAmbientSound();
    }
  };

  const handleToggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      startAmbientSwellingSound(0.18);
    } else {
      stopAmbientSound();
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < exercises.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      setIsRunning(false);
      stopAmbientSound();
    }
  };

  const handleRestartStep = () => {
    if (activeExercise) {
      setTimeLeft(activeExercise.durationSeconds);
      setIsRunning(true);
      if (soundEnabled) playChime(440, 1.5);
    }
  };

  const handleCompleteAndSave = () => {
    const totalSecs = exercises.reduce((acc, curr) => acc + curr.durationSeconds, 0);
    const newLog: SessionLog = {
      id: `log_${Date.now()}`,
      date: new Date().toLocaleDateString('es-ES', { 
        weekday: 'short', 
        day: 'numeric', 
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }),
      timestamp: Date.now(),
      role,
      tensionZone,
      durationSeconds: totalSecs,
      fatigueBefore,
      fatigueAfter,
      notes: savedNotes || undefined,
      exercisesCompleted: exercises.map(e => e.title),
    };

    onSaveSession(newLog);
    onClose();
  };

  if (!isOpen) return null;

  const totalStepTime = activeExercise ? activeExercise.durationSeconds : 60;
  const progressPercent = totalStepTime > 0 ? ((totalStepTime - timeLeft) / totalStepTime) * 100 : 0;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header of the modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Pausa Activa en Curso · Paso {currentStepIndex + 1} de {exercises.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSound}
              className={`p-2 rounded-xl transition-colors ${
                soundEnabled 
                  ? 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 dark:text-teal-300' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
              title={soundEnabled ? 'Silenciar sonidos' : 'Activar sonido relajante'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {!isCompleted ? (
            <>
              {/* Exercise Title and Context */}
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  {activeExercise.anatomicalTarget}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  {activeExercise.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
                  {activeExercise.subtitle}
                </p>
              </div>

              {/* Interactive Visual Display: Circular Timer or Breathing Pacer or Visual Tracker */}
              <div className="flex flex-col items-center justify-center py-4">
                
                {/* Visual Rest dot tracking */}
                {activeExercise.category === 'visual' && (
                  <div className="relative w-64 h-36 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-4 shadow-inner">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 select-none">
                        Sigue el punto suavemente con tus ojos
                      </span>
                    </div>
                    <div
                      className="absolute w-5 h-5 rounded-full bg-teal-500 shadow-md shadow-teal-500/50 transition-all duration-1000 ease-in-out transform -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${visualTargetPos.x}%`,
                        top: `${visualTargetPos.y}%`,
                      }}
                    />
                  </div>
                )}

                {/* Breathing Pacer Circle if relaxation */}
                {activeExercise.breathingPattern ? (
                  <div className="relative flex flex-col items-center justify-center my-2">
                    <div className={`w-40 h-40 rounded-full flex flex-col items-center justify-center text-center transition-all duration-1000 ${
                      breathPhase === 'Inhala' 
                        ? 'scale-110 bg-teal-500/20 border-2 border-teal-500 shadow-lg shadow-teal-500/20' 
                        : breathPhase === 'Retén'
                        ? 'scale-110 bg-sky-500/20 border-2 border-sky-500'
                        : breathPhase === 'Exhala'
                        ? 'scale-90 bg-slate-200 dark:bg-slate-800 border-2 border-teal-600/40'
                        : 'scale-90 bg-indigo-500/20 border-2 border-indigo-400'
                    }`}>
                      <span className="text-lg font-bold text-teal-800 dark:text-teal-200">{breathPhase}</span>
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white num-tabular mt-1">{breathCounter}s</span>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
                      {activeExercise.breathingPattern.label}
                    </span>
                  </div>
                ) : (
                  /* Standard Circular SVG Timer */
                  <div className="relative flex items-center justify-center my-2">
                    <svg className="w-36 h-36 transform -rotate-90">
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        className="text-slate-100 dark:text-slate-800"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                      />
                      <circle
                        cx="72"
                        cy="72"
                        r={radius}
                        className="text-teal-500 transition-all duration-500 ease-linear"
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white num-tabular">
                        {timeLeft}s
                      </span>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                        restantes
                      </span>
                    </div>
                  </div>
                )}

              </div>

              {/* Instructions List */}
              <div className="p-4 rounded-2xl bg-teal-50/50 dark:bg-teal-950/20 border border-teal-100 dark:border-teal-900/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-900 dark:text-teal-300">
                  Instrucciones Biomecánicas
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  {activeExercise.instructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-teal-200 dark:bg-teal-800 text-teal-800 dark:text-teal-200 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro-Tip for Shift */}
              <div className="text-xs text-slate-500 dark:text-slate-400 italic text-center">
                💡 {activeExercise.tips}
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleRestartStep}
                  title="Reiniciar este paso"
                  className="p-3 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold flex items-center gap-2 shadow-md shadow-teal-600/20 active:scale-95 transition-all min-h-[48px]"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Pausar</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Reanudar</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleNextStep}
                  title="Siguiente ejercicio"
                  className="px-4 py-3 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 font-semibold text-sm min-h-[44px]"
                >
                  <span>{currentStepIndex < exercises.length - 1 ? 'Siguiente' : 'Finalizar'}</span>
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            /* COMPLETION SCREEN: Celebrate & Evaluate Relief */
            <div className="text-center py-4 space-y-6">
              
              <div className="w-16 h-16 rounded-3xl bg-teal-100 dark:bg-teal-950/60 border border-teal-300 dark:border-teal-700 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  ¡Excelente Trabajo de Autocuidado!
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Has completado tu minuto para ti
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                  Acabas de oxigenar tus tejidos, reiniciar el tono parasimpático y proteger tu salud osteomuscular.
                </p>
              </div>

              {/* Califica tu fatiga posterior */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500" />
                    <span>¿Cómo sientes tu nivel de fatiga ahora?</span>
                  </label>
                  <div className="flex items-center gap-1 font-mono text-lg font-bold text-teal-600 dark:text-teal-400 num-tabular">
                    <span>{fatigueAfter}</span>
                    <span className="text-xs text-slate-400">/ 10</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={1}
                  max={10}
                  value={fatigueAfter}
                  onChange={(e) => setFatigueAfter(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Antes: {fatigueBefore}/10</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    {fatigueBefore > fatigueAfter 
                      ? `✨ ¡Alivio de ${fatigueBefore - fatigueAfter} puntos!` 
                      : 'Equilibrio mantenido'}
                  </span>
                  <span>1 (Totalmente renovado)</span>
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    value={savedNotes}
                    onChange={(e) => setSavedNotes(e.target.value)}
                    placeholder="Nota sobre cómo te sientes ahora (opcional)"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                  />
                </div>
              </div>

              {/* Botón Guardar en Bitácora y Salir */}
              <button
                onClick={handleCompleteAndSave}
                className="w-full py-4 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-2xl shadow-lg shadow-teal-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 min-h-[50px]"
              >
                <Sparkles className="w-5 h-5" />
                <span>Guardar en Mi Bitácora y Continuar Turno</span>
              </button>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
