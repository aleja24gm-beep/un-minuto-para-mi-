import React, { useState, useEffect } from 'react';
import { HospitalRole, TensionZone, ShiftType, WellnessPrescription, ExerciseStep, SessionLog } from './types';
import { generatePrescription, ALL_EXERCISES } from './data/exercises';
import { Header } from './components/Header';
import { PrescriptionForm } from './components/PrescriptionForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { GuidedSessionModal } from './components/GuidedSessionModal';
import { VisualRestTab } from './components/VisualRestTab';
import { BreathingTab } from './components/BreathingTab';
import { ActiveBreaksTab } from './components/ActiveBreaksTab';
import { StatsHistoryTab } from './components/StatsHistoryTab';
import { 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Flame, 
  Clock, 
  ShieldAlert, 
  ArrowRight,
  Stethoscope
} from 'lucide-react';

export default function App() {
  // Navigation
  const [currentTab, setCurrentTab] = useState<'prescriptor' | 'visual' | 'relajacion' | 'pausas' | 'bitacora'>('prescriptor');

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('un_minuto_theme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('un_minuto_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('un_minuto_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Form inputs
  const [role, setRole] = useState<HospitalRole>('Enfermería y Cuidados');
  const [tensionZone, setTensionZone] = useState<TensionZone>('Cuello, Hombros y Trapecios');
  const [fatigueLevel, setFatigueLevel] = useState<number>(6);
  const [durationSeconds, setDurationSeconds] = useState<number>(120);
  const [shift, setShift] = useState<ShiftType>('Turno Mañana');
  const [notes, setNotes] = useState<string>('');

  // Generated prescription
  const [prescription, setPrescription] = useState<WellnessPrescription>(() => 
    generatePrescription('Enfermería y Cuidados', 'Cuello, Hombros y Trapecios', 6, 120, 'Turno Mañana')
  );

  // Modal Player
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalExercises, setModalExercises] = useState<ExerciseStep[]>(prescription.exercises);
  const [modalFatigueBefore, setModalFatigueBefore] = useState<number>(6);

  // Saved History Logs (localStorage)
  const [logs, setLogs] = useState<SessionLog[]>(() => {
    try {
      const stored = localStorage.getItem('un_minuto_logs');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    // Initial sample session so users immediately understand the benefit
    return [
      {
        id: 'initial_sample_1',
        date: 'Hoy, 10:15',
        timestamp: Date.now() - 7200000,
        role: 'Enfermería y Cuidados',
        tensionZone: 'Piernas Pesadas y Pies',
        durationSeconds: 120,
        fatigueBefore: 7,
        fatigueAfter: 3,
        notes: 'Pausa post administración matutina de medicamentos',
        exercisesCompleted: ['Bomba de Retorno Venoso en Gemelos', 'Suspiro Fisiológico Neuro-Vagal'],
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('un_minuto_logs', JSON.stringify(logs));
  }, [logs]);

  // Actions
  const handleGenerate = () => {
    const rx = generatePrescription(role, tensionZone, fatigueLevel, durationSeconds, shift);
    setPrescription(rx);
    // Smooth scroll to results
    const resultsElem = document.getElementById('seccion-resultados');
    if (resultsElem) {
      resultsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleResetForm = () => {
    setRole('Enfermería y Cuidados');
    setTensionZone('Cuello, Hombros y Trapecios');
    setFatigueLevel(5);
    setDurationSeconds(120);
    setShift('Turno Mañana');
    setNotes('');
    const rx = generatePrescription('Enfermería y Cuidados', 'Cuello, Hombros y Trapecios', 5, 120, 'Turno Mañana');
    setPrescription(rx);
  };

  const handleApplyPreset = (preset: 'quick60' | 'standing' | 'codeRed' | 'screens') => {
    if (preset === 'quick60') {
      setDurationSeconds(60);
      setTensionZone('Sobrecarga Mental y Estrés');
      const rx = generatePrescription(role, 'Sobrecarga Mental y Estrés', fatigueLevel, 60, shift);
      setPrescription(rx);
    } else if (preset === 'standing') {
      setRole('Enfermería y Cuidados');
      setTensionZone('Piernas Pesadas y Pies');
      setDurationSeconds(120);
      const rx = generatePrescription('Enfermería y Cuidados', 'Piernas Pesadas y Pies', fatigueLevel, 120, shift);
      setPrescription(rx);
    } else if (preset === 'codeRed') {
      setTensionZone('Sobrecarga Mental y Estrés');
      setFatigueLevel(9);
      setDurationSeconds(60);
      const rx = generatePrescription(role, 'Sobrecarga Mental y Estrés', 9, 60, shift);
      setPrescription(rx);
    } else if (preset === 'screens') {
      setTensionZone('Ojos y Cefalea');
      setDurationSeconds(120);
      const rx = generatePrescription(role, 'Ojos y Cefalea', fatigueLevel, 120, shift);
      setPrescription(rx);
    }
  };

  const handleStartSession = () => {
    setModalExercises(prescription.exercises);
    setModalFatigueBefore(prescription.fatigueLevel);
    setIsModalOpen(true);
  };

  const handleStartSingleExercise = (exercise: ExerciseStep) => {
    setModalExercises([exercise]);
    setModalFatigueBefore(fatigueLevel);
    setIsModalOpen(true);
  };

  const handleTriggerSOS = () => {
    // 60-second emergency reset routine
    const sosExercises: ExerciseStep[] = [
      ALL_EXERCISES.find(e => e.id === 'rel_sigh') || ALL_EXERCISES[4],
      ALL_EXERCISES.find(e => e.id === 'vis_palming') || ALL_EXERCISES[1],
    ];
    setModalExercises(sosExercises);
    setModalFatigueBefore(9);
    setIsModalOpen(true);
  };

  const handleSaveSession = (newLog: SessionLog) => {
    setLogs(prev => [newLog, ...prev]);
  };

  const handleClearLogs = () => {
    if (window.confirm('¿Deseas reiniciar la bitácora de pausas de este turno?')) {
      setLogs([]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Top Bar Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab as any)}
        onTriggerSOS={handleTriggerSOS}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        {/* Tab 1: Prescriptor Principal (Campos de entrada y Resultados destacados) */}
        {currentTab === 'prescriptor' && (
          <div className="space-y-10">
            
            {/* Hero Banner with Generated Architectural Image */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Left Text Block */}
                <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-teal-700 dark:text-teal-400">
                    <Stethoscope className="w-4 h-4" />
                    <span>Salud Ocupacional y Bienestar Hospitalario</span>
                    <span aria-hidden="true">·</span>
                    <span>Para Quienes Cuidan la Vida</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                    Un minuto para mí.
                  </h1>

                  <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                    Pausas activas ergonómicas, descanso visual para pantallas clínicas y descompresión neuro-vagal diseñadas con evidencia para el ritmo exigente del hospital.
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span>Sin equipos especiales</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span>De 60s a 5 minutos</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                      <span>Respaldo biomecánico</span>
                    </span>
                  </div>
                </div>

                {/* Right Image Block */}
                <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
                  <img
                    src="/src/assets/images/hospital_peaceful_respite_1793407032357.jpg"
                    alt="Personal sanitario descansando en la terraza verde del hospital"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 lg:bg-gradient-to-r lg:from-white dark:lg:from-slate-900 lg:to-transparent lg:w-24" />
                </div>

              </div>
            </div>

            {/* SECCIÓN 1: CAMPOS DE ENTRADA Y BOTONES CLAROS */}
            <section aria-labelledby="form-heading">
              <PrescriptionForm
                role={role}
                setRole={setRole}
                tensionZone={tensionZone}
                setTensionZone={setTensionZone}
                fatigueLevel={fatigueLevel}
                setFatigueLevel={setFatigueLevel}
                durationSeconds={durationSeconds}
                setDurationSeconds={setDurationSeconds}
                shift={shift}
                setShift={setShift}
                notes={notes}
                setNotes={setNotes}
                onGenerate={handleGenerate}
                onReset={handleResetForm}
                onApplyPreset={handleApplyPreset}
              />
            </section>

            {/* SECCIÓN 2: RESULTADOS DESTACADOS */}
            <section id="seccion-resultados" aria-labelledby="results-heading" className="pt-4">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                  <span>Resultados Destacados de Tu Prescripción</span>
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Actualizado en tiempo real
                </span>
              </div>

              <ResultsDisplay
                prescription={prescription}
                onStartSession={handleStartSession}
                onStartSingleExercise={handleStartSingleExercise}
              />
            </section>

          </div>
        )}

        {/* Tab 2: Descanso Visual */}
        {currentTab === 'visual' && <VisualRestTab />}

        {/* Tab 3: Relajación y Respiración */}
        {currentTab === 'relajacion' && <BreathingTab />}

        {/* Tab 4: Pausas Activas */}
        {currentTab === 'pausas' && (
          <ActiveBreaksTab onStartSingleExercise={handleStartSingleExercise} />
        )}

        {/* Tab 5: Bitácora e Historial */}
        {currentTab === 'bitacora' && (
          <StatsHistoryTab logs={logs} onClearLogs={handleClearLogs} />
        )}

      </main>

      {/* Guided Session Modal Player */}
      <GuidedSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        exercises={modalExercises}
        role={role}
        tensionZone={tensionZone}
        fatigueBefore={modalFatigueBefore}
        onSaveSession={handleSaveSession}
      />

      {/* Discreet Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-white">Un minuto para mí</span>
            <span>—</span>
            <span>Programa de Pausas Activas y Salud Ocupacional Hospitalaria</span>
          </div>
          <div className="text-slate-400 dark:text-slate-500">
            Diseñado para médicos, enfermeros, técnicos, administrativos y personal de apoyo.
          </div>
        </div>
      </footer>

    </div>
  );
}
