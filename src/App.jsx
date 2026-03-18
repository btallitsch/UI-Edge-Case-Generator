// src/App.jsx (Condensed snippet of the changes)
import { useEdgeCaseTester } from './hooks/useEdgeCaseTester';
export default function App() {
  const { uiData, isStressTesting, currentMode, applyEdgeCase, toggleStressTest } = useEdgeCaseTester(600);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 flex flex-col md:flex-row gap-12 justify-center items-start font-mono">
      
      {/* Control Panel */}
      <div className="w-full md:w-96 bg-slate-900 p-6 rounded-2xl shadow-2xl border border-slate-800">
        <h1 className="text-xl font-black mb-1 tracking-tighter text-indigo-400">UI_STRESS_LAB_v1.0</h1>
        <p className="text-xs text-slate-500 mb-6 uppercase tracking-widest font-bold text-indigo-900">Chaos Engineering Tool</p>
        
        <button 
          onClick={toggleStressTest}
          className={`w-full py-4 rounded-xl font-black text-sm tracking-widest transition-all mb-8 shadow-lg ${
            isStressTesting 
              ? 'bg-rose-600 text-white animate-pulse shadow-rose-900/50' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/40'
          }`}
        >
          {isStressTesting ? '>> TERMINATE TEST' : '>> INITIATE STRESS'}
        </button>

        <div className="space-y-3">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-2 border-b border-slate-800 pb-1">
            Mutation Selection
          </h3>
          
          {['default', 'longText', 'missingImages', 'extremeNumbers', 'localizationOverflow', 'nullUndefined'].map((key) => (
             <button 
               key={key}
               onClick={() => applyEdgeCase(key)}
               className={`block w-full text-left px-4 py-3 rounded-lg border text-xs transition-all ${
                 currentMode === key 
                   ? 'bg-indigo-500/10 border-indigo-500 text-indigo-400 font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
                   : 'border-slate-800 hover:border-slate-600 text-slate-400'
               }`}
             >
               {`// ${key.replace(/([A-Z])/g, ' $1').toUpperCase()}`}
             </button>
          ))}
        </div>
      </div>

      {/* Target UI Area */}
      <div className="flex flex-col items-center">
        <div className="inline-block px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[10px] text-slate-500 mb-6 uppercase tracking-widest">
          Live Environment Monitor
        </div>
        <ErrorBoundary resetKey={currentMode}>
          <ProfileCard data={uiData} />
        </ErrorBoundary>
      </div>
    </div>
  );
}
