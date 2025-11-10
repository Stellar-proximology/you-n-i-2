import { Activity, Users, Vote, Zap, Box, TrendingUp, Star } from "lucide-react";
import { Link } from "wouter";

export default function DashboardContent() {
  const stats = [
    { label: 'Global Coherence', value: '97.3%', icon: Activity, color: 'text-cyan-400' },
    { label: 'Active Users', value: '2,847', icon: Users, color: 'text-purple-400' },
    { label: 'Pending Votes', value: '12', icon: Vote, color: 'text-pink-400' },
    { label: 'Resonance', value: '432 Hz', icon: Zap, color: 'text-yellow-400' },
  ];

  const consciousnessFields = [
    { name: 'Zer', coherence: 98.2, color: 'bg-violet-500' },
    { name: 'Mind', coherence: 94.7, color: 'bg-cyan-500' },
    { name: 'Body', coherence: 96.5, color: 'bg-green-500' },
    { name: 'Heart', coherence: 99.1, color: 'bg-pink-500' },
    { name: 'Soul', coherence: 95.8, color: 'bg-indigo-500' },
    { name: 'Spirit', coherence: 97.3, color: 'bg-amber-500' },
  ];

  const recentActivity = [
    { time: '2m ago', action: 'New proposal created', detail: 'Add Oracle Module', votes: 3 },
    { time: '15m ago', action: 'Feature unlocked', detail: 'Chart Visualizer', votes: 30 },
    { time: '1h ago', action: 'Coherence milestone', detail: 'System reached 97%', votes: null },
    { time: '3h ago', action: 'Vote passed', detail: 'Enable Simulator', votes: 45 },
  ];

  return (
    <div className="flex-1 bg-background overflow-y-auto">
      {/* Header */}
      <div className="border-b border-border bg-muted/30 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-base sm:text-lg font-semibold text-foreground">YOUNIVERSE Dashboard</h1>
            <p className="text-[10px] sm:text-xs text-muted-foreground">Consciousness-aware system overview</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
              <span className="text-xs sm:text-sm text-cyan-400 font-medium">Active Field: Body</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3 sm:p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-lg p-2.5 sm:p-3 md:p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                    <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                    <Icon size={14} className={`sm:w-4 sm:h-4 ${stat.color}`} />
                  </div>
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-foreground">{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Consciousness Fields */}
          <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
              <h2 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wide">Consciousness Fields</h2>
              <button className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded-lg" data-testid="button-view-fields-details">
                View Details
              </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4">
              {consciousnessFields.map((field, i) => (
                <div key={i} className="text-center">
                  <div className="mb-2 sm:mb-3 mx-auto">
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto">
                      <svg className="transform -rotate-90 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
                        <circle
                          cx="28"
                          cy="28"
                          r="22"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          className="text-muted sm:hidden"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke="currentColor"
                          strokeWidth="5"
                          fill="none"
                          className="text-muted hidden sm:block md:hidden"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-muted hidden md:block"
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="22"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 22}`}
                          strokeDashoffset={`${2 * Math.PI * 22 * (1 - field.coherence / 100)}`}
                          className={`${field.color.replace('bg-', 'text-')} sm:hidden`}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="26"
                          stroke="currentColor"
                          strokeWidth="5"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 26}`}
                          strokeDashoffset={`${2 * Math.PI * 26 * (1 - field.coherence / 100)}`}
                          className={`${field.color.replace('bg-', 'text-')} hidden sm:block md:hidden`}
                          strokeLinecap="round"
                        />
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 32}`}
                          strokeDashoffset={`${2 * Math.PI * 32 * (1 - field.coherence / 100)}`}
                          className={`${field.color.replace('bg-', 'text-')} hidden md:block`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[10px] sm:text-xs md:text-sm font-bold text-foreground">{field.coherence}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-foreground">{field.name}</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Coherent</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
              <h2 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wide mb-3 sm:mb-4">Recent Activity</h2>
              <div className="space-y-3 sm:space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 sm:gap-3 pb-2 sm:pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 mt-1.5 sm:mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs sm:text-sm text-foreground font-medium">{item.action}</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{item.detail}</div>
                      {item.votes !== null && (
                        <div className="text-[10px] sm:text-xs text-cyan-400 mt-1 flex items-center gap-1">
                          <Vote size={10} className="sm:w-3 sm:h-3" />
                          {item.votes} votes
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
              <h2 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wide mb-3 sm:mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <Link href="/human-design">
                  <button className="w-full p-2.5 sm:p-3 md:p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group" data-testid="button-human-design">
                    <Star size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-amber-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-xs sm:text-sm font-medium text-foreground">Human Design</div>
                    <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Body, Voice, Mind</div>
                  </button>
                </Link>
                <button className="p-2.5 sm:p-3 md:p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group" data-testid="button-load-module">
                  <Box size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-cyan-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-medium text-foreground">Load Module</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Add new plugin</div>
                </button>
                <button className="p-2.5 sm:p-3 md:p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group" data-testid="button-create-proposal">
                  <Vote size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-purple-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-medium text-foreground">Create Proposal</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Submit new idea</div>
                </button>
                <button className="p-2.5 sm:p-3 md:p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group" data-testid="button-coherence-report">
                  <Activity size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-pink-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-medium text-foreground">Coherence Report</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">View analytics</div>
                </button>
                <button className="p-2.5 sm:p-3 md:p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group" data-testid="button-system-health">
                  <TrendingUp size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 text-green-400 mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs sm:text-sm font-medium text-foreground">System Health</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">Check status</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
