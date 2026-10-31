import React from 'react';
import { ShieldAlert, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onTriggerSOS: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onTriggerSOS,
  isDarkMode,
  onToggleDarkMode,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/20">
              <span className="font-bold text-lg leading-none">1′</span>
            </div>
            <button
              onClick={() => onSelectTab('prescriptor')}
              className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:opacity-90 transition-opacity text-left"
            >
              Un minuto para mí
            </button>
          </div>

          {/* Zone 2: Clean single-line navigation controls */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button
              onClick={() => onSelectTab('prescriptor')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'prescriptor'
                  ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600 dark:border-teal-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Prescripción
            </button>
            <button
              onClick={() => onSelectTab('visual')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'visual'
                  ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600 dark:border-teal-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Descanso Visual
            </button>
            <button
              onClick={() => onSelectTab('relajacion')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'relajacion'
                  ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600 dark:border-teal-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Relajación
            </button>
            <button
              onClick={() => onSelectTab('pausas')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'pausas'
                  ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600 dark:border-teal-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Pausas Activas
            </button>
            <button
              onClick={() => onSelectTab('bitacora')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentTab === 'bitacora'
                  ? 'text-teal-700 dark:text-teal-400 font-semibold border-b-2 border-teal-600 dark:border-teal-400'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Bitácora
            </button>
          </nav>

          {/* Zone 3: 1 Primary contextual action + Theme toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleDarkMode}
              title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo descanso visual / oscuro'}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Alternar tema de color"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={onTriggerSOS}
              className="px-4 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all rounded-xl shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 min-h-[44px]"
              title="Respiro neurovegetativo inmediato de 60 segundos"
            >
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>SOS Respiro 60s</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
