import { useState } from 'react';
import DeveloperContent from '../DeveloperContent';

export default function DeveloperContentExample() {
  const [currentView, setCurrentView] = useState("home");
  
  const fieldStates = {
    zer: { coherence: 0.75, energy: 0.8, state: 'active' },
    mind: { coherence: 0.62, energy: 0.7, state: 'processing' },
    body: { coherence: 0.58, energy: 0.65, state: 'stable' },
    heart: { coherence: 0.81, energy: 0.85, state: 'flowing' },
    soul: { coherence: 0.73, energy: 0.78, state: 'seeking' },
    spirit: { coherence: 0.67, energy: 0.72, state: 'active' },
  };
  
  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <DeveloperContent
        currentView={currentView}
        navigateTo={setCurrentView}
        fieldStates={fieldStates}
      />
    </div>
  );
}
