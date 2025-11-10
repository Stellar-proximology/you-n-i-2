import { Menu, ArrowLeft, ArrowRight, Home, Code, Search } from "lucide-react";
import { useState, useRef } from "react";
import FieldStateIndicator from "./FieldStateIndicator";
import type { FieldState } from "./FieldStateIndicator";

interface BrowserTopBarProps {
  mode: "dashboard" | "developer";
  setMode: (mode: "dashboard" | "developer") => void;
  currentView: string;
  navigateBack: () => void;
  navigateForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (query: string) => void;
  searchFocused: boolean;
  setSearchFocused: (focused: boolean) => void;
  fieldStates: Record<string, FieldState>;
  overallCoherence: number;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function BrowserTopBar({
  mode,
  setMode,
  navigateBack,
  navigateForward,
  canGoBack,
  canGoForward,
  searchQuery,
  setSearchQuery,
  handleSearch,
  searchFocused,
  setSearchFocused,
  fieldStates,
  overallCoherence,
  sidebarOpen,
  setSidebarOpen,
}: BrowserTopBarProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="h-16 bg-black/40 backdrop-blur-lg border-b border-border flex items-center px-4 gap-4" data-testid="top-bar">
      {/* Left Section: Navigation & Mode */}
      <div className="flex items-center gap-2">
        {/* Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          title="Toggle Sidebar (⌘\)"
          data-testid="button-sidebar-toggle"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Back/Forward */}
        <button
          onClick={navigateBack}
          disabled={!canGoBack}
          className={`p-2 rounded-lg transition-colors ${
            canGoBack ? 'hover:bg-white/10' : 'opacity-30 cursor-not-allowed'
          }`}
          title="Back (⌘[)"
          data-testid="button-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        
        <button
          onClick={navigateForward}
          disabled={!canGoForward}
          className={`p-2 rounded-lg transition-colors ${
            canGoForward ? 'hover:bg-white/10' : 'opacity-30 cursor-not-allowed'
          }`}
          title="Forward (⌘])"
          data-testid="button-forward"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
        
        {/* Mode Switcher */}
        <div className="flex items-center bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setMode('dashboard')}
            className={`px-4 py-1.5 rounded-md transition-all ${
              mode === 'dashboard' 
                ? 'bg-purple-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            data-testid="button-mode-dashboard"
          >
            <Home className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setMode('developer')}
            className={`px-4 py-1.5 rounded-md transition-all ${
              mode === 'developer' 
                ? 'bg-cyan-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            data-testid="button-mode-developer"
          >
            <Code className="w-4 h-4 inline mr-2" />
            Developer
          </button>
        </div>
      </div>
      
      {/* Center Section: Universal Search */}
      <div className="flex-1 max-w-2xl">
        <div className={`relative transition-all ${
          searchFocused ? 'ring-2 ring-cyan-500' : ''
        } rounded-lg`}>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(searchQuery);
              }
            }}
            placeholder="Ask anything, go anywhere..."
            className="w-full px-4 py-2 pl-10 bg-white/5 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none transition-all"
            data-testid="input-search"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            ⌘K
          </div>
        </div>
      </div>
      
      {/* Right Section: Field States & Coherence */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-border" data-testid="field-states">
          <FieldStateIndicator field="zer" fieldState={fieldStates.zer} size="sm" />
          <FieldStateIndicator field="mind" fieldState={fieldStates.mind} size="sm" />
          <FieldStateIndicator field="body" fieldState={fieldStates.body} size="sm" />
          <FieldStateIndicator field="heart" fieldState={fieldStates.heart} size="sm" />
          <FieldStateIndicator field="soul" fieldState={fieldStates.soul} size="sm" />
          <FieldStateIndicator field="spirit" fieldState={fieldStates.spirit} size="sm" />
        </div>
        <div className="text-sm text-muted-foreground" data-testid="text-coherence">
          {Math.round(overallCoherence * 100)}%
        </div>
      </div>
    </div>
  );
}
