import { useState } from 'react';
import DashboardContent from '../DashboardContent';

export default function DashboardContentExample() {
  const [currentView, setCurrentView] = useState("home");
  
  const fieldStates = {
    zer: { coherence: 0.75, energy: 0.8, state: 'active' },
    mind: { coherence: 0.62, energy: 0.7, state: 'processing' },
    body: { coherence: 0.58, energy: 0.65, state: 'stable' },
    heart: { coherence: 0.81, energy: 0.85, state: 'flowing' },
    soul: { coherence: 0.73, energy: 0.78, state: 'seeking' },
    spirit: { coherence: 0.67, energy: 0.72, state: 'active' },
  };
  
  const overallCoherence = Object.values(fieldStates).reduce((sum, field) => sum + field.coherence, 0) / 6;
  
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black min-h-screen">
      <DashboardContent
        currentView={currentView}
        navigateTo={setCurrentView}
        fieldStates={fieldStates}
        overallCoherence={overallCoherence}
      />
    </div>
  );
}
