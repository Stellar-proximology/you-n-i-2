import { Home, Compass, Activity, Beaker, Package, Settings } from "lucide-react";
import FieldStateIndicator from "./FieldStateIndicator";
import type { FieldState } from "./FieldStateIndicator";

interface BrowserSidebarProps {
  mode: "dashboard" | "developer";
  currentView: string;
  navigateTo: (view: string) => void;
  fieldStates: Record<string, FieldState>;
}

const dashboardNavItems = [
  { id: "home", label: "Overview", icon: Home },
  { id: "simulator", label: "Simulator", icon: Activity },
  { id: "map", label: "Field Map", icon: Compass },
  { id: "oracle", label: "Oracle", icon: Beaker },
];

const developerNavItems = [
  { id: "builder", label: "Module Builder", icon: Package },
  { id: "templates", label: "Templates", icon: Package },
  { id: "config", label: "Configuration", icon: Settings },
];

export default function BrowserSidebar({ mode, currentView, navigateTo, fieldStates }: BrowserSidebarProps) {
  const navItems = mode === "dashboard" ? dashboardNavItems : developerNavItems;
  
  return (
    <div className="w-48 sm:w-56 md:w-64 bg-sidebar border-r border-sidebar-border flex flex-col" data-testid="sidebar">
      {/* Field States */}
      <div className="p-2 sm:p-3 md:p-4 border-b border-sidebar-border">
        <h3 className="text-xs sm:text-sm font-semibold text-sidebar-foreground mb-2 sm:mb-3">Field States</h3>
        <div className="space-y-1.5 sm:space-y-2">
          {Object.entries(fieldStates).map(([field, state]) => (
            <FieldStateIndicator
              key={field}
              field={field as any}
              fieldState={state}
            />
          ))}
        </div>
      </div>
      
      {/* Navigation */}
      <div className="flex-1 p-1.5 sm:p-2 overflow-y-auto">
        <nav className="space-y-0.5 sm:space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
                data-testid={`nav-${item.id}`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-xs sm:text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      
      {/* Footer */}
      <div className="p-2 sm:p-3 md:p-4 border-t border-sidebar-border">
        <div className="text-[10px] sm:text-xs text-muted-foreground">
          YOUNIVERSE v0.1
        </div>
      </div>
    </div>
  );
}
