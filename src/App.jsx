import React, { useState, useEffect, useCallback } from 'react';
import ProfileCard from './components/ProfileCard';
import { ErrorBoundary } from './components/ErrorBoundary';

// --- 1. DATA LAYER ---
const defaultState = {
  id: 1,
  name: "Jane Doe",
  role: "Software Engineer",
  bio: "Loves building React apps and hiking on weekends.",
  avatar: "https://ui-avatars.com/api/?name=Jane+Doe&background=6366f1&color=fff",
  metrics: { followers: 245, views: 1024 }
};

const edgeCases = {
  longText: {
    ...defaultState,
    name: "Jane Elizabeth Rosalind Von Derenburg-Smithington III",
    bio: "Loves building React apps, but also spends an inordinate amount of time writing paragraphs that never seem to end, wrapping around containers, breaking flex layouts, and generally causing a nuisance for frontend developers."
  },
  missingImages: {
    ...defaultState,
    avatar: "https://this-image-does-not-exist-at-all.com/404.png"
  },
  nullUndefined: {
    id: null,
    name: undefined,
    role: null,
    bio: undefined,
    avatar: undefined,
    metrics: null 
  },
  extremeNumbers: {
    ...defaultState,
    metrics: { followers: -999999999999, views: 3.14159265358979323846 }
  },
  localizationOverflow: {
    ...defaultState,
    role: "Hauptstellenleiterin",
    bio: "Donaudampfschifffahrtselektrizitätenhauptbetriebswerkbauunterbeamtengesellschaft"
  }
};

// --- 2. LOGIC LAYER (Hook) ---
function useEdgeCaseTester(intervalMs = 800) {
  const [uiData, setUiData] = useState(defaultState);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [currentMode, setCurrentMode] = useState('default');

  const applyEdgeCase = useCallback((key) => {
    setUiData(key === 'default' ? defaultState : edgeCases[key]);
    setCurrentMode(key);
  }, []);

  const toggleStressTest = useCallback(() => {
    setIsStressTesting((prev) => !prev);
  }, []);

  useEffect(() => {
    let interval;
    if (isStressTesting) {
      const keys = Object.keys(edgeCases);
      interval = setInterval(() => {
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        applyEdgeCase(randomKey);
      }, intervalMs);
    }
    return () => clearInterval(interval);
  }, [isStressTesting, applyEdgeCase, intervalMs]);

  return { uiData, isStressTesting, currentMode, applyEdgeCase, toggleStressTest };
}

// --- 3. PRESENTATION LAYER (App) ---
export default function App() {
  const { 
    uiData, 
    isStressTesting, 
    currentMode, 
    applyEdgeCase, 
    toggleStressTest 
  } = useEdgeCaseTester(700);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 flex flex-col md:flex-row gap-12 justify-center items-start font-mono">
      
      {/* Control Panel */}
      <div className="w-full md:w-96 bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800">
        <header className="mb-6">
          <h1 className="text-xl font-black tracking-tighter text-indigo-400">UI_STRESS_LAB_v1.0</h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Chaos Engineering Terminal</p>
        </header>
        
        <button 
          onClick={toggleStressTest}
          className={`w-full py-4 rounded-xl font-black text-sm tracking-widest transition-all mb-8 shadow-lg ${
            isStressTesting 
              ? 'bg-rose-600 text-white animate-pulse shadow-rose-900/40' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/30'
          }`}
        >
          {isStressTesting ? '>> STOP_MUTATION' : '>> INITIATE_STRESS'}
        </button>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-2 border-b border-slate-800 pb-1">
            Manual_Overrides
          </h3>
          
          <button 
            onClick={() => applyEdgeCase('default')}
            className={`block w-full text-left px-4 py-3 rounded-lg border text-xs transition-all ${
              currentMode === 'default' 
                ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold' 
                : 'border-slate-800 hover:border-slate-600 text-slate-400'
            }`}
          >
            // HAPPY_PATH
          </button>

          {Object.keys(edgeCases).map((key) => (
             <button 
               key={key}
               onClick={() => applyEdgeCase(key)}
               className={`block w-full text-left px-4 py-3 rounded-lg border text-xs transition-all ${
                 currentMode === key 
                   ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 font-bold shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                   : 'border-slate-800 hover:border-slate-600 text-slate-400'
               }`}
             >
               {`// ${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`}
             </button>
          ))}
        </div>

        <footer className="mt-8 pt-4 border-t border-slate-800">
          <div className="flex justify-between items-center text-[10px] text-slate-500">
            <span>STATUS: {isStressTesting ? 'RUNNING' : 'IDLE'}</span>
            <span>MODE: {currentMode.toUpperCase()}</span>
          </div>
        </footer>
      </div>

      {/* Live Preview Area */}
      <div className="flex flex-col items-center flex-1">
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 mb-8 uppercase tracking-widest font-bold">
          Live_Preview_Monitor
        </div>
        
        <div className="relative">
          {/* Diagnostic Grid Background (Optional purely for aesthetic) */}
          <div className="absolute inset-0 -m-4 border border-indigo-500/10 rounded-3xl pointer-events-none" />
          
          <ErrorBoundary resetKey={currentMode}>
            <ProfileCard data={uiData} />
          </ErrorBoundary>
        </div>
      </div>
      
    </div>
  );
}
