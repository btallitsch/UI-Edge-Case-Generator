import React from 'react';
import ProfileCard from './components/ProfileCard';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useEdgeCaseTester } from './hooks/useEdgeCaseTester';

export default function App() {
  const { 
    uiData, 
    isStressTesting, 
    currentMode, 
    applyEdgeCase, 
    toggleStressTest 
  } = useEdgeCaseTester(600);

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex flex-col md:flex-row gap-12 justify-center items-start">
      
      {/* Control Panel */}
      <div className="w-full md:w-96 bg-white p-6 rounded-xl shadow-sm border">
        <h1 className="text-2xl font-bold mb-4">UI Edge Case Generator</h1>
        
        <button 
          onClick={toggleStressTest}
          className={`w-full py-3 rounded-lg font-bold text-white mb-6 transition-colors ${
            isStressTesting ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-black hover:bg-gray-800'
          }`}
        >
          {isStressTesting ? '🛑 STOP STRESS TEST' : '⚡ START STRESS TEST'}
        </button>

        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Manual Triggers
          </h3>
          
          {['default', 'longText', 'missingImages', 'extremeNumbers', 'localizationOverflow', 'nullUndefined'].map((key) => (
             <button 
               key={key}
               onClick={() => applyEdgeCase(key)}
               className={`block w-full text-left px-4 py-2 rounded border capitalize ${currentMode === key ? 'bg-blue-50 border-blue-200 font-bold' : 'hover:bg-gray-50'}`}
             >
               {key.replace(/([A-Z])/g, ' $1').trim()} {/* Formats camelCase to words */}
             </button>
          ))}
        </div>
      </div>

      {/* Target UI Area */}
      <div className="flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
          Live Render
        </h3>
        
        {/* The Error Boundary saves the app from dying on the Null/Undefined test! */}
        <ErrorBoundary resetKey={currentMode}>
          <ProfileCard data={uiData} />
        </ErrorBoundary>
        
      </div>
    </div>
  );
}
