import React from 'react';
import { HospitalRole, TensionZone, ShiftType } from '../types';
import { 
  Sparkles, 
  RotateCcw, 
  Clock, 
  Eye, 
  Activity, 
  User, 
  SunMedium, 
  Flame,
  Zap,
  Footprints,
  Brain
} from 'lucide-react';

interface PrescriptionFormProps {
  role: HospitalRole;
  setRole: (role: HospitalRole) => void;
  tensionZone: TensionZone;
  setTensionZone: (zone: TensionZone) => void;
  fatigueLevel: number;
  setFatigueLevel: (val: number) => void;
  durationSeconds: number;
  setDurationSeconds: (sec: number) => void;
  shift: ShiftType;
  setShift: (shift: ShiftType) => void;
  notes: string;
  setNotes: (notes: string) => void;
  onGenerate: () => void;
  onReset: () => void;
  onApplyPreset: (preset: 'quick60' | 'standing' | 'codeRed' | 'screens') => void;
}

const ROLES: { id: HospitalRole; label: string; desc: string }[] = [
  { id: 'Enfermería y Cuidados', label: 'Enfermería y Cuidados', desc: 'Horas de pie, administración y movilización' },
  { id: 'Medicina y Cirugía', label: 'Medicina y Cirugía', desc: 'Quirófano, bipedestación y concentración crítica' },
  { id: 'Urgencias y Triage', label: 'Urgencias y Triage', desc: 'Alta adrenalina, rapidez y toma de decisiones' },
  { id: 'Laboratorio y Farmacia', label: 'Laboratorio y Farmacia', desc: 'Pipeteo repetitivo, microscopio y postura estática' },
  { id: 'Radiología y Monitores', label: 'Radiología e Imagen', desc: 'Fijación visual prolongada en estaciones de trabajo' },
  { id: 'Administración y Admisión', label: 'Admisión y Gestión', desc: 'Digitación continua, llamadas y postura sedente' },
  { id: 'Servicios Generales y Camilleros', label: 'Servicios y Traslado', desc: 'Carga física, tracción y esfuerzo continuo' },
];

const TENSION_ZONES: { id: TensionZone; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'Ojos y Cefalea', label: 'Ojos y Cefalea', desc: 'Pantallas, microscopios y luces clínicas', icon: Eye },
  { id: 'Cuello, Hombros y Trapecios', label: 'Cuello y Hombros', desc: 'Tensión cervical y hombros encogidos', icon: Activity },
  { id: 'Espalda Baja y Lumbares', label: 'Espalda y Lumbares', desc: 'Sobrecarga de columna y movilización', icon: Activity },
  { id: 'Muñecas, Manos y Dedos', label: 'Muñecas y Manos', desc: 'Pipeteo, vías periféricas y guantes', icon: Zap },
  { id: 'Piernas Pesadas y Pies', label: 'Piernas y Pies', desc: 'Circulación venosa y fascitis plantar', icon: Footprints },
  { id: 'Sobrecarga Mental y Estrés', label: 'Mente y Estrés', desc: 'Ansiedad, saturación sensorial y alarmas', icon: Brain },
];

const DURATIONS = [
  { sec: 60, label: '1 Minuto', badge: 'Micro-pausa rápida' },
  { sec: 120, label: '2 Minutos', badge: 'Pausa intermedia' },
  { sec: 180, label: '3 Minutos', badge: 'Pausa completa' },
  { sec: 300, label: '5 Minutos', badge: 'Descompresión total' },
];

const SHIFTS: ShiftType[] = ['Turno Mañana', 'Turno Tarde', 'Guardia Nocturna'];

export const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  role,
  setRole,
  tensionZone,
  setTensionZone,
  fatigueLevel,
  setFatigueLevel,
  durationSeconds,
  setDurationSeconds,
  shift,
  setShift,
  notes,
  setNotes,
  onGenerate,
  onReset,
  onApplyPreset,
}) => {

  const getFatigueColor = (val: number) => {
    if (val <= 3) return 'text-emerald-600 dark:text-emerald-400';
    if (val <= 6) return 'text-amber-600 dark:text-amber-400';
    return 'text-rose-600 dark:text-rose-400';
  };

  const getFatigueDescriptor = (val: number) => {
    if (val <= 2) return 'Energía óptima / Fatiga mínima';
    if (val <= 4) return 'Cansancio normal de la jornada';
    if (val <= 6) return 'Sobrecarga física o mental notable';
    if (val <= 8) return 'Fatiga intensa / Necesidad urgente de pausa';
    return 'Agotamiento crítico / Descompresión prioritaria';
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6 sm:p-8 space-y-8 transition-colors">
      
      {/* Header and Quick Presets */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Configura tu Pausa de Autocuidado
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Personalizada según tu servicio, tu nivel de fatiga y el tiempo real disponible.
            </p>
          </div>

          <button
            onClick={onReset}
            className="self-start sm:self-auto text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1.5 py-1.5 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar valores
          </button>
        </div>

        {/* Quick action buttons for busy hospital workers */}
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
            Accesos Rápidos Frecuentes
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              onClick={() => onApplyPreset('quick60')}
              className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 rounded-xl transition-all text-left flex flex-col"
            >
              <span className="font-semibold text-slate-900 dark:text-white">Solo 60 segundos</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Micro-respiro exprés</span>
            </button>
            <button
              onClick={() => onApplyPreset('standing')}
              className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 rounded-xl transition-all text-left flex flex-col"
            >
              <span className="font-semibold text-slate-900 dark:text-white">Horas de pie</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Piernas y lumbares</span>
            </button>
            <button
              onClick={() => onApplyPreset('codeRed')}
              className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 rounded-xl transition-all text-left flex flex-col"
            >
              <span className="font-semibold text-slate-900 dark:text-white">Post-urgencia</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Descompresión vagal</span>
            </button>
            <button
              onClick={() => onApplyPreset('screens')}
              className="px-3 py-2 text-xs font-medium bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700 rounded-xl transition-all text-left flex flex-col"
            >
              <span className="font-semibold text-slate-900 dark:text-white">Monitores clínicos</span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Ojos y cuello</span>
            </button>
          </div>
        </div>
      </div>

      {/* Field 1: Rol o Servicio Hospitalario */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
          <User className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>1. Área o Rol en el Hospital</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ROLES.map((r) => {
            const isSelected = role === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between min-h-[64px] ${
                  isSelected
                    ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/30 text-teal-950 dark:text-teal-100 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm leading-snug">{r.label}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 shrink-0" />
                  )}
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{r.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Field 2: Nivel de Fatiga Percibida (1-10) */}
      <div className="space-y-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>2. Nivel de Fatiga Percibida Actual (Escala 1 al 10)</span>
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-extrabold num-tabular ${getFatigueColor(fatigueLevel)}`}>
              {fatigueLevel}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">/ 10</span>
          </div>
        </div>

        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={fatigueLevel}
          onChange={(e) => setFatigueLevel(parseInt(e.target.value, 10))}
          className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-600 dark:accent-teal-500 focus:outline-none"
        />

        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>1 (Muy descansado)</span>
          <span className={`font-medium ${getFatigueColor(fatigueLevel)}`}>
            {getFatigueDescriptor(fatigueLevel)}
          </span>
          <span>10 (Agotamiento extremo)</span>
        </div>
      </div>

      {/* Field 3: Zona de Mayor Tensión o Molestia */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
          <Activity className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>3. ¿Qué zona de tu cuerpo necesita mayor alivio ahora?</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TENSION_ZONES.map((zone) => {
            const isSelected = tensionZone === zone.id;
            const Icon = zone.icon;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setTensionZone(zone.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 min-h-[56px] ${
                  isSelected
                    ? 'border-teal-600 dark:border-teal-400 bg-teal-50/70 dark:bg-teal-950/30 text-teal-950 dark:text-teal-100 shadow-sm'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200'
                }`}
              >
                <div className={`p-2 rounded-lg shrink-0 ${
                  isSelected 
                    ? 'bg-teal-600 text-white dark:bg-teal-500' 
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm leading-tight">{zone.label}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                    {zone.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Field 4: Tiempo Disponible y Turno */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Duración */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
            <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>4. Tiempo que tienes disponible</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((d) => {
              const isSelected = durationSeconds === d.sec;
              return (
                <button
                  key={d.sec}
                  type="button"
                  onClick={() => setDurationSeconds(d.sec)}
                  className={`py-3 px-3 rounded-xl border text-center transition-all min-h-[48px] flex flex-col items-center justify-center ${
                    isSelected
                      ? 'border-teal-600 dark:border-teal-400 bg-teal-600 text-white dark:bg-teal-500 shadow-sm font-semibold'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-sm font-bold">{d.label}</span>
                  <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-teal-100' : 'text-slate-500 dark:text-slate-400'}`}>
                    {d.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Turno */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100">
            <SunMedium className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>5. Momento del Turno</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {SHIFTS.map((s) => {
              const isSelected = shift === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setShift(s)}
                  className={`py-3 px-2 rounded-xl border text-xs font-semibold transition-all min-h-[48px] text-center flex items-center justify-center ${
                    isSelected
                      ? 'border-teal-600 dark:border-teal-400 bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>

          {/* Campo de notas rápidas */}
          <div className="mt-3">
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Opcional: Una breve intención o nota (ej. 'Tras cirugía de cadera')"
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
              maxLength={80}
            />
          </div>
        </div>

      </div>

      {/* Primary Execution Button - Clear, high contrast, prominent */}
      <div className="pt-2">
        <button
          onClick={onGenerate}
          className="w-full py-4 px-6 text-base font-bold text-white bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 rounded-2xl shadow-md shadow-teal-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-3 min-h-[52px]"
        >
          <Sparkles className="w-5 h-5 shrink-0" />
          <span>Generar Mi Prescripción de Pausa Activa</span>
        </button>
      </div>

    </div>
  );
};
