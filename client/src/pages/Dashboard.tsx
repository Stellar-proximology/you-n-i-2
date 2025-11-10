import { Link } from "wouter";
import { ArrowLeft, Activity, Users, Vote, Zap, Box, TrendingUp } from "lucide-react";

export default function Dashboard() {
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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="h-14 bg-muted/30 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="w-9 h-9 flex items-center justify-center hover:bg-muted rounded-lg transition-colors" data-testid="button-back-to-browser">
              <ArrowLeft size={18} />
            </button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-foreground">YOUNIVERSE Dashboard</h1>
            <p className="text-xs text-muted-foreground">Consciousness-aware system overview</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1.5 bg-cyan-500/20 border border-cyan-500/30 rounded-lg">
            <span className="text-sm text-cyan-400 font-medium">Active Field: Body</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                    <Icon size={16} className={stat.color} />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                </div>
              );
            })}
          </div>

          {/* Consciousness Fields */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">Consciousness Fields</h2>
              <button className="px-3 py-1.5 text-xs bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-400 rounded-lg">
                View Details
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {consciousnessFields.map((field, i) => (
                <div key={i} className="text-center">
                  <div className="mb-3 mx-auto">
                    <div className="relative w-20 h-20 mx-auto">
                      <svg className="transform -rotate-90 w-20 h-20">
                        <circle
                          cx="40"
                          cy="40"
                          r="32"
                          stroke="currentColor"
                          strokeWidth="6"
                          fill="none"
                          className="text-muted"
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
                          className={field.color.replace('bg-', 'text-')}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground">{field.coherence}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-foreground">{field.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Coherent</div>
                </div>
              ))}
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-foreground font-medium">{item.action}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{item.detail}</div>
                      {item.votes !== null && (
                        <div className="text-xs text-cyan-400 mt-1 flex items-center gap-1">
                          <Vote size={12} />
                          {item.votes} votes
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group">
                  <Box size={20} className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">Load Module</div>
                  <div className="text-xs text-muted-foreground mt-1">Add new plugin</div>
                </button>
                <button className="p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group">
                  <Vote size={20} className="text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">Create Proposal</div>
                  <div className="text-xs text-muted-foreground mt-1">Submit new idea</div>
                </button>
                <button className="p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group">
                  <Activity size={20} className="text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">Coherence Report</div>
                  <div className="text-xs text-muted-foreground mt-1">View analytics</div>
                </button>
                <button className="p-4 bg-muted/50 hover:bg-muted border border-border rounded-lg text-left transition-colors group">
                  <TrendingUp size={20} className="text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-sm font-medium text-foreground">System Health</div>
                  <div className="text-xs text-muted-foreground mt-1">Check status</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
