import { useState } from 'react';
import BrowserTopBar from '../BrowserTopBar';

export default function BrowserTopBarExample() {
  const [mode, setMode] = useState<"dashboard" | "developer">("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
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
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      <BrowserTopBar
        mode={mode}
        setMode={setMode}
        currentView="home"
        navigateBack={() => console.log('Navigate back')}
        navigateForward={() => console.log('Navigate forward')}
        canGoBack={false}
        canGoForward={false}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={(query) => console.log('Search:', query)}
        searchFocused={searchFocused}
        setSearchFocused={setSearchFocused}
        fieldStates={fieldStates}
        overallCoherence={overallCoherence}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}
