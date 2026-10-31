/**
 * Types for 'Un minuto para mí' - Hospital Active Break & Wellness App
 */

export type HospitalRole = 
  | 'Enfermería y Cuidados'
  | 'Medicina y Cirugía'
  | 'Urgencias y Triage'
  | 'Laboratorio y Farmacia'
  | 'Radiología y Monitores'
  | 'Administración y Admisión'
  | 'Servicios Generales y Camilleros';

export type TensionZone = 
  | 'Ojos y Cefalea'
  | 'Cuello, Hombros y Trapecios'
  | 'Espalda Baja y Lumbares'
  | 'Muñecas, Manos y Dedos'
  | 'Piernas Pesadas y Pies'
  | 'Sobrecarga Mental y Estrés';

export type ShiftType = 'Turno Mañana' | 'Turno Tarde' | 'Guardia Nocturna';

export type BreakCategory = 'visual' | 'relajacion' | 'pausa_activa';

export interface ExerciseStep {
  id: string;
  title: string;
  category: BreakCategory;
  durationSeconds: number;
  subtitle: string;
  description?: string;
  anatomicalTarget: string;
  hospitalContext: string;
  instructions: string[];
  tips: string;
  breathingPattern?: {
    inhale: number;
    hold1?: number;
    exhale: number;
    hold2?: number;
    label: string;
  };
}

export interface WellnessPrescription {
  id: string;
  role: HospitalRole;
  tensionZone: TensionZone;
  fatigueLevel: number;
  totalDurationSeconds: number;
  shift: ShiftType;
  exercises: ExerciseStep[];
  rationale: string;
  clinicalTip: string;
}

export interface SessionLog {
  id: string;
  date: string;
  timestamp: number;
  role: HospitalRole;
  tensionZone: TensionZone;
  durationSeconds: number;
  fatigueBefore: number;
  fatigueAfter: number;
  notes?: string;
  exercisesCompleted: string[];
}
