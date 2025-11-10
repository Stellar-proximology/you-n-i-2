import { Activity } from "lucide-react";
import { useState, useEffect } from "react";

interface BrowserStatusBarProps {
  mode: "dashboard" | "developer";
  overallCoherence: number;
  activeModules: string[];
}

export default function BrowserStatusBar({ mode, overallCoherence, activeModules }: BrowserStatusBarProps) {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="h-8 bg-black/60 backdrop-blur-sm border-t border-border flex items-center justify-between px-4 text-xs text-muted-foreground" data-testid="status-bar">
      {/* Left: System Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2" data-testid="status-system">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>System Online</span>
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <div data-testid="status-mode">
          Mode: <span className="text-foreground font-medium capitalize">{mode}</span>
        </div>
        
        {activeModules.length > 0 && (
          <>
            <div className="h-4 w-px bg-border" />
            <div data-testid="status-modules">
              Active Modules: <span className="text-foreground">{activeModules.length}</span>
            </div>
          </>
        )}
      </div>
      
      {/* Center: Coherence Indicator */}
      <div className="flex items-center gap-2" data-testid="status-coherence">
        <Activity className="w-3 h-3 text-cyan-400" />
        <span>Coherence: <span className="text-foreground font-medium">{Math.round(overallCoherence * 100)}%</span></span>
      </div>
      
      {/* Right: Time & Info */}
      <div className="flex items-center gap-4">
        <div data-testid="status-time">
          {time.toLocaleTimeString()}
        </div>
        
        <div className="h-4 w-px bg-border" />
        
        <button className="hover:text-foreground transition-colors" data-testid="button-shortcuts">
          Keyboard Shortcuts
        </button>
      </div>
    </div>
  );
}
