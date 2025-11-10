import { Code, Package, Settings, BookOpen } from "lucide-react";
import ModuleBuilder from "./ModuleBuilder";
import type { FieldState } from "./FieldStateIndicator";

interface DeveloperContentProps {
  currentView: string;
  navigateTo: (view: string) => void;
  fieldStates: Record<string, FieldState>;
}

export default function DeveloperContent({ currentView, navigateTo, fieldStates }: DeveloperContentProps) {
  if (currentView === "builder") {
    return <ModuleBuilder />;
  }

  // Developer home view
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Developer Center</h1>
        <p className="text-muted-foreground">Build and customize modules for the YOUNIVERSE platform</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <button onClick={() => navigateTo('builder')} className="bg-card border border-card-border rounded-lg p-6 hover-elevate active-elevate-2 transition-all text-left" data-testid="card-module-builder">
          <Code className="w-8 h-8 text-cyan-400 mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">Module Builder</h2>
          <p className="text-muted-foreground">Create custom modules with our wizard</p>
          <div className="mt-4 inline-flex items-center text-sm text-cyan-400">
            Get Started →
          </div>
        </button>

        <button onClick={() => navigateTo('templates')} className="bg-card border border-card-border rounded-lg p-6 hover-elevate active-elevate-2 transition-all text-left" data-testid="card-templates">
          <Package className="w-8 h-8 text-purple-400 mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">Module Templates</h2>
          <p className="text-muted-foreground">Browse and use pre-built templates</p>
          <div className="mt-4 inline-flex items-center text-sm text-purple-400">
            View Templates →
          </div>
        </button>

        <button onClick={() => navigateTo('config')} className="bg-card border border-card-border rounded-lg p-6 hover-elevate active-elevate-2 transition-all text-left" data-testid="card-config">
          <Settings className="w-8 h-8 text-green-400 mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">System Configuration</h2>
          <p className="text-muted-foreground">Configure field states and resonance engine</p>
          <div className="mt-4 inline-flex items-center text-sm text-green-400">
            Configure →
          </div>
        </button>

        <div className="bg-card border border-card-border rounded-lg p-6">
          <BookOpen className="w-8 h-8 text-yellow-400 mb-4" />
          <h2 className="text-xl font-semibold text-card-foreground mb-2">Documentation</h2>
          <p className="text-muted-foreground">Learn how to build with YOUNIVERSE</p>
          <div className="mt-4 inline-flex items-center text-sm text-yellow-400">
            Read Docs →
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-card border border-card-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">0</div>
          <div className="text-sm text-muted-foreground">Active Modules</div>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">6</div>
          <div className="text-sm text-muted-foreground">Field States</div>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">4</div>
          <div className="text-sm text-muted-foreground">Templates</div>
        </div>
        <div className="bg-card border border-card-border rounded-lg p-4">
          <div className="text-2xl font-bold text-foreground">∞</div>
          <div className="text-sm text-muted-foreground">Possibilities</div>
        </div>
      </div>
    </div>
  );
}
