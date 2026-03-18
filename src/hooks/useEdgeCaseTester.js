import { useState, useEffect, useCallback } from 'react';
import { defaultState, edgeCases } from '../utils/edgeCases';

export function useEdgeCaseTester(intervalMs = 800) {
  const [uiData, setUiData] = useState(defaultState);
  const [isStressTesting, setIsStressTesting] = useState(false);
  const [currentMode, setCurrentMode] = useState('default');

  // Manual trigger for specific cases
  const applyEdgeCase = useCallback((key) => {
    if (key === 'default') {
      setUiData(defaultState);
    } else {
      setUiData(edgeCases[key]);
    }
    setCurrentMode(key);
  }, []);

  // Toggle stress test mode
  const toggleStressTest = useCallback(() => {
    setIsStressTesting((prev) => !prev);
  }, []);

  // The Stress Test Loop
  useEffect(() => {
    let interval;
    if (isStressTesting) {
      const keys = Object.keys(edgeCases);
      interval = setInterval(() => {
        // Pick a random edge case
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        applyEdgeCase(randomKey);
      }, intervalMs);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStressTesting, applyEdgeCase, intervalMs]);

  return {
    uiData,
    isStressTesting,
    currentMode,
    applyEdgeCase,
    toggleStressTest
  };
}
